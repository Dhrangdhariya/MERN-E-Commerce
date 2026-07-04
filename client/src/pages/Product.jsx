import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import Navbar from "../component/Navbar";

const Product = () => {
    const {
        perticularProduct,
        fetchProductById
    } = useProductStore();
    const {
        cart,
        fetchCart,
        addToCart,
        updateQuantity
    } = useCartStore();

    const { id } = useParams();

    useEffect(() => {
        fetchProductById(id);
        fetchCart();
    }, [id, fetchProductById]);

    const cartItem = cart.find(
        (item) => item.product._id === perticularProduct?._id
    );

    if (!perticularProduct) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-100">
            <Navbar />
            {/* Breadcrumbs Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <nav className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    <Link to="/main" className="hover:text-indigo-600 transition-colors">
                        Products
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-bold max-w-[240px] truncate">
                        {perticularProduct?.title}
                    </span>
                </nav>
            </div>

            {/* Main Product Frame Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                    {/* Left Column: Polished & Size-Controlled Image Frame */}
                    <div className="lg:col-span-7">
                        <div className="w-full max-h-[500px] aspect-[4/5] bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm relative flex items-center justify-center group mx-auto">
                            <img
                                src={perticularProduct?.image}
                                alt={perticularProduct?.title}
                                className="w-full h-full object-contain p-4 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-gray-950/90 backdrop-blur-sm text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                                In Stock
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Commercial Details */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">

                        {/* Header Description Info */}
                        <div className="space-y-4 border-b border-gray-200 pb-6">
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950 leading-tight">
                                {perticularProduct?.title}
                            </h1>

                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-indigo-600 tracking-tight">
                                    ₹ {perticularProduct?.price?.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[11px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-100 tracking-wide uppercase">
                                    {perticularProduct.price >= 500 ? "Free Delivery" : "Delivery Fee Applicable"}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed font-normal pt-1">
                                {perticularProduct?.desc}
                            </p>
                        </div>

                        {/* Primary Action Button Bar */}
                        <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                            {!cartItem ? (
                                <button
                                    className="flex-1 bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-600/10 transform active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
                                    onClick={async () => {
                                        await addToCart(perticularProduct._id);
                                    }}
                                >
                                    Add to Bag
                                </button>
                            ) : (
                                <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-xl">
                                    <button
                                        onClick={() => {
                                            if (cartItem.quantity > 1) {
                                                updateQuantity(
                                                    cartItem.product._id,
                                                    cartItem.quantity - 1
                                                );
                                            }
                                        }}
                                        className="w-7 h-7 rounded-lg text-gray-600 font-bold hover:bg-white hover:shadow-sm active:scale-95 transition-all flex items-center justify-center text-sm"
                                    >
                                        -
                                    </button>

                                    <span className="font-bold text-sm px-3 w-8 text-center text-gray-950">
                                        {cartItem.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                cartItem.product._id,
                                                cartItem.quantity + 1
                                            )
                                        }
                                        className="w-7 h-7 rounded-lg text-gray-600 font-bold hover:bg-white hover:shadow-sm active:scale-95 transition-all flex items-center justify-center text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <button className="sm:px-6 py-3.5 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99] transition-all text-sm uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
                                <span>🤍</span> <span className="hidden sm:inline">Wishlist</span>
                            </button>
                        </div>

                        {/* Clean Details Panel */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">
                                Technical Specifications
                            </h3>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );

    // return (
    //     <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
    //         {/* Breadcrumbs Navigation */}
    //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
    //             <nav className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase">
    //                 <Link to="/main" className="hover:text-indigo-600">
    //                     Products
    //                 </Link>

    //                 <span>/</span>

    //                 <span className="text-gray-900 font-bold">
    //                     {perticularProduct?.title}
    //                 </span>
    //             </nav>
    //         </div>

    //         {/* Main Product Frame Container */}
    //         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
    //             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

    //                 {/* Left Column: Premium Image Gallery Showcase */}
    //                 <div className="lg:col-span-7 space-y-4">
    //                     <div className="aspect-[4/5] bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm relative group flex items-center justify-center text-gray-400">
    //                         {/* If you have image data: <img src={product.image} className="w-full h-full object-cover" /> */}
    //                         <img
    //                             src={perticularProduct?.image}
    //                             alt={perticularProduct?.title}
    //                             className="w-full h-full object-cover"
    //                         />
    //                         <span className="absolute top-4 left-4 bg-gray-950 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
    //                             In Stock
    //                         </span>
    //                     </div>

    //                     {/* Mock Thumbnail Strip */}

    //                 </div>

    //                 {/* Right Column: Commercial Details & Specification Lists */}
    //                 <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">

    //                     {/* Header Description Info */}
    //                     <div className="space-y-3 border-b border-gray-200 pb-6">
    //                         <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950 leading-tight">
    //                             {perticularProduct?.title}
    //                         </h1>
    //                         <div className="flex items-baseline gap-4">
    //                             <span className="text-2xl font-black text-indigo-600">
    //                                 ₹ {perticularProduct?.price?.toLocaleString('en-IN')}
    //                             </span>
    //                             <span className="text-xs text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-100">
    //                                 Free Delivery Included
    //                             </span>
    //                         </div>
    //                         <p className="text-sm text-gray-600 leading-relaxed pt-2">
    //                             {perticularProduct?.desc}
    //                         </p>
    //                     </div>

    //                     {/* Quick Choice Selector Mocks */}

    //                     {/* Checkout/Basket Add Primary Action Group */}
    //                     <div className="flex flex-col sm:flex-row gap-4 pt-2">
    //                         <button className="flex-1 bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-md transform active:scale-[0.99] transition-all text-sm uppercase tracking-wider" onClick={() => addToCart(perticularProduct._id)}>
    //                             Add to Bag
    //                         </button>
    //                         <button className="sm:px-6 py-3.5 bg-white text-gray-700 border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm uppercase tracking-wider">
    //                             🤍 Wishlist
    //                         </button>
    //                     </div>

    //                     {/* Specifications Grid Block */}
    //                     <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
    //                         <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">
    //                             Technical Specifications
    //                         </h3>
    //                     </div>

    //                 </div>

    //             </div>
    //         </main>
    //     </div>
    // );
}

export default Product