import React from 'react'
import useProductStore from "../store/productStore";

const AddProductForm = () => {
    const {
        productData,
        setProductData,
        createProduct,
        isEditing,
        updateProduct,
        showAdd
    } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await updateProduct();
        } else {
            await createProduct();
        }
    };
    return (
        <>
            {showAdd && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 animation-slideDown">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Add New Product
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <input
                            required
                            type="text"
                            placeholder="Product Title"
                            className="border px-4 py-3 rounded-lg"
                            value={productData.title}
                            onChange={(e) =>
                                setProductData({
                                    title: e.target.value
                                })
                            }
                        />

                        <input
                            required
                            type="number"
                            placeholder="Product Price"
                            className="border px-4 py-3 rounded-lg"
                            value={productData.price}
                            onChange={(e) =>
                                setProductData({
                                    price: e.target.value
                                })
                            }
                        />

                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full border px-4 py-3 rounded-lg"
                                value={productData.image}
                                onChange={(e) =>
                                    setProductData({
                                        image: e.target.value
                                    })
                                }
                            />
                        </div>

                        <textarea
                            required
                            placeholder="Product Description"
                            className="border px-4 py-3 rounded-lg md:col-span-2 h-32"
                            value={productData.desc}
                            onChange={(e) =>
                                setProductData({
                                    desc: e.target.value
                                })
                            }
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black"
                        >
                            {isEditing ? "Update Product" : "Add Product"}
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default AddProductForm;