import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { PageContainer } from '../../../components/PageContainer';
import useCategoryStore from '../../../store/useCategoryStore'; // Assuming this provides necessary methods
import { useNavigate } from 'react-router-dom';

function Category() {
    const navigate = useNavigate();
    const { categories, fetchCategories, addCategory, updateCategory, deleteCategory, isLoading, error } = useCategoryStore();
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newParentId, setNewParentId] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editParentId, setEditParentId] = useState('');

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleCreateCategory = async () => {
        await addCategory({ name: newCategoryName, parentId: newParentId || null });
        setNewCategoryName('');
        setNewParentId('');
    };

    const handleUpdateCategory = async () => {
        await updateCategory(editCategory, { name: editCategoryName, parentId: editParentId || null });
        setEditCategory(null);
        setEditCategoryName('');
        setEditParentId('');
    };

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">{error.message}</Typography>;

    return (
        <PageContainer>
            <main className="min-h-[300px]">
                <Typography variant="h4" gutterBottom>Manage Categories</Typography>
                <div className="mb-4">
                    <TextField
                        label="New Category Name"
                        variant="outlined"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="mr-2"
                    />
                    <FormControl variant="outlined" className="min-w-[120px] mr-2">
                        <InputLabel>Parent Category</InputLabel>
                        <Select
                            value={newParentId}
                            onChange={(e) => setNewParentId(e.target.value)}
                            label="Parent Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleCreateCategory}>Create</Button>
                </div>
                {categories.map(category => (
                    <div key={category.id} className="mb-2">
                        {editCategory === category.id ? (
                            <div>
                                <TextField
                                    label="Category Name"
                                    variant="outlined"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    className="mr-2"
                                />
                                <FormControl variant="outlined" className="min-w-[120px] mr-2">
                                    <InputLabel>Parent Category</InputLabel>
                                    <Select
                                        value={editParentId}
                                        onChange={(e) => setEditParentId(e.target.value)}
                                        label="Parent Category"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {categories.map(subCategory => (
                                            <MenuItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="secondary" onClick={handleUpdateCategory}>Save</Button>
                                <Button variant="outlined" onClick={() => setEditCategory(null)}>Cancel</Button>
                            </div>
                        ) : (
                            <div>
                                {category.name}
                                <Button variant="outlined" color="primary" onClick={() => {
                                    setEditCategory(category.id);
                                    setEditCategoryName(category.name);
                                    setEditParentId(category.parentId || "");
                                }}>Edit</Button>
                                <Button variant="outlined" color="error" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                            </div>
                        )}
                    </div>
                ))}
            </main>
        </PageContainer>
    );
}

export default Category;
