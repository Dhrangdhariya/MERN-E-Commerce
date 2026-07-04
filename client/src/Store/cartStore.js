import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set, get) => ({

    cart: [],

    cartCount: 0,

    // =====================
    // FETCH CART
    // =====================

    fetchCart: async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const totalItems = res.data.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            set({
                cart: res.data.items,
                cartCount: totalItems,
            });

        } catch (error) {

            console.log(error);

        }

    },

    // =====================
    // ADD TO CART
    // =====================

    addToCart: async (productId) => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    productId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await get().fetchCart();

        } catch (error) {

            console.log(error);

        }

    },

    // =====================
    // REMOVE
    // =====================

    removeItem: async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/cart/remove/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await get().fetchCart();

        } catch (error) {

            console.log(error);

        }

    },

    // =====================
    // UPDATE QTY
    // =====================

    updateQuantity: async (id, qty) => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                "http://localhost:5000/cart/update",
                {
                    productId: id,
                    quantity: qty,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await get().fetchCart();

        } catch (error) {

            console.log(error);

        }

    },

}));

export default useCartStore;