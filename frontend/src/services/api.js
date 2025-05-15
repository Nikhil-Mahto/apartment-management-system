import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication Services
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to connect to server' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to connect to server' };
  }
};

// Apartment Services
export const getApartments = async (params = {}) => {
  try {
    const response = await api.get('/apartments', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch apartments' };
  }
};

export const getApartmentById = async (id) => {
  try {
    const response = await api.get(`/apartments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch apartment details' };
  }
};

export const bookApartment = async (apartmentId, bookingData) => {
  try {
    const response = await api.post(`/apartments/${apartmentId}/book`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to book apartment' };
  }
};

// Complaint Services
export const createComplaint = async (complaintData) => {
  try {
    const response = await api.post('/complaints', complaintData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to create complaint' };
  }
};

export const getComplaints = async (params = {}) => {
  try {
    const response = await api.get('/complaints', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch complaints' };
  }
};

export const updateComplaintStatus = async (complaintId, status) => {
  try {
    const response = await api.patch(`/complaints/${complaintId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to update complaint status' };
  }
};

// Payment Services
export const makePayment = async (paymentData) => {
  try {
    const response = await api.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to process payment' };
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await api.get('/payments/history');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch payment history' };
  }
};

// User Services
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch user profile' };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to update user profile' };
  }
};

// Admin Services
export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch admin statistics' };
  }
};

export const createApartment = async (apartmentData) => {
  try {
    const response = await api.post('/apartments', apartmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to create apartment' };
  }
};

export const updateApartment = async (apartmentId, apartmentData) => {
  try {
    const response = await api.put(`/apartments/${apartmentId}`, apartmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to update apartment' };
  }
};

export const deleteApartment = async (apartmentId) => {
  try {
    const response = await api.delete(`/apartments/${apartmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to delete apartment' };
  }
};

export default api; 