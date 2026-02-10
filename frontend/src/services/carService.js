import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getAllCars = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        // Using axios for backend API calls
        const response = await axios.get(`${API_URL}/api/cars`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

export const getCarById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching car:', error);
        throw error;
    }
};

export const createCar = async (carData) => {
    try {
        const response = await axios.post(`${API_URL}/api/cars`, carData);
        return response.data;
    } catch (error) {
        console.error('Error creating car:', error);
        throw error;
    }
};

export const updateCar = async (id, carData) => {
    try {
        const response = await axios.put(`${API_URL}/api/cars/${id}`, carData);
        return response.data;
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
};

export const deleteCar = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
};
