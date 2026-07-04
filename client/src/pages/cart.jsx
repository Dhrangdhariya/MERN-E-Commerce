import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import useCartStore from "../store/cartStore";

const Cart = () => {
    const {
        cart,
        fetchCart,
        removeItem,
        updateQuantity
    } = useCartStore();


    useEffect(() => {
        fetchCart();
    }, []);


    const totalPrice = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
    const shipping = totalPrice >= 500 ? 0 : 50;
    const extraFee = Number((totalPrice * 0.03).toFixed(2));
    const finalTotal = totalPrice + shipping + extraFee;

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans text-gray-900">
            <Navbar />
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Top Header Row */}
                <div className="flex justify-end items-center  p-5">
                    <Link
                        to="/main"
                        className="text-sm font-semibold border border-gray-300 px-4 py-2.5 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm"
                    >
                        &larr; Continue Shopping
                    </Link>
                </div>

                {/* Cart Conditional Content */}
                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto text-xl font-light">
                            🛒
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-950">Your bag is empty</h2>
                            <p className="text-sm text-gray-500">Looks like you haven't added anything yet.</p>
                        </div>
                        <Link
                            to="/main"
                            className="inline-block w-full bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Go Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Items List */}
                        <div className="space-y-4 lg:col-span-8">
                            {cart.map((item) => (
                                <div
                                    key={item.product._id}
                                    className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center hover:shadow-sm transition-shadow"
                                >
                                    {/* Product Meta details */}
                                    <div className="flex gap-4 items-center w-full sm:w-auto">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                                        />

                                        <div className="space-y-1 min-w-0">
                                            <h2 className="text-base font-bold text-gray-950 truncate">
                                                {item.product.title}
                                            </h2>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                                Premium Series
                                            </p>
                                            <p className="text-sm font-semibold text-gray-500 pt-1">
                                                {item.product.price.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions Row (Qty Selector + Dynamic Price Output) */}
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">

                                        {/* Quantity Counter Switch */}
                                        <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-xl">
                                            <button
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        updateQuantity(item.product._id, item.quantity - 1);
                                                    }
                                                }
                                                }
                                                className="w-7 h-7 rounded-lg text-gray-600 font-bold hover:bg-white hover:shadow-sm active:scale-95 transition-all flex items-center justify-center text-sm"
                                            >
                                                -
                                            </button>

                                            <span className="font-bold text-sm px-3 w-8 text-center text-gray-950">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                className="w-7 h-7 rounded-lg text-gray-600 font-bold hover:bg-white hover:shadow-sm active:scale-95 transition-all flex items-center justify-center text-sm"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Pricing and Removal Links */}
                                        <div className="text-right sm:mt-3 flex items-center sm:flex-col gap-4 sm:gap-1">
                                            <h3 className="font-extrabold text-base text-gray-950">
                                                {(item.product.price * item.quantity).toLocaleString('en-IN')}
                                            </h3>

                                            <button
                                                onClick={() => removeItem(item.product._id)}
                                                className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Checkout Summary Panel */}
                        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 space-y-6 lg:sticky lg:top-24 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-950 tracking-tight">Order Summary</h2>

                            <div className="space-y-3 text-sm border-b border-gray-100 pb-4">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-800">
                                        {totalPrice.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-emerald-600 font-semibold" : "font-semibold text-gray-800"}>
                                        {shipping === 0
                                            ? "FREE"
                                            : `${shipping.toLocaleString("en-IN")}`}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-500">
                                    <span>Extra Charges</span>
                                    <span className="font-semibold text-gray-800">
                                        {extraFee.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline">
                                <span className="text-base font-bold text-gray-950">
                                    Total Amount
                                </span>

                                <span className="text-2xl font-black text-indigo-600">
                                    {finalTotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <button className="w-full bg-indigo-700 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-800 shadow-md transform active:scale-[0.99] transition-all text-sm uppercase tracking-wider">
                                Proceed to Checkout
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;