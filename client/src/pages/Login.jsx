import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "", password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/login",
                formData
            );
            localStorage.setItem('token', response.data.token);
            localStorage.setItem("role", response.data.role);
            navigate('/main');
        } catch(error) {
            console.log(error.message);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans text-gray-900">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-950">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your SHOPBLISS account.</p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-800 shadow-sm transition-all pt-3">
                        Sign In
                    </button>
                </form>

                {/* Footer link */}
                <p className="text-center text-xs text-gray-500">
                    Don't have an account? <Link to='/register' className="text-indigo-600 font-medium hover:underline">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login
