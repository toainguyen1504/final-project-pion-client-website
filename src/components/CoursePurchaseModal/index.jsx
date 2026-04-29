import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '@/components/Button';
import { createMomoPayment } from '@/services/paymentService';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/constants';
import styles from './CoursePurchaseModal.module.scss';

const cx = classNames.bind(styles);

function CoursePurchaseModal({ open, onClose, course }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    if (!course) return null;

    const originalPrice = Number(course.price || 0);
    const finalPrice =
        course.discount_price && Number(course.discount_price) > 0 ? Number(course.discount_price) : originalPrice;

    const handleContinuePayment = async () => {
        try {
            setSubmitting(true);

            const res = await createMomoPayment(course.id);
            const payment = res?.data;

            if (!payment?.order_number) {
                throw new Error('Không nhận được thông tin thanh toán.');
            }

            onClose?.();

            navigate('/payment/momo/qr', {
                state: {
                    orderNumber: payment.order_number,
                    amount: payment.amount,
                    qrCodeUrl: payment.qr_code_url,
                    payUrl: payment.pay_url,
                    isMock: payment.is_mock,
                    course,
                },
            });
        } catch (error) {
            message.error(error?.response?.data?.message || error.message || 'Không thể tạo thanh toán.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={980}
            destroyOnClose
            className={cx('purchase-modal')}
        >
            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <div className={cx('course-header')}>
                        <img
                            src={course.image || DEFAULT_PLACEHOLDER_IMAGE}
                            alt={course.title}
                            className={cx('thumb')}
                        />

                        <div className={cx('course-info')}>
                            <h2 className={cx('title')}>{course.title}</h2>
                        </div>
                    </div>

                    {!!course.description && <p className={cx('desc')}>{course.description}</p>}

                    {Array.isArray(course.benefits) && course.benefits.length > 0 && (
                        <div className={cx('benefits')}>
                            <h3>Bạn nhận được gì từ khóa học này?</h3>
                            <ul>
                                {course.benefits.map((item, index) => (
                                    <li key={`${course.id}-benefit-${index}`}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={cx('right')}>
                    <h3 className={cx('payment-title')}>Chi tiết thanh toán</h3>
                    <div className={cx('divider')} />

                    <div className={cx('summary-row')}>
                        <span className={cx('highlight')}>Khóa học {course.title}</span>
                    </div>

                    <div className={cx('summary-row')}>
                        <span>Giá gốc</span>
                        <span className={cx('original')}>{originalPrice.toLocaleString('vi-VN')}đ</span>
                    </div>

                    <div className={cx('summary-row')}>
                        <span>Giá ưu đãi hôm nay</span>
                        <span>{finalPrice.toLocaleString('vi-VN')}đ</span>
                    </div>

                    <div className={cx('divider')} />

                    <div className={cx('total-row')}>
                        <span className={cx('highlight')}>Tổng tiền thanh toán</span>
                        <strong>{finalPrice.toLocaleString('vi-VN')}đ</strong>
                    </div>

                    <Button primary full onClick={handleContinuePayment} disabled={submitting}>
                        {submitting ? 'Đang tạo thanh toán...' : 'Tiếp tục thanh toán'}
                    </Button>

                    <p className={cx('note')}>
                        Bằng việc thanh toán, bạn đồng ý với điều khoản và quy định của chúng tôi.
                    </p>
                </div>
            </div>
        </Modal>
    );
}

CoursePurchaseModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    course: PropTypes.object,
};

CoursePurchaseModal.defaultProps = {
    open: false,
    onClose: null,
    course: null,
};

export default CoursePurchaseModal;
