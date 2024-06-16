import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  deleteUserAddress,
  getUserAddress,
  saveUserAddress,
  updateUserAddress,
} from '../../api/user/userApi';

import AddressForm from './fragments/AddressForm';
import useUserStore from '../../store/useUserStore';

function MyPageAddress() {
  const { user, setAddresses } = useUserStore((state) => ({
    user: state.user || { addresses: [] },
    setAddresses: state.setAddresses,
  }));
  const [formOpen, setFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAddresses() {
      if (user.userId) {
        setLoading(true);
        try {
          const addresses = await getUserAddress(user.userId);
          setAddresses(addresses || []);
        } catch (error) {
          console.error('주소를 불러오는 데 실패했습니다:', error);
          setSnackbar({
            open: true,
            message: '주소를 불러오는 데 실패했습니다.',
          });
          setAddresses([]);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchAddresses();
  }, [user.userId, setAddresses]);

  const handleFormOpen = (address = {}) => {
    setSelectedAddress(address);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedAddress(null);
  };

  const handleSaveAddress = async (address) => {
    try {
      const savedAddress =
        selectedAddress && selectedAddress.addressId
          ? await updateUserAddress(user.userId, {
              ...selectedAddress,
              ...address,
            })
          : await saveUserAddress(user.userId, address);
      const newAddresses =
        selectedAddress && selectedAddress.addressId
          ? user.addresses.map((a) =>
              a.addressId === savedAddress.addressId ? savedAddress : a,
            )
          : [...user.addresses, savedAddress];
      setAddresses(newAddresses);
      setSnackbar({
        open: true,
        message: '주소가 성공적으로 저장되었습니다.',
      });
    } catch (error) {
      console.error('주소 저장에 실패했습니다:', error);
      setSnackbar({ open: true, message: '주소 저장에 실패했습니다.' });
    } finally {
      handleFormClose();
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddress(user.userId, addressId);
      const updatedAddresses = user.addresses.filter(
        (address) => address.addressId !== addressId,
      );
      setAddresses(updatedAddresses);
      setSnackbar({ open: true, message: '주소가 삭제되었습니다.' });
    } catch (error) {
      console.error('주소 삭제에 실패했습니다:', error);
      setSnackbar({ open: true, message: '주소 삭제에 실패했습니다.' });
    }
  };

  return (
    <Paper
      elevation={3}
      className="tw-w-full tw-max-w-xl tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md tw-flex tw-flex-col tw-justify-between"
    >
      <div>
        <Typography variant="h6" className="tw-mb-4 tw-text-center">
          주소 관리
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((address, index) => (
                <ListItem
                  key={index}
                  className="tw-mb-4 tw-p-4 tw-border tw-border-gray-300 tw-rounded-lg"
                >
                  <ListItemText
                    primary={`${address.label} - ${address.recipientName}`}
                    secondary={`${address.zipcode}, ${address.address1}, ${address.address2}`}
                  />
                  <IconButton
                    onClick={() => handleFormOpen(address)}
                    edge="end"
                    aria-label="edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteAddress(address.addressId)}
                    edge="end"
                    aria-label="delete"
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" className="tw-text-center">
                주소가 없습니다. 주소를 추가해 주세요.
              </Typography>
            )}
          </List>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleFormOpen()}
          className="tw-mb-4 self-end"
          style={{ width: '140px', height: '35px' }}
        >
          주소 추가
        </Button>
      </div>
      <AddressForm
        open={formOpen}
        handleClose={handleFormClose}
        handleSave={handleSaveAddress}
        initialData={selectedAddress}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Paper>
  );
}

export default MyPageAddress;
