import { useEffect, useState } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '@/services/authService';
import config from '@/config';

// chỉ check có đăng nhập hay chưa
export default function useAuth() {
    const [user, setUser] = useState(null);
    const isAuth = isAuthenticated();

    useEffect(() => {
        if (isAuth) {
            setUser(getCurrentUser());
        } else {
            setUser(null);
        }
    }, [isAuth]);

    const handleLogout = () => {
        logout();
        window.location.href = config.routes.login;
    };

    return {
        isAuth,
        user,
        logout: handleLogout,
    };
}
