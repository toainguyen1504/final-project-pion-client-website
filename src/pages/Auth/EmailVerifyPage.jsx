import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import config from '@/config';
import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function EmailVerifyPage() {
    const onFinish = (values) => {
        console.log('Email Verify:', values);
    };

    return (
        <div className={cx('auth-wrapper', 'verify-page')}>
            {/* Logo Pion linking to home page */}
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <figure>
                        <img src="/assets/img/logo.png" alt="Pion Logo" />
                    </figure>
                </Link>
            </div>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Xác thực email</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập email" />
                    </Form.Item>

                    {/* Nút Gửi thông tin*/}
                    <Button primary full>
                        Gửi thông tin
                    </Button>
                </Form>
                <div className={cx('options-actions')}>
                    <Link to={config.routes.profile} className={cx('login-text')}>
                        Hồ sơ cá nhân
                    </Link>
                    <p className={cx('register-text')}>
                        <Link to={config.routes.register}>Đăng ký</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
