import React, { useState, useEffect } from 'react';

const ProductDetail = ({ product, onSave, onClose }) => {
    const [productDetails, setProductDetails] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        discount: ''
    });

    useEffect(() => {
        if (product) {
            setProductDetails(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(productDetails);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={productDetails.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={productDetails.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={productDetails.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Discount:
                        <input
                            type="text"
                            name="discount"
                            value={productDetails.discount}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductDetail;
