import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import config from '@/config';
import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function ForgotPasswordPage() {
    const onFinish = (values) => {
        console.log('Forgot Password:', values);
    };

    return (
        <div className={cx('auth-wrapper', 'forgot-password-page')}>
            {/* Logo Pion linking to home page */}
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <figure>
                        <img src="/assets/img/logo.png" alt="Pion Logo" />
                    </figure>
                </Link>
            </div>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Quên mật khẩu</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email / Username" name="email" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập email hoặc username" />
                    </Form.Item>

                    {/* Nút Gửi thông tin*/}
                    <Button primary full>
                        Gửi thông tin
                    </Button>
                </Form>
                <div className={cx('options-actions')}>
                    <Link to={config.routes.login} className={cx('login-text')}>
                        Đăng nhập
                    </Link>
                    <p className={cx('register-text')}>
                        Bạn chưa có tài khoản?
                        <Link to={config.routes.register}>Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
