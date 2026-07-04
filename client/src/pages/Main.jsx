import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import ProductCard from "../component/ProductCard";
import Footer from '../component/Footer';
import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

const Main = () => {
  // Toggle this variable to true/false to see the Admin vs Regular User header view
  const navigate = useNavigate();
  const { isAdmin, token } = useAuthStore();
  const [search, setSearch] = useState("");
  const {
    products,
    showAdd,
    setShowAdd,
    productData,
    setProductData,
    isEditing,
    editingId,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    startEditing,
    fetchProductById
  } = useProductStore();

  const { addToCart, fetchCart } = useCartStore();

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    fetchProducts();
    fetchCart();
  }, [navigate, fetchProducts, fetchCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Main Header / Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero
        search={search}
        setSearch={setSearch}
      />
      {/* Main Catalog Grid */}
      < main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10" >
        <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6">
          All Products
        </h2>
        {/* Basic Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? <div className='p-6 text-gray-500 text-center'>No Item in shop</div> :
            products
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <ProductCard
                  key={item._id}
                  item={item}
                  isAdmin={isAdmin}
                  addToCart={addToCart}
                  deleteProduct={deleteProduct}
                  startEditing={startEditing}
                  fetchProductById={fetchProductById}
                />
              ))
          }
        </div>
      </main >
      {/* Small Clean Footer */}
      <Footer />
    </div >
  );
}

export default Main;