// 1. api đăng nhập, đăng kí
// 2. api quên mật khẩu
// 3. api xác minh email và số diện thoại

import axiosInstance from '@/utils/axiosInstance';

// Đăng nhập - ok, tuy nhiên cần check role -> hoặc backend api chia 2 link api khác nhau, ví dụ: /api/cms/login và /api/client/login
// admin cms có: super_admin, admin, staff, staffads |||| client có: member | guest | learner
// PHẢI Chặn ngay login -> super_admin, admin, staff, staffads không được vào trang ui của client,
// tương tự member | guest | learner cũng không được vào admin cms
export async function login({ login, password }) {
    const response = await axiosInstance.post('/api/client/login', { login, password });
    const { token, user } = response.data;

    // Lưu thông tin vào localStorage
    localStorage.setItem('authTokenCLient', token);
    localStorage.setItem('userClient', JSON.stringify(user));

    return { token, user };
}

// Đăng ký - chưa check
export async function register({ username, email, password }) {
    const response = await axiosInstance.post('/api/register', {
        username,
        email,
        password,
    });
    return response.data;
}

// Đăng xuất
export function logout() {
    localStorage.removeItem('authTokenCLient');
    localStorage.removeItem('userClient');
}

// Lấy user hiện tại từ localStorage
export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('userClient'));
    } catch {
        return null;
    }
}

// Lấy token hiện tại
export function getToken() {
    return localStorage.getItem('authTokenCLient');
}

// Kiểm tra đã đăng nhập chưa
export function isAuthenticated() {
    return !!getToken();
}
