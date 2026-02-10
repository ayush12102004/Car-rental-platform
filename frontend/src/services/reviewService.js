import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getCarReviews = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/reviews/${carId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const createReview = async (reviewData) => {
    try {
        const response = await axios.post(`${API_URL}/api/reviews`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};
