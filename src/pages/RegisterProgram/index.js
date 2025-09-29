import { Form, Input, Button, message, Row, Col, Modal } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import classNames from 'classnames/bind';
import styles from './RegisterProgram.module.scss';

const cx = classNames.bind(styles);

function RegisterProgram() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // normalize phone number
            let phone = values.phone.replace(/\D/g, ''); // loại bỏ ký tự không phải số
            if (phone.length === 9) {
                phone = '0' + phone;
            }
            values.phone = phone;

            // Fetch
            const res = await fetch('http://localhost:8000/api/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error('Gửi dữ liệu thất bại');
            const data = await res.json();
            message.success('Đăng ký thành công! Cảm ơn bạn đã tham gia.');

            form.resetFields();
            setSubmittedData(values);
            setModalVisible(true);

            // Redirect to Zalo Group
            // const zaloGroupLink = 'https://zalo.me/g/'; // Demo link
            // window.open(zaloGroupLink, '_blank');
        } catch (err) {
            message.error('Đăng ký thất bại. Vui lòng kiểm tra mạng và thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('register')}>
            <Helmet>
                <title>Đăng ký tham gia | PION</title>
                <meta name="description" content="Form đăng ký tham gia chương trình cùng PION." />
            </Helmet>

            <h2>Đăng ký tham gia</h2>

            {/* notify */}
            {submittedData && (
                <p style={{ marginBottom: 16, textAlign: 'center' }}>
                    Cảm ơn bạn đã đăng ký!
                    <Button className={cx('link')} type="link" onClick={() => setModalVisible(true)}>
                        Nhấn vào đây để xem thông tin đã gửi
                    </Button>
                </p>
            )}

            <div className={cx('register-body')}>
                {/* Form */}
                <Form form={form} layout="vertical" onFinish={onFinish} className={cx('register-form')} noValidate>
                    <Row gutter={16}>
                        <Col xs={24} sm={16}>
                            {/* Name */}
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập họ và tên' },
                                    {
                                        pattern: /^[A-Za-zÀ-ỹ\s]+$/u,
                                        message: 'Tên chỉ được chứa chữ cái và khoảng trắng',
                                    },
                                ]}
                            >
                                <Input
                                    className={cx('input')}
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    maxLength={60}
                                    autoFocus
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            {/* Birth year */}
                            <Form.Item
                                name="birth_year"
                                label="Năm sinh"
                                rules={[
                                    { required: true, message: 'Oops! Thiếu năm sinh' },
                                    () => ({
                                        validator(_, value) {
                                            const currentYear = new Date().getFullYear() - 15;

                                            if (!value) return Promise.resolve();

                                            if (value < 1900) return Promise.reject('Không nhỏ hơn 1900');
                                            if (value > currentYear)
                                                return Promise.reject(`Không vượt quá ${currentYear}`);

                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    className={cx('input')}
                                    placeholder="Ví dụ: 2000"
                                    type="number"
                                    inputMode="numeric"
                                    onBlur={(e) => {
                                        const currentYear = new Date().getFullYear() - 15;
                                        let value = parseInt(e.target.value, 10);

                                        if (isNaN(value)) return;
                                        if (value < 1900) value = 1900;
                                        if (value > currentYear) value = currentYear;

                                        form.setFieldsValue({ birth_year: value });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Email */}
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ. Ví dụ: nguyenvana@gmail.com' },
                        ]}
                    >
                        <Input
                            type="email"
                            inputMode="email"
                            className={cx('input')}
                            placeholder="Ví dụ: nguyenvana@gmail.com"
                        />
                    </Form.Item>

                    {/* Phone */}
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        inputMode="numeric"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại.' },
                            () => ({
                                validator(_, value) {
                                    if (!value) return Promise.resolve();

                                    const digitsOnly = value.replace(/\D/g, '');
                                    if (digitsOnly.length === 9) {
                                        // 9 số, ok
                                        return Promise.resolve();
                                    } else if (digitsOnly.length === 10) {
                                        if (digitsOnly[0] !== '0') {
                                            return Promise.reject('Số điện thoại 10 số phải bắt đầu bằng 0');
                                        }
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('Số điện thoại chỉ gồm 9–10 chữ số');
                                    }
                                },
                            }),
                        ]}
                    >
                        <div className={cx('phone-wrapper')}>
                            <span className={cx('phone-prefix')}>+84</span>
                            <Input
                                className={cx('input', 'phone-input')}
                                maxLength={10}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                }}
                                placeholder="Ví dụ: 961234567"
                            />
                        </div>
                    </Form.Item>

                    {/* Question */}
                    <Form.Item name="question" label="Câu hỏi cho Diễn giả">
                        <Input.TextArea
                            className={cx('input')}
                            rows={3}
                            placeholder="Nhắn bất kì câu hỏi nào mà bạn quan tâm"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className={cx('register-btn')}
                        loading={loading}
                        disabled={loading}
                    >
                        Đăng ký miễn phí
                    </Button>

                    <p className={cx('note')}>
                        Note: Vui lòng điền đầy đủ thông tin và tham gia Group cộng đồng để Pion có thể gửi những phần
                        quà tới cho bạn ạ.
                    </p>
                </Form>
            </div>
            {/* End form */}

            {/* Modal show information */}
            <Modal
                title="Thông tin bạn đã đăng ký"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {submittedData && (
                    <div>
                        <p style={{ marginBottom: 8 }}>
                            <strong>Họ và tên:</strong> {submittedData.name}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                            <strong>Năm sinh:</strong> {submittedData.birth_year}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                            <strong>Email:</strong> {submittedData.email}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                            <strong>Số điện thoại:</strong> {submittedData.phone}
                        </p>
                        {submittedData.question && (
                            <p style={{ marginBottom: 8 }}>
                                <strong>Câu hỏi:</strong> {submittedData.question}
                            </p>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default RegisterProgram;
