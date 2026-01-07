import { Form, Input, Checkbox } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import config from '@/config';
import styles from './AuthForm.module.scss';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const cx = classNames.bind(styles);

export default function LoginPage() {
    const onFinish = (values) => {
        console.log('Login:', values);
    };

    return (
        <div className={cx('auth-wrapper', 'login-page')}>
            {/* Logo Pion linking to home page */}
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <figure>
                        <img src="/assets/img/logo.png" alt="Pion Logo" />
                    </figure>
                </Link>
            </div>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Đăng nhập</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email / Số điện thoại" name="email" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập email hoặc số điện thoại" />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                        <Input.Password size="large" placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <div className={cx('options-actions')}>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>

                        <Link to={config.routes.forgotPassword}>Quên mật khẩu?</Link>
                    </div>

                    {/* Nút đăng nhập*/}
                    <Button primary full>
                        Đăng nhập
                    </Button>

                    <p className={cx('register-text')}>
                        Bạn chưa có tài khoản?
                        <Link to={config.routes.register}>Đăng ký ngay</Link>
                    </p>
                </Form>

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
