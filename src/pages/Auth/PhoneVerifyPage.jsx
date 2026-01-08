import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import config from '@/config';
import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function PhoneVerifyPage() {
    const onFinish = (values) => {
        console.log('Phone Verify:', values);
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
                <h2 className={cx('title')}>Xác thực số điện thoại</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Ví dụ: 0987654321" />
                    </Form.Item>

                    <Form.Item label="Mã kích hoạt" name="verificationCode" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Ví dụ: 123456" />
                    </Form.Item>

                    {/* Nút Gửi mã và Kích hoạt*/}
                    <div className={cx('button-spacing')}>
                        {/* submit */}
                        <Button primary>Gửi mã</Button>

                        {/* Sau này đổi thành /learning */}
                        <Button primary to={config.routes.home}>
                            Kích hoạt
                        </Button>
                    </div>
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
