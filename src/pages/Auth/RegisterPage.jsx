import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import config from '@/config';
import styles from './AuthForm.module.scss';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const cx = classNames.bind(styles);

export default function RegisterPage() {
    const onFinish = (values) => {
        console.log('Register:', values);
    };

    return (
        <div className={cx('auth-wrapper', 'register-page')}>
            {/* Logo Pion linking to home page */}
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <figure>
                        <img src="/assets/img/logo.png" alt="Pion Logo" />
                    </figure>
                </Link>
            </div>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Đăng ký</h2>
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

                <div className={cx('options-actions')}>
                    <Link to={config.routes.forgotPassword}>Quên mật khẩu?</Link>
                    <Link to={config.routes.login} className={cx('login-text')}>
                        Đăng nhập
                    </Link>
                </div>

                {/* Hoặc đăng nhập với Google hoặc Facebook */}
                <div className={cx('footer-actions')}>
                    {/* Button đăng nhập với Google */}
                    <p className={cx('footer-text')}>Hoặc đăng nhập với</p>
                    <Button rounded large leftIcon={<FcGoogle />}>
                        Google
                    </Button>
                    <Button rounded large leftIcon={<FaFacebook color="#1877F2" />}>
                        Facebook
                    </Button>
                </div>
            </div>
        </div>
    );
}
