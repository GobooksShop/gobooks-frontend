import React, { useEffect, useState } from 'react';

import useCategoryStore from '../../../store/useCategoryStore';
import useProductStore from '../../../store/useProductStore';

const Product = () => {
    const { categories, fetchCategories, selectCategory, selectedCategoryId, isLeafCategory } = useCategoryStore();
    const { products, fetchProductsByCategory, addOrUpdateProduct, deleteProduct, isLoading: productLoading } = useProductStore();
    const [productDetails, setProductDetails] = useState({
        title: '',
        author: '',
        isbn: '',
        content: '',
        fixedPrice: '',
        publicationYear: '',
        status: '',
        stockQuantity: '',
        pictureUrl: '',
        categoryIds: []
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId) => {
        selectCategory(categoryId);
        if (isLeafCategory(categoryId)) {
            fetchProductsByCategory(categoryId);
            setProductDetails({ ...productDetails, categoryIds: [categoryId] });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addOrUpdateProduct({
            ...productDetails,
            fixedPrice: parseInt(productDetails.fixedPrice),
            stockQuantity: parseInt(productDetails.stockQuantity)
        });
        setProductDetails({ title: '', author: '', isbn: '', content: '', fixedPrice: '', publicationYear: '', status: '', stockQuantity: '', pictureUrl: '', categoryIds: [] }); // Reset form
        setIsEditing(false); // Reset editing state
    };

    const handleEdit = (product) => {
        setProductDetails({ ...product, categoryIds: product.categoryIds || [selectedCategoryId] });
        setIsEditing(true);
    };

    const handleDelete = async (productId) => {
        await deleteProduct(productId);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Product Management</h1>
            <select onChange={(e) => handleCategorySelect(e.target.value)} value={selectedCategoryId || ''} className="mb-4">
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {selectedCategoryId && isLeafCategory(selectedCategoryId) && (
                <>
                    <form onSubmit={handleSubmit} className="mb-4">
                        {/* Include all necessary fields here */}
                        {/* Example fields: */}
                        <input type="text" name="title" placeholder="Title" value={productDetails.title} onChange={handleInputChange} required className="p-2 border border-gray-300 rounded mr-2" />
                        {/* Repeat for other fields */}
                        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                    <ul className="divide-y divide-gray-200">
                        {products.map(product => (
                            <li key={product.id} className="py-4 flex justify-between items-center">
                                {/* Product details and edit/delete buttons */}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Product;
