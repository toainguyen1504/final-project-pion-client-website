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
        <div className={cx('auth-wrapper')}>
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
                    <Form.Item label="Email / Số điện thoại" name="email" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Nhập email hoặc số điện thoại" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Gửi thông tin khôi phục mật khẩu
                    </Button>
                </Form>
                <div className={cx('footer')}>
                    <a href="/forgot">Quên mật khẩu?</a>
                    <span> | </span>
                    <a href="/register">Đăng ký ngay</a>
                </div>
            </div>
        </div>
    );
}
