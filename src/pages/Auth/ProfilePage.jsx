import { Form, Input, Avatar } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import config from '@/config';
import { getInitial } from '@/utils';
import { FAKE_USER } from '@/constants';

import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function ProfilePage() {
    const onFinish = (values) => {
        console.log('Profile:', values);
    };

    return (
        <div className={cx('auth-wrapper', 'profile-page')}>
            {/* Logo Pion linking to home page + Navigation (Profile + Forgot Password + Logout) */}
            <nav className={cx('nav')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={config.routes.home}>
                        <figure>
                            <img src="/assets/img/logo.png" alt="Pion Logo" />
                        </figure>
                    </Link>
                </div>

                {/* Navigation */}
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

                    {/* logout: đăng xuất + navigation đến trang đăng nhập */}
                    <Link className={cx('logout')}>Đăng xuất</Link>
                </div>
            </nav>

            <div className={cx('auth-box')}>
                {/* Avatar */}
                <div className={cx('avatar-wrapper')}>
                    {FAKE_USER.avatarUrl ? (
                        <Avatar src={FAKE_USER.avatarUrl} size={80} />
                    ) : (
                        <Avatar size={80} style={{ backgroundColor: 'var(--primary)', fontSize: '32px' }}>
                            {getInitial(FAKE_USER.name)}
                        </Avatar>
                    )}
                    <div className={cx('camera-button')}>
                        <CameraOutlined />
                    </div>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Họ tên" name="name" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập họ tên" />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <div className={cx('password-group')}>
                        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                            <Input.Password size="large" placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item label="Nhập lại mật khẩu" name="confirmPassword" rules={[{ required: true }]}>
                            <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                    </div>

                    {/* Nút đăng ký*/}
                    <Button primary full>
                        Đăng ký
                    </Button>
                </Form>
            </div>
        </div>
    );
}
