import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <span className="text-xl font-bold tracking-tight text-indigo-600">
                    SHOPBLISS
                </span>
                <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Link to='/register'>
                        Register
                    </Link>
                </button>
            </nav>

            {/* Simple Intro Hero */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                    Welcome to <span className="text-indigo-600">SHOPBLISS</span>
                </h1>

                <p className="text-gray-600 text-lg"> 
                    Your new favorite destination for curated minimalist essentials. Discover quality products crafted to elevate your daily routine.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
                    <button className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-all">
                        <Link to='/main'> Explore Products </Link>
                    </button>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">
                &copy; 2026 SHOPBLISS. All rights reserved.
            </footer>
        </div>
    );
}

export default Home
