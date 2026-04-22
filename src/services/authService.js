// 1. api đăng nhập, đăng kí
// 2. api quên mật khẩu
// 3. api xác minh email và số diện thoại
import axiosInstance from '@/utils/axiosInstance';

const TOKEN_KEY = 'authTokenClient';
const USER_KEY = 'userClient';

// Đăng nhập
export async function login({ login, password }) {
    const response = await axiosInstance.post('/api/client/login', { login, password });
    const { token, user } = response.data;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token, user };
}

// Đăng ký
export async function register({ name, email, password, confirmPassword }) {
    const response = await axiosInstance.post('/api/client/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
    });

    const { token, user } = response.data;

    // auto login ngay sau đăng ký
    if (token && user) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return response.data;
}

// Đăng xuất
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

// Lấy user hiện tại từ localStorage
export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
}

// Lấy token hiện tại
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Kiểm tra đã đăng nhập chưa
export function isAuthenticated() {
    return !!getToken();
}
