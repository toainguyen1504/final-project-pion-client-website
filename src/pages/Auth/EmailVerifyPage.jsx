import { useEffect, useMemo, useState } from 'react';
import { Alert, message } from 'antd';
import classNames from 'classnames/bind';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button';
import config from '@/config';
import { getCurrentUser, resendVerifyEmail, updateCurrentUser, isEmailVerified } from '@/services/authService';
import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function EmailVerifyPage() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(getCurrentUser());

    const verified = useMemo(() => isEmailVerified(user), [user]);

    useEffect(() => {
        if (searchParams.get('success') === '1') {
            message.success('Xác thực email thành công!');

            const currentUser = getCurrentUser();
            if (currentUser) {
                const updatedUser = {
                    ...currentUser,
                    email_verified_at: new Date().toISOString(),
                    status: 1,
                };

                updateCurrentUser(updatedUser);
                setUser(updatedUser);
            }
        }
    }, [searchParams]);

    const handleResend = async () => {
        try {
            setLoading(true);
            const res = await resendVerifyEmail();
            message.success(res?.message || 'Đã gửi lại email xác thực.');
        } catch (error) {
            message.error(error?.response?.data?.message || 'Không thể gửi lại email xác thực.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('auth-wrapper', 'verify-page')}>
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <figure>
                        <img src="/assets/img/logo.png" alt="Pion Logo" />
                    </figure>
                </Link>
            </div>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Xác thực email</h2>

                {verified ? (
                    <Alert
                        type="success"
                        showIcon
                        message="Email của bạn đã được xác thực."
                        style={{ marginBottom: 16 }}
                    />
                ) : (
                    <Alert
                        type="info"
                        showIcon
                        message="Vui lòng kiểm tra hộp thư email và bấm vào liên kết xác thực."
                        description="Nếu chưa nhận được email, bạn có thể gửi lại."
                        style={{ marginBottom: 16 }}
                    />
                )}

                <div style={{ marginBottom: 20 }}>
                    <strong>Email hiện tại:</strong>
                    <div style={{ marginTop: 6 }}>{user?.email || 'Chưa có email'}</div>
                </div>

                {!verified && (
                    <Button primary full onClick={handleResend} disabled={loading}>
                        {loading ? 'Đang gửi...' : 'Gửi lại email xác thực'}
                    </Button>
                )}

                <div className={cx('options-actions')} style={{ marginTop: 20 }}>
                    <Link to={config.routes.profile} className={cx('login-text')}>
                        Hồ sơ cá nhân
                    </Link>
                    <p className={cx('register-text')}>
                        <Link to={config.routes.home}>Về trang chủ</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
