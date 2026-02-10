import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/api/bookings`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getUserBookings = async (userId, role) => {
    try {
        const response = await axios.get(`${API_URL}/api/bookings`, {
            params: { userId, role }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
    }
};

export const createCheckoutSession = async (bookingId, amount, carDetails) => {
    try {
        const response = await axios.post(`${API_URL}/api/payments/create-checkout-session`, {
            bookingId,
            amount,
            carDetails
        });
        return response.data;
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};
