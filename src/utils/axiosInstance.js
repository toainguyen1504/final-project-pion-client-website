import axios from 'axios';

const BASE_API_URL =
    process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_PROD_URL;

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gắn token tự động cho mỗi request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authTokenClient');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
