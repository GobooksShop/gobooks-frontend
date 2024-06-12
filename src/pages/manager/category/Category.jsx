import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageContainer } from '../../../components/PageContainer';
import useCategoryStore from '../../../store/useCategoryStore'; // Assuming this provides necessary methods
import { useNavigate } from 'react-router-dom';

function Category() {
  const navigate = useNavigate();
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    error,
  } = useCategoryStore();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newParentId, setNewParentId] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editParentId, setEditParentId] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleToggleCategory = (id) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCreateCategory = async () => {
    await addCategory({ name: newCategoryName, parentId: newParentId || null });
    fetchCategories(); // Re-fetch categories to update state
    setNewCategoryName('');
    setNewParentId('');
  };

  const handleUpdateCategory = async () => {
    await updateCategory(editCategory, {
      name: editCategoryName,
      parentId: editParentId || null,
    });
    fetchCategories(); // Re-fetch categories to update state
    setEditCategory(null);
    setEditCategoryName('');
    setEditParentId('');
  };

  const deleteCategoryWithConfirmation = async (id) => {
    const confirmDelete = window.confirm(
      '이 카테고리를 삭제하시겠습니까? 모든 하위 카테고리도 함께 삭제됩니다.',
    );
    if (confirmDelete) {
      await deleteCategoryAndChildren(id);
      fetchCategories(); // Re-fetch categories to update state
    }
  };

  const deleteCategoryAndChildren = async (id) => {
    const categoryToDelete = categories.find((category) => category.id === id);
    if (categoryToDelete && categoryToDelete.children) {
      for (const child of categoryToDelete.children) {
        await deleteCategoryAndChildren(child.id);
      }
    }
    await deleteCategory(id);
  };

  const renderCategoryOptions = (category, level = 0) =>
    [
      <MenuItem
        key={category.id}
        value={category.id}
        sx={{ marginLeft: `${level * 20}px` }}
      >
        {category.name}
      </MenuItem>,
      category.children &&
        category.children.map((child) =>
          renderCategoryOptions(child, level + 1),
        ),
    ].flat();

  const renderCategory = (category, level = 0) => (
    <Box
      key={category.id}
      sx={{ marginLeft: `${level * 20}px`, marginBottom: '10px' }}
    >
      {editCategory === category.id ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Category Name"
            variant="outlined"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="mr-2"
            sx={{ marginRight: '10px' }}
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
              {categories.map((rootCategory) =>
                renderCategoryOptions(rootCategory),
              )}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateCategory}
            sx={{ marginRight: '10px', padding: '8px 16px' }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setEditCategory(null)}
            sx={{ marginRight: '10px', padding: '8px 16px' }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body1"
            className="mr-2"
            sx={{ marginRight: '10px' }}
          >
            {category.name}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setEditCategory(category.id);
              setEditCategoryName(category.name);
              setEditParentId(category.parentId || '');
            }}
            sx={{ marginRight: '5px', padding: '3px 3px' }}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteCategoryWithConfirmation(category.id)}
            sx={{ marginRight: '5px', padding: '3px 3px' }}
          >
            삭제
          </Button>
          {category.children && category.children.length > 0 && (
            <IconButton onClick={() => handleToggleCategory(category.id)}>
              {expandedCategories[category.id] ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          )}
        </Box>
      )}
      {expandedCategories[category.id] &&
        category.children &&
        category.children.map((child) => renderCategory(child, level + 1))}
    </Box>
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <PageContainer >
      <main className="min-h-[300px]">
        <Typography variant="h4" gutterBottom >
          카테고리 관리 페이지
        </Typography>
        <div className="tw-mb-4 tw-flex tw-items-center">
          <TextField
            label="카테고리 이름을 입력하세요."
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="tw-mr-2"
            sx={{ marginRight: '10px' }}
          />
          <FormControl
            variant="outlined"
            sx={{ minWidth: 200, width: 200, marginRight: 2 }}
          >
            <InputLabel>카테고리 선택</InputLabel>
            <Select
              value={newParentId}
              onChange={(e) => setNewParentId(e.target.value)}
              label="Parent Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => renderCategoryOptions(category))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCategory}
            sx={{ padding: '3px 3px' }}
          >
            생성
          </Button>
        </div>
        {categories.map((category) => renderCategory(category))}
      </main>
    </PageContainer>
  );
}

export default Category;
