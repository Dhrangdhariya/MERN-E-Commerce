import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", email: "", password: "",
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
            await axios.post(
                "http://localhost:5000/register",
                formData
            );
            setFormData({ name: '', email: '', password: '' });
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans text-gray-900">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-950">Create Account</h2>
                    <p className="text-sm text-gray-500 mt-1">Get started with SHOPBLISS today.</p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="John Doe"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="john@example.com"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-700 shadow-sm transition-all pt-3">
                        Register
                    </button>
                </form>

                {/* Footer link */}
                <p className="text-center text-xs text-gray-500">
                    Already have an account?
                    <Link
                        to="/login" className="text-indigo-600 font-medium hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register
