import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import useCartOrderStore from '../../store/useCartOrderStore';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addCart = useCartOrderStore((state) => state.addCart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addCart(product.id, 1, product.fixedPrice);
        }
    };

    const handleBuyNow = () => {
        navigate(`/order`, { state: { productId: id, buyNow: true } });
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading the product.</p>;
    if (!product) return <p>No product found</p>;

    return (
        <Card className="max-w-4xl mx-auto my-8 shadow-md">
            <Grid container spacing={2}>
                <Grid item md={6}>
                    {product.pictureUrl && (
                        <img src={product.pictureUrl} alt={product.title} style={{ width: "400px", height: "500px" }} />
                    )}
                </Grid>
                <Grid item md={6} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>{product.title}</Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Price: ${product.fixedPrice}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Author: {product.author}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            ISBN: {product.isbn}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Description: {product.content}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Published: {product.publicationYear}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            style={{ marginTop: 20 }}
                        >
                            장바구니에 추가
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleBuyNow}
                            style={{ marginTop: 10 }}
                        >
                            구매하기
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductDetailPage;