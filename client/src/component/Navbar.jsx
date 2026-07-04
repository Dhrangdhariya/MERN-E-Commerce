import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProductForm from "./AddProductForm";
import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

const Navbar = () => {
    const navigate = useNavigate();
    const { cartCount, fetchCart } = useCartStore();
    const { isAdmin, logout } = useAuthStore();
    const {
        showAdd,
        setShowAdd
    } = useProductStore();

    useEffect(() => {
        fetchCart();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Company Name */}
                <div className="flex items-center gap-2 cursor-pointer">
                    {/* Logo Image */}
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyWY0e-U0tBz1zjr8Fu2V-8sxgoH2Gd6g3O-eV-iBkg&s"
                        alt="SHOPBLISS Logo"
                        className="h-8 w-auto object-contain"
                    />

                    {/* Brand Name */}
                    <span className="text-xl font-bold tracking-tight text-indigo-600">
                        SHOPBLISS
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    {isAdmin && (
                        <button
                            className="bg-emerald-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-emerald-700 shadow-sm transition-colors"
                            onClick={() => setShowAdd(!showAdd)}
                        >
                            {showAdd ? "Cancel Product" : "+ Add Product"}
                        </button>
                    )}

                    {!isAdmin && (
                        <Link
                            to="/cart"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Cart {cartCount}
                        </Link>
                    )}

                    <button
                        className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-800"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <AddProductForm />
        </nav>
    );
};

export default Navbar;