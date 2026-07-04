import React, { useState, useEffect, useMemo } from 'react'
import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

const Hero = ({ search, setSearch }) => {
    const { products } = useProductStore();
    const { addToCart } = useCartStore();
    const { isAdmin } = useAuthStore();

    const topProducts = products.filter(product => product.price === Math.max(...products.map(p => p.price))); //highest price product in top product

    return (
        <>
            <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden" >
                {/* Decorative abstract background light */}
                < div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                    {/* Left Column: Bold Copy & Dynamic Badges */}
                    <div className="space-y-6 lg:col-span-7 text-left">
                        <div className="max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-indigo-300 border border-white/10">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            JUST DROPPED: SUMMER CATALOGUE
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none uppercase">
                            Don't Just Outfit. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300">
                                Out-Perform.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
                            Experience the intersection of high-utility tech fabrics and ultra-minimal aesthetics. Built for the modern creator.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">

                            <button className="bg-transparent text-white border border-white/20 font-semibold px-6 py-3.5 rounded-lg hover:bg-white/5 transition-all text-sm tracking-wider uppercase">
                                Learn More
                            </button>
                        </div>
                    </div>
                    {/* start */}
                    {/* Right Column: Premium Visual Interactive Placeholder */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative group w-full max-w-sm aspect-[4/5] bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-sm">
                            {/* Inner clean skeleton mockup box */}
                            <div className="w-full h-full rounded-xl bg-slate-950/40 border border-white/5 flex flex-col justify-between p-6 overflow-hidden relative">

                                {/* Top row of card */}
                                <div className="flex justify-between items-start">
                                    <span className="text-xs tracking-widest text-slate-400 font-mono">EDITION // 01</span>
                                    <span className="bg-indigo-500 text-[10px] font-black px-2 py-0.5 rounded tracking-wide">TOP PICKS</span>
                                </div>

                                {/* Simulated product layout */}
                                {/* Random Product */}
                                {products.length > 0 ? (
                                    <div className="space-y-3">
                                        <img
                                            src={topProducts[0].image}
                                            alt={topProducts[0].title}
                                            className="w-full h-56 object-cover rounded-lg"
                                        />

                                        <h3 className="text-white text-xl font-bold">
                                            {topProducts[0].title}
                                        </h3>

                                        <p className="text-sm text-slate-300 line-clamp-2">
                                            {topProducts[0].desc}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-white text-center">
                                        No Products
                                    </div>
                                )}

                                {/* Abstract visual art lines */}
                                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 border border-dashed border-white/5 rounded-full flex items-center justify-center">
                                    <div className="w-32 h-32 border border-indigo-500/10 rounded-full flex items-center justify-center">
                                        <div className="w-16 h-16 bg-indigo-500/10 rounded-full blur-xl" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end */}
                </div>
            </header >
        </>
    )
}

export default Hero
