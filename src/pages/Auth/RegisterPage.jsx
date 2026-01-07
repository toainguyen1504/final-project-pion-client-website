import { Form, Input, Checkbox } from 'antd';
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
                <h2 className={cx('title')}>Đăng ký</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email / Số điện thoại" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Nhập email hoặc số điện thoại" />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    {/* Nút đăng ký*/}
                    <Button primary full>
                        Đăng ký
                    </Button>
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
