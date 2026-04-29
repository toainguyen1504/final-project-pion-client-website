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

// Đăng ký - chưa có phone (cũng chưa cần thiết cho hàm đăng ký)
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

// Gửi lại email xác thực
export async function resendVerifyEmail() {
    const response = await axiosInstance.post('/api/client/email/resend');
    return response.data;
}

// Đăng xuất
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new CustomEvent('auth-user-updated', { detail: null }));
}

// Lấy user hiện tại từ localStorage
export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
}

// Cập nhật localStorage user sau khi verify thành công ở FE
export function updateCurrentUser(nextUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    window.dispatchEvent(new CustomEvent('auth-user-updated', { detail: nextUser }));
}

// Lấy token hiện tại
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Kiểm tra đã đăng nhập chưa
export function isAuthenticated() {
    return !!getToken();
}

// Check email verified từ local user
export function isEmailVerified(user) {
    if (!user) return false;
    return !!user.email_verified_at || Number(user.status) === 1;
}

// Update profile - basic
export async function updateProfile({ display_name, email, phone }) {
    const response = await axiosInstance.put('/api/client/profile', {
        display_name,
        email,
        phone,
    });

    const { user } = response.data;

    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('auth-user-updated', { detail: user }));
    }

    return response.data;
}

// Đổi mật khẩu
export async function changePassword({ current_password, password, password_confirmation }) {
    const response = await axiosInstance.put('/api/client/change-password', {
        current_password,
        password,
        password_confirmation,
    });

    return response.data;
}
