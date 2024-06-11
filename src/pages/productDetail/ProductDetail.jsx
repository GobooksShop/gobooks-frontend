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
        <div>
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={productDetails.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={productDetails.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={productDetails.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Discount:
                    <input
                        type="text"
                        name="discount"
                        value={productDetails.discount}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default ProductDetail;
