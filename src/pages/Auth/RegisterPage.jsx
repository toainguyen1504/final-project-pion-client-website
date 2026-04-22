import { useState } from 'react';
import { Form, Input, message } from 'antd';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Button from '@/components/Button';
import config from '@/config';
import { register } from '@/services/authService';

import styles from './AuthForm.module.scss';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const cx = classNames.bind(styles);

export default function RegisterPage() {
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (submitting) return;

        try {
            setSubmitting(true);

            const res = await register({
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            });

            message.success(res?.message || 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.');
            navigate(config.routes.verifyEmail);
        } catch (err) {
            const status = err.response?.status;
            const apiMessage = err.response?.data?.message;

            if (status === 422) {
                message.error(apiMessage || 'Dữ liệu không hợp lệ hoặc email đã tồn tại.');
            } else {
                message.error(apiMessage || 'Có lỗi xảy ra. Vui lòng thử lại sau!');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={cx('auth-wrapper', 'register-page')}>
            <Helmet>
                <title>Đăng ký | PION</title>
            </Helmet>

            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <figure>
                        <img src="/assets/img/logo.png" alt="Pion Logo" />
                    </figure>
                </Link>
            </div>

            <div className={cx('auth-box')}>
                <h2 className={cx('title')}>Đăng ký</h2>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Họ tên"
                        name="name"
                        rules={[
                            { required: true, message: 'Vui lòng nhập họ tên' },
                            { min: 2, message: 'Họ tên quá ngắn' },
                        ]}
                    >
                        <Input size="large" placeholder="Nhập họ tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input size="large" placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone">
                        <Input size="large" placeholder="Nhập số điện thoại (chưa bắt buộc)" />
                    </Form.Item>

                    <div className={cx('password-group')}>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
                            ]}
                        >
                            <Input.Password size="large" placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng nhập lại mật khẩu' },
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
                            <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                    </div>

                    <Button primary full htmlType="submit" disabled={submitting}>
                        {submitting ? 'Đang đăng ký...' : 'Đăng ký'}
                    </Button>
                </Form>

                <div className={cx('options-actions')}>
                    <Link to={config.routes.forgotPassword}>Quên mật khẩu?</Link>
                    <Link to={config.routes.login} className={cx('login-text')}>
                        Đăng nhập
                    </Link>
                </div>

                <div className={cx('footer-actions')}>
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
