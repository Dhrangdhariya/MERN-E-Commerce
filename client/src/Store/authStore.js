import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
    user: null,

    token: localStorage.getItem("token") || null,

    role: localStorage.getItem("role") || null,

    isAdmin: localStorage.getItem("role") === "admin",

    // ==========================
    // LOGIN
    // ==========================
    login: async (email, password) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            const data = res.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            set({
                user: data,
                token: data.token,
                role: data.role,
                isAdmin: data.role === "admin",
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login Failed",
            };
        }
    },

    // ==========================
    // LOGOUT
    // ==========================
    logout: () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        set({
            user: null,
            token: null,
            role: null,
            isAdmin: false,
        });

    },

    // ==========================
    // LOAD USER
    // ==========================
    loadUser: () => {

        const token = localStorage.getItem("token");

        const role = localStorage.getItem("role");

        set({
            token,
            role,
            isAdmin: role === "admin",
        });

    },

}));

export default useAuthStore;