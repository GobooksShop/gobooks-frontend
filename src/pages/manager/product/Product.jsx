import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetail from './ProductDetail';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    const handleUpdateProduct = async (product) => {
        try {
            await axios.put(`/api/products/${product.id}`, product);
            fetchProducts();
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
    };

    return (
        <div>
            <h1>Product Management</h1>
            <button onClick={() => setIsEditing(true)}>Add Product</button>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
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
