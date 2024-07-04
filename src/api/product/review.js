import axios from 'axios';

const BASE_URL = '/api/reviews'; // Adjust this base URL according to your backend API endpoint

const review = {
    addReview: async (productId, content, rating) => {
        const response = await axios.post(`${BASE_URL}`, {
            productId,
            content,
            rating,
        });
        return response.data;
    },
    getReviewsByProductId: async (productId) => {
        const response = await axios.get(`${BASE_URL}/product/${productId}`);
        return response.data;
    },
};

export default review;