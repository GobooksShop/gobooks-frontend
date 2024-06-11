import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handleAddProduct = async (product) => {
        try {
            await axios.post('/api/products', product);
            fetchProducts();
            setIsEditing(false);
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    const handleUpdateProduct = async (product) => {
        try {
            await axios.put(`/api/products/${product.id}`, product);
            fetchProducts();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Product Management</h1>
            <button
                onClick={() => setIsEditing(true)}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Add Product
            </button>
            <ul className="divide-y divide-gray-200">
                {products.map(product => (
                    <li key={product.id} className="py-4 flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">${product.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEditProduct(product)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isEditing && (
                <ProductDetail
                    product={selectedProduct}
                    onSave={selectedProduct ? handleUpdateProduct : handleAddProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        setIsEditing(false);
                    }}
                />
            )}
        </div>
    );
};

export default Product;
