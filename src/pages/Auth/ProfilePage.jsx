import { useEffect, useMemo, useState } from 'react';
import { MdOutlineVerified } from 'react-icons/md';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { Form, Input, Avatar, Checkbox, DatePicker, Select, Radio, Tag, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

import Button from '@/components/Button';
import config from '@/config';
import { getInitial } from '@/utils';
import { getCurrentUser, logout, isEmailVerified, updateProfile } from '@/services/authService';

import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

export default function ProfilePage() {
    const [user, setUser] = useState(getCurrentUser());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // đọc lại localStorage để cập nhật state -> re-render
        const syncUser = () => {
            setUser(getCurrentUser());
        };

        window.addEventListener('auth-user-updated', syncUser);
        window.addEventListener('focus', syncUser);

        return () => {
            window.removeEventListener('auth-user-updated', syncUser);
            window.removeEventListener('focus', syncUser);
        };
    }, []);

    const verified = useMemo(() => isEmailVerified(user), [user]);

    const onFinish = async (values) => {
        try {
            setLoading(true);

            const res = await updateProfile({
                display_name: values.name,
                email: values.email || null,
                phone: values.phone || null,
            });

            message.success(res?.message || 'Cập nhật hồ sơ thành công.');
            setUser(getCurrentUser());
        } catch (error) {
            message.error(error?.response?.data?.message || 'Không thể cập nhật hồ sơ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('auth-wrapper', 'profile-page')}>
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
                <div className={cx('avatar-wrapper')}>
                    <Avatar size={80} style={{ backgroundColor: 'var(--primary)', fontSize: '32px' }}>
                        {getInitial(user?.display_name || 'U')}
                    </Avatar>
                    <div className={cx('camera-button')}>
                        <CameraOutlined />
                    </div>
                </div>

                <Form
                    key={`${user?.email || ''}-${user?.email_verified_at || user?.status || ''}-${user?.phone || ''}`}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        name: user?.display_name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                    }}
                >
                    <Form.Item label="Họ tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                        <Input size="large" placeholder="Nhập họ tên" />
                    </Form.Item>

                    {/* EMAIL */}
                    <Form.Item label="Email" className={cx('verify-group')}>
                        <div className={cx('verify-wrapper')}>
                            <Form.Item name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]} noStyle>
                                <Input size="large" placeholder="Nhập email" style={{ paddingRight: '150px' }} />
                            </Form.Item>

                            {verified ? (
                                <span className={cx('verify-btn')} style={{ pointerEvents: 'none' }}>
                                    <Tag color="success">Đã xác thực</Tag>
                                </span>
                            ) : (
                                <Link to={config.routes.verifyEmail} className={cx('verify-btn')}>
                                    Xác minh
                                    <MdOutlineVerified />
                                </Link>
                            )}
                        </div>
                    </Form.Item>

                    {/* PHONE */}
                    <Form.Item label="Số điện thoại" className={cx('verify-group')}>
                        <div className={cx('verify-wrapper')}>
                            <Form.Item name="phone" noStyle>
                                <Input
                                    size="large"
                                    placeholder="Nhập số điện thoại"
                                    style={{ paddingRight: '120px' }}
                                />
                            </Form.Item>

                            <Link to={config.routes.verifyPhone} className={cx('verify-btn')}>
                                Xác minh
                                <MdOutlineVerified />
                            </Link>
                        </div>
                    </Form.Item>

                    <div className={cx('form-group', 'grid-2x2')}>
                        <Form.Item label="Quốc gia" name="country" className={cx('col-left')}>
                            <Select size="large" placeholder="Chọn quốc gia">
                                <Select.Option value="vn">Việt Nam</Select.Option>
                                <Select.Option value="us">Hoa Kỳ</Select.Option>
                                <Select.Option value="jp">Nhật Bản</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Tỉnh thành" name="province" className={cx('col-right')}>
                            <Select size="large" placeholder="Chọn tỉnh thành">
                                <Select.Option value="hcm">TP. Hồ Chí Minh</Select.Option>
                                <Select.Option value="hn">Hà Nội</Select.Option>
                                <Select.Option value="dn">Đà Nẵng</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Ngày sinh" name="dob" className={cx('col-left')}>
                            <DatePicker
                                size="large"
                                format="DD/MM/YYYY"
                                placeholder="dd/mm/yyyy"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item label="Giới tính" name="gender" className={cx('col-right')}>
                            <Radio.Group>
                                <Radio value="male">Nam</Radio>
                                <Radio value="female">Nữ</Radio>
                                <Radio value="other">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className={cx('options-actions')}>
                        <Form.Item name="skip" valuePropName="checked">
                            <Checkbox>Bỏ qua, tôi sẽ cập nhật sau</Checkbox>
                        </Form.Item>
                    </div>

                    <div className={cx('button-spacing')}>
                        <Button outline to={config.routes.home} className={cx('btn-back')}>
                            Quay lại
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
