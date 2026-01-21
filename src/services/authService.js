// 1. api đăng nhập, đăng kí
// 2. api quên mật khẩu
// 3. api xác minh email và số diện thoại

import axiosInstance from '@/utils/axiosInstance';

// Đăng nhập
export async function login({ login, password }) {
    const response = await axiosInstance.post('/login', { login, password });
    const { token, user } = response.data;

    // Lưu thông tin vào localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
}

// Đăng ký
export async function register({ username, email, password }) {
    const response = await axiosInstance.post('/register', {
        username,
        email,
        password,
    });
    return response.data;
}

// Đăng xuất
export function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
}

// Lấy user hiện tại từ localStorage
export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
}

// 🔹 Lấy token hiện tại
export function getToken() {
    return localStorage.getItem('authToken');
}

// 🔹 Kiểm tra đã đăng nhập chưa
export function isAuthenticated() {
    return !!getToken();
}
