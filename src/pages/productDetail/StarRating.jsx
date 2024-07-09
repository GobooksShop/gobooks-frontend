// src/pages/productDetail/StarRating.jsx
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

const StarRating = ({ value, onChange }) => {
    return (
        <Rating
            name="star-rating"
            value={value}
            onChange={onChange}
        />
    );
};

export default StarRating;