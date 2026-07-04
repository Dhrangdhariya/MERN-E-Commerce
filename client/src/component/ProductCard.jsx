import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useProductStore from '../store/productStore';

const ProductCard = ({ item, isAdmin, addToCart, deleteProduct, startEditing, fetchProductById }) => {
    const navigate = useNavigate();
    const {
        cart,
        fetchCart,
        updateQuantity
    } = useCartStore();

    const { perticularProduct } = useProductStore();

    useEffect(() => {
        fetchCart();
    }, []);

    const cartItem = cart.find(
        (item) => item.product._id === perticularProduct?._id
    );

    const handelProductOpen = async (id) => {
        await fetchProductById(id);
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handelProductOpen(item._id)}>
                {/* Visual Image Block */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Item Info */}
                <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                        {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {item.desc}
                    </p>
                    <div className="flex items-center justify-between pt-3">
                        <span className="text-base font-bold text-gray-900">{item.price}</span>
                        <div className="flex items-center gap-2">
                            {isAdmin ? <> <button className="text-xs px-3 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProduct(item._id);
                                }}>
                                Delete
                            </button>
                                <button className="text-xs px-3 py-2 font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startEditing(item);
                                    }}>
                                    Update
                                </button> </> : <>
                                {!cartItem ?
                                    (< button onClick={() => addToCart(item._id)} className="bg-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-indigo-700 transition-all active:scale-95">
                                        Add to Cart
                                    </button>) : (
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
                                    )
                                }
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductCard