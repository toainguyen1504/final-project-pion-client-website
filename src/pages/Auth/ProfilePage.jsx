import { Form, Input, Avatar, Checkbox, DatePicker, Select, Radio } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { MdOutlineVerified } from 'react-icons/md';
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

                    <Form.Item label="Email" name="email" rules={[{ required: true }]} className={cx('verify-group')}>
                        <div className={cx('verify-wrapper')}>
                            <Input size="large" placeholder="Nhập email" style={{ paddingRight: '120px' }} />

                            {/* to link : xac-minh-email */}
                            <Link className={cx('verify-btn')}>
                                Xác minh
                                <MdOutlineVerified />
                            </Link>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true }]}
                        className={cx('verify-group')}
                    >
                        <div className={cx('verify-wrapper')}>
                            <Input size="large" placeholder="Nhập số điện thoại" style={{ paddingRight: '120px' }} />

                            {/* to link : xac-minh-so-dien-thoai */}
                            <Link className={cx('verify-btn')}>
                                Xác minh
                                <MdOutlineVerified />
                            </Link>
                        </div>
                    </Form.Item>

                    <div className={cx('form-group', 'grid-2x2')}>
                        {/* Cột trái */}
                        <Form.Item
                            label="Quốc gia"
                            name="country"
                            rules={[{ required: true }]}
                            className={cx('col-left')}
                        >
                            <Select size="large" placeholder="Chọn quốc gia">
                                <Select.Option value="vn">Việt Nam</Select.Option>
                                <Select.Option value="us">Hoa Kỳ</Select.Option>
                                <Select.Option value="jp">Nhật Bản</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Cột phải */}
                        <Form.Item
                            label="Tỉnh thành"
                            name="province"
                            rules={[{ required: true }]}
                            className={cx('col-right')}
                        >
                            <Select size="large" placeholder="Chọn tỉnh thành">
                                <Select.Option value="hcm">TP. Hồ Chí Minh</Select.Option>
                                <Select.Option value="hn">Hà Nội</Select.Option>
                                <Select.Option value="dn">Đà Nẵng</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Cột trái */}
                        <Form.Item label="Ngày sinh" name="dob" rules={[{ required: true }]} className={cx('col-left')}>
                            <DatePicker
                                size="large"
                                format="DD/MM/YYYY"
                                placeholder="dd/mm/yyyy"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        {/* Cột phải */}
                        <Form.Item
                            label="Giới tính"
                            name="gender"
                            rules={[{ required: true }]}
                            className={cx('col-right')}
                        >
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

                    {/* Nút Cập nhật và Truy cập*/}
                    <div className={cx('button-spacing')}>
                        {/* submit */}
                        <Button primary>Cập nhật </Button>

                        {/* Sau này đổi thành /learning */}
                        <Button primary to={config.routes.home}>
                            Truy cập
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
