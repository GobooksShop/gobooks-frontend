import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import useCartOrderStore from '../../store/useCartOrderStore'; // 상태 관리 스토어 가져오기

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addCart = useCartOrderStore((state) => state.addCart); // 장바구니 추가 함수 가져오기

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
            addCart(product.id, 1, product.fixedPrice); // 제품 ID, 수량, 가격을 장바구니에 추가
        }
    };

    const handleBuyNow = () => {
        navigate(`/order`, { state: { productId: id, buyNow: true } }); // 구매 페이지로 이동, 상품 ID 전달
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading the product.</p>;
    if (!product) return <p>No product found</p>;

    return (
        <Card className="max-w-lg mx-auto my-8 shadow-md overflow-hidden md:max-w-2xl">
            <CardContent>
                <Typography variant="h5" component="div">{product.title}</Typography>
                <Typography color="text.secondary">
                    Author: {product.author}
                </Typography>
                <Typography variant="body2">
                    ISBN: {product.isbn}<br />
                    Year: {product.publicationYear}<br />
                    Price: ${product.fixedPrice}<br />
                    Description: {product.content}
                </Typography>
                {product.pictureUrl && (
                    <img src={product.pictureUrl} alt={product.title} style={{ width: "200px" , height: "200px"}} />
                )}
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
                    style={{ marginTop: 20, marginLeft: 10 }}
                >
                    구매하기
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductDetailPage;