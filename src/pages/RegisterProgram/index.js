import { Form, Input, Button, message, Row, Col, Modal, Card } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames/bind';

import { BASE_URL } from '@/constants';
import styles from './RegisterProgram.module.scss';

const cx = classNames.bind(styles);

const speakers = [
    {
        name: <>JINMING&nbsp;-&nbsp;金铭</>,
        degree: 'TH.S',
        title: 'CEO PION ACADEMY',
        desc: <>Cựu DHS trường ĐHSP Hoa&nbsp;Trung</>,
        img: '/assets/img/register_program/speaker1.png',
    },
    {
        name: <>LIU&nbsp;WENJUAN - 刘文娟</>,
        degree: 'PGS.',
        title: 'GIẢNG VIÊN TIẾNG TRUNG',
        desc: <>Trường ĐH Bách Khoa Vũ&nbsp;Hán</>,
        img: '/assets/img/register_program/speaker2.png',
    },
];

const gifts = [
    {
        icon: '/assets/img/register_program/gift_icon.png',
        desc: <>Ebook 200 câu giao tiếp đời sống hằng&nbsp;ngày</>,
    },
    {
        icon: '/assets/img/register_program/gift_icon.png',
        desc: <>Miễn phí chương trình học thử (3&nbsp;buổi)</>,
    },
    {
        icon: '/assets/img/register_program/gift_icon.png',
        desc: <>Bộ tài liệu luyện thi HSK1&nbsp;-&nbsp;HSK3</>,
    },
    {
        icon: '/assets/img/register_program/gift_icon.png',
        desc: <>Và các phần quà hấp dẫn khác khi tham&nbsp;gia</>,
    },
];

function RegisterProgram() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // normalize phone number
            let phone = values.phone.replace(/\D/g, '');
            if (phone.length === 9) {
                phone = '0' + phone;
            }
            values.phone = phone;

            // Fetch
            const res = await fetch(`${BASE_URL}/form`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error('Gửi dữ liệu thất bại');
            const data = await res.json();
            message.success('Đăng ký thành công! Cảm ơn bạn đã tham gia.');

            form.resetFields();
            setSubmittedData(values);
            // setModalVisible(true);

            // Redirect to Zalo Group, need to sync with tag a link allow
            const zaloGroupLink = 'https://zalo.me/g/sggvkb728';

            const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = zaloGroupLink;
            } else {
                window.open(zaloGroupLink, '_blank');
            }
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

            <div className={cx('register-body')}>
                <div className={cx('register-layout')}>
                    {/* Info program */}
                    <aside className={cx('program-info')}>
                        <section className={cx('program-header')}>
                            <h1 className={cx('program-title')}>"BÍ KÍP" học Tiếng Trung cho người mới bắt đầu</h1>
                            <p className={cx('program-time')}>🕒 19:30 – 21:30, ngày 25/10/2025</p>
                        </section>

                        {/* Diễn giả */}
                        <div className={cx('speaker-section')}>
                            <h2 className={cx('speaker-heading')}>🎤 Diễn Giả Webinar</h2>
                            <Row gutter={[24, 24]} justify="center">
                                {speakers.map((sp, idx) => (
                                    <Col xs={24} sm={12} md={12} key={idx}>
                                        <Card className={cx('speaker-card')} variant="borderless">
                                            <div className={cx('speaker-img-wrapper')}>
                                                <div className={cx('speaker-img')}>
                                                    <img src={sp.img} alt={sp.name} />
                                                </div>
                                                <span className={cx('speaker-degree')}>{sp.degree}</span>
                                            </div>
                                            <h3 className={cx('speaker-name')}>{sp.name}</h3>
                                            <p className={cx('speaker-title')}>{sp.title}</p>
                                            <p className={cx('speaker-desc')}>{sp.desc}</p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <section className={cx('program-gifts')}>
                            <h2 className={cx('gift-title')}>Quà tặng khi tham dự chương trình</h2>
                            <Row gutter={[24, 24]} justify="center">
                                {gifts.map((gift, idx) => (
                                    <Col xs={12} sm={12} md={6} key={idx}>
                                        <Card className={cx('gift-card')} variant="borderless">
                                            <div className={cx('gift-icon')}>
                                                <img src={gift.icon} alt="Gift Icon" />
                                            </div>
                                            <p className={cx('gift-desc')}>{gift.desc}</p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </section>
                    </aside>

                    {/* Form */}
                    <div className={cx('form-wrapper')}>
                        <h2>Đăng ký tham gia</h2>

                        {/* notify */}
                        {submittedData && (
                            <div style={{ marginBottom: 24, textAlign: 'center' }}>
                                <p style={{ marginBottom: 4, textAlign: 'center' }}>Cảm ơn bạn đã đăng ký!</p>

                                <div>
                                    <Button className={cx('link')} type="link" onClick={() => setModalVisible(true)}>
                                        Xem thông tin đã gửi
                                    </Button>
                                </div>

                                <div>
                                    <a
                                        className={cx('join-link')}
                                        href="https://zalo.me/g/sggvkb728"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        🎁 Tham gia ngay cộng đồng Pion
                                    </a>
                                </div>
                            </div>
                        )}
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className={cx('register-form')}
                            noValidate
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={15}>
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
                                            placeholder="VD: Nguyễn Văn A"
                                            maxLength={60}
                                            autoFocus
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={9}>
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

                                                    if (value < 1925) return Promise.reject('Không nhỏ hơn 1925');
                                                    if (value > currentYear)
                                                        return Promise.reject(`Không vượt quá ${currentYear}`);

                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            className={cx('input')}
                                            placeholder="VD: 2000"
                                            type="number"
                                            inputMode="numeric"
                                            onBlur={(e) => {
                                                const currentYear = new Date().getFullYear() - 15;
                                                let value = parseInt(e.target.value, 10);

                                                if (isNaN(value)) return;
                                                if (value < 1925) value = 1925;
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
                                    { type: 'email', message: 'Email không hợp lệ. VD: nguyenvana@gmail.com' },
                                ]}
                            >
                                <Input
                                    type="email"
                                    inputMode="email"
                                    className={cx('input')}
                                    placeholder="VD: nguyenvana@gmail.com"
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
                                        placeholder="VD: 961234567"
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
                                Vui lòng điền đầy đủ thông tin và tham gia Group Zalo cộng đồng để Pion có thể gửi tặng
                                bạn những phần quà hấp dẫn.
                            </p>
                        </Form>
                    </div>
                    {/* End form */}
                </div>
            </div>

            {/* Modal show information */}

            <div className={cx('modal-wrapper')}>
                <Modal
                    title={<span style={{ fontSize: 24, fontWeight: 600 }}>Thông tin bạn đã đăng ký</span>}
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    closable={false}
                    footer={[
                        <Button key="close" onClick={() => setModalVisible(false)} className={cx('close-btn')}>
                            Đóng
                        </Button>,
                    ]}
                    getContainer={false}
                >
                    {submittedData && (
                        <div>
                            <p style={{ marginBottom: 8, marginTop: 16 }}>
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
        </div>
    );
}

export default RegisterProgram;
