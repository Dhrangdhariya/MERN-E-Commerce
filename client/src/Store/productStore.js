import { create } from "zustand";
import axios from "axios";

const API = "http://localhost:5000/main";


const useProductStore = create((set, get) => ({
  // ===========================
  // STATES
  // ===========================
  products: [],
  perticularProduct: null,

  showAdd: false,

  productData: {
    title: "",
    desc: "",
    price: "",
    image: "",
  },

  isEditing: false,

  editingId: null,

  // ===========================
  // SETTERS
  // ===========================
  setShowAdd: (value) => set({ showAdd: value }),

  setProductData: (data) =>
    set((state) => ({
      productData: {
        ...state.productData,
        ...data,
      },
    })),

  resetForm: () =>
    set({
      productData: {
        title: "",
        desc: "",
        price: "",
        image: "",
      },
      isEditing: false,
      editingId: null,
    }),

  // ===========================
  // FETCH PRODUCTS
  // ===========================
  fetchProducts: async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        products: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // ===========================
  // CREATE PRODUCT
  // ===========================
  createProduct: async () => {
    try {
      const token = localStorage.getItem("token");

      const { productData } = get();

      await axios.post(API, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      get().resetForm();

      set({
        showAdd: false,
      });

      get().fetchProducts();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to create product");
    }
  },

  // ===========================
  // START EDIT
  // ===========================
  startEditing: (product) => {
    set({
      productData: {
        title: product.title,
        desc: product.desc,
        price: product.price,
        image: product.image,
      },

      editingId: product._id,

      isEditing: true,

      showAdd: true,
    });
  },

  // ===========================
  // UPDATE PRODUCT
  // ===========================
  updateProduct: async () => {
    try {
      const token = localStorage.getItem("token");

      const {
        editingId,
        productData,
      } = get();

      await axios.put(
        `${API}/${editingId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      get().resetForm();

      set({
        showAdd: false,
      });

      get().fetchProducts();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to update product");
    }
  },

  // ===========================
  // DELETE PRODUCT
  // ===========================
  deleteProduct: async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      get().fetchProducts();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to delete product");
    }
  },

  fetchProductById: async(id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ perticularProduct: res.data });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to open product");
    }
  },

  // productOpen: (id) => {
  //   try {
  //     navigate(`/product/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.response?.data?.message || "Unable to open product");
  //   }
  // },

  // const productOpen = () => { navigate('/product'); }
}));

export default useProductStore;