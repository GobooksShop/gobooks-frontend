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
import useCategoryStore from '../../../store/useCategoryStore';

function Category() {
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
  const [isInputValid, setIsInputValid] = useState(false);

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
    if (isInputValid) {
      await addCategory({
        name: newCategoryName,
        parentId: newParentId || null,
      });
      fetchCategories();
      setNewCategoryName('');
      setNewParentId('');
    }
  };

  useEffect(() => {
    setIsInputValid(newCategoryName.trim() !== '');
  }, [newCategoryName]);

  const handleUpdateCategory = async () => {
    await updateCategory(editCategory, {
      name: editCategoryName,
      parentId: editParentId || null,
    });
    fetchCategories();
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
      fetchCategories();
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
        value={String(category.id)}
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
      sx={{
        ml: level * 6,
        my: 2,
        border: '1px solid lightgray',
        px: 4,
        py: 2,
        borderRadius: 1,
      }}
    >
      {editCategory === category.id ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Category Name"
            variant="outlined"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="tw-mr-2"
            sx={{ marginRight: '10px' }}
          />
          <FormControl variant="outlined" className="tw-min-w-[120px] tw-mr-2 ">
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={editParentId}
              onChange={(e) => setEditParentId(e.target.value)}
              label="Parent Category"
              sx={{ width: 200, marginRight: '10px' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((rootCategory) =>
                renderCategoryOptions(rootCategory),
              )}
            </Select>
          </FormControl>
          <Box className="tw-ml-auto">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdateCategory}
              sx={{ marginLeft: '10px', padding: '8px 16px' }}
            >
              저장
            </Button>
            <Button
              variant="outlined"
              onClick={() => setEditCategory(null)}
              sx={{ marginLeft: '10px', padding: '8px 16px' }}
            >
              취소
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body1"
            className="tw-mr-2"
            sx={{ marginRight: '50px' }}
          >
            {category.name}
          </Typography>
          <Box className="tw-ml-auto">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setEditCategory(category.id);
                setEditCategoryName(category.name);
                setEditParentId(category.parentId || '');
              }}
              sx={{ marginRight: '10px', padding: '8px 16px' }}
            >
              수정
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteCategoryWithConfirmation(category.id)}
              sx={{ marginRight: '10px', padding: '8px 16px' }}
            >
              삭제
            </Button>
          </Box>
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
      {expandedCategories[category.id] && category.children && (
        <ul className="tw-list-none tw-space-y-2">
          {category.children.map((child) => renderCategory(child, level + 1))}
        </ul>
      )}
    </Box>
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <PageContainer>
      <main
        style={{
          maxWidth: '833px',
          margin: '0 auto',
        }}
      >
        <Box className="tw-border tw-mb-4 tw-flex tw-flex-wrap">
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginBottom: 2, flex: '0 0 100%' }}
          >
            카테고리 추가
          </Typography>
          <div className="tw-flex tw-items-center tw-w-full">
            <TextField
              label="카테고리 이름을 입력하세요."
              variant="outlined"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="tw-mr-2"
              sx={{ flex: '1 1 auto', marginRight: '10px' }}
            />
            <FormControl
              variant="outlined"
              sx={{ flex: '1 1 auto', marginRight: 2 }}
            >
              <InputLabel>카테고리 선택</InputLabel>
              <Select
                value={newParentId}
                onChange={(e) => setNewParentId(e.target.value)}
                label="Parent Category"
                sx={{ width: '100%' }}
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
              disabled={!newCategoryName}
              sx={{ flex: '0 0 150px', alignSelf: 'stretch' }}
            >
              생성
            </Button>
          </div>
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ marginTop: 5, marginBottom: 2 }}
        >
          카테고리 수정/삭제
        </Typography>
        <ul className="tw-list-none">
          {categories.map((category) => renderCategory(category))}
        </ul>
      </main>
    </PageContainer>
  );
}

export default Category;
