import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { Form, Input, message } from 'antd';

import Button from '@/components/Button';
import config from '@/config';
import { changePassword, logout } from '@/services/authService';
import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function ChangePasswordPage() {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);

            const res = await changePassword({
                current_password: values.current_password,
                password: values.password,
                password_confirmation: values.password_confirmation,
            });

            message.success(res?.message || 'Đổi mật khẩu thành công.');
        } catch (error) {
            message.error(error?.response?.data?.message || 'Không thể đổi mật khẩu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('auth-wrapper', 'profile-page', 'change-password-page')}>
            <nav className={cx('nav')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home}>
                        <figure>
                            <img src="/assets/img/logo.png" alt="Pion Logo" />
                        </figure>
                    </Link>
                </div>

                <div className={cx('nav-actions')}>
                    <NavLink
                        to={config.routes.profile}
                        className={({ isActive }) => cx('profile', { active: isActive })}
                    >
                        Hồ sơ
                    </NavLink>

                    <NavLink
                        to={config.routes.changePassword}
                        className={({ isActive }) => cx('change-password', { active: isActive })}
                    >
                        Đổi mật khẩu
                    </NavLink>

                    <Link
                        className={cx('logout')}
                        onClick={() => {
                            logout();
                            window.location.href = config.routes.login;
                        }}
                    >
                        Đăng xuất
                    </Link>
                </div>
            </nav>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Đổi mật khẩu</h2>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="current_password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
                    >
                        <Input.Password size="large" placeholder="Mật khẩu cũ" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                            { min: 8, message: 'Mật khẩu mới phải có ít nhất 8 ký tự' },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name="password_confirmation"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu nhập lại không khớp'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>

                    <div className={cx('button-spacing')}>
                        <Button outline to={config.routes.profile} className={cx('btn-back')}>
                            Hồ sơ
                        </Button>

                        <Button primary htmlType="submit" disabled={loading}>
                            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
