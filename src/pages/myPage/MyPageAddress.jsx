import { Add, Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteUserAddress, getUserAddress, saveUserAddress, updateUserAddress } from '../../api/user/userApi';

import AddressForm from './fragments/AddressForm';
import useUserStore from '../../store/useUserStore';

function MyPageAddress() {
  const { userId } = useUserStore((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getUserAddress(userId);
        setAddresses(response || []);
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        setAddresses([]);
      }
    };

    if (userId) {
      fetchAddresses();
    } else {
      console.error('userId is undefined');
    }
  }, [userId]);

  const handleFormOpen = (address = null) => {
    setSelectedAddress(address);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedAddress(null);
  };

  const handleSaveAddress = async (address) => {
    try {
      if (selectedAddress) {
        await updateUserAddress(userId, address);
      } else {
        await saveUserAddress(userId, address);
      }
      const response = await getUserAddress(userId);
      setAddresses(response || []);
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddress(userId, addressId);
      const response = await getUserAddress(userId);
      setAddresses(response || []);
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  return (
    <Paper elevation={3} className="tw-w-full tw-max-w-xl tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md">
      <Typography variant="h6" className="tw-mb-4 tw-text-center">
        주소 목록
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleFormOpen()} className="tw-mb-4">
        주소 추가
      </Button>
      <List>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <ListItem key={index} className="tw-mb-4 tw-p-4 tw-border tw-border-gray-300 tw-rounded-lg">
              <ListItemText
                primary={
                  <Typography variant="subtitle1" className="tw-font-bold">
                    {address.label}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2">
                      {address.recipientName} - {address.recipientPhone}
                    </Typography>
                    <Typography variant="body2">
                      {address.zipcode} {address.address1}
                    </Typography>
                    <Typography variant="body2">{address.address2}</Typography>
                    {address.isPrimary && (
                      <Typography variant="body2" className="tw-text-green-500">
                        (기본 주소)
                      </Typography>
                    )}
                  </>
                }
              />
              <IconButton edge="end" aria-label="edit" onClick={() => handleFormOpen(address)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAddress(address.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" className="tw-text-center">
            주소가 없습니다.
          </Typography>
        )}
      </List>
      <AddressForm
        open={formOpen}
        handleClose={handleFormClose}
        handleSave={handleSaveAddress}
        initialData={selectedAddress}
      />
    </Paper>
  );
}

export default MyPageAddress;