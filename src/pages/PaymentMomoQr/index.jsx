import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import classNames from 'classnames/bind';
import { message } from 'antd';

import Button from '@/components/Button';
import { getOrderStatus, mockPaymentSuccess } from '@/services/paymentService';
import styles from './PaymentMomoQr.module.scss';

const cx = classNames.bind(styles);

function PaymentMomoQr() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(state?.status || 'pending');
    const [countdown, setCountdown] = useState(15 * 60);

    const orderNumber = state?.orderNumber;
    const amount = state?.amount;
    const qrCodeUrl = state?.qrCodeUrl;
    const course = state?.course;

    useEffect(() => {
        if (!orderNumber) {
            navigate('/learning');
        }
    }, [orderNumber, navigate]);

    useEffect(() => {
        if (!orderNumber) return;

        const interval = setInterval(async () => {
            try {
                const res = await getOrderStatus(orderNumber);
                const nextStatus = res?.data?.status;
                setStatus(nextStatus);

                if (nextStatus === 'paid') {
                    clearInterval(interval);
                    message.success('Thanh toán thành công.');
                    navigate('/payment/momo/result', {
                        state: {
                            orderNumber,
                            course,
                            status: 'paid',
                        },
                    });
                }
            } catch (error) {
                // im lặng để polling tiếp
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [orderNumber, navigate, course]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeText = useMemo(() => {
        const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
        const ss = String(countdown % 60).padStart(2, '0');
        return `${mm}:${ss}`;
    }, [countdown]);

    const handleMockSuccess = async () => {
        try {
            setLoading(true);
            await mockPaymentSuccess(orderNumber);
            message.success('Đã ghi nhận thanh toán.');
        } catch (error) {
            message.error(error?.response?.data?.message || 'Không thể cập nhật thanh toán.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <p className={cx('countdown')}>
                    Đơn hàng tự động hủy sau: <strong>{timeText}</strong>
                </p>

                <h1 className={cx('title')}>Quét mã QR để thanh toán</h1>
                <p className={cx('subtitle')}>
                    Với bản demo HYBRID, bạn có thể bấm <strong>Tôi đã thanh toán</strong> sau khi xem mã QR.
                </p>

                <div className={cx('qr-box')}>
                    {qrCodeUrl ? <QRCode value={qrCodeUrl} size={260} /> : <p>Không có QR để hiển thị.</p>}
                </div>

                <div className={cx('info')}>
                    <p>
                        Mã đơn hàng: <strong>{orderNumber}</strong>
                    </p>
                    <p>
                        Số tiền: <strong>{Number(amount || 0).toLocaleString('vi-VN')}đ</strong>
                    </p>
                    <p>
                        Trạng thái: <strong>{status}</strong>
                    </p>
                </div>

                <div className={cx('actions')}>
                    <Button primary onClick={handleMockSuccess} disabled={loading || status === 'paid'}>
                        {loading ? 'Đang xử lý...' : status === 'paid' ? 'Đã thanh toán' : 'Tôi đã thanh toán'}
                    </Button>

                    <Button to="/learning">Quay lại danh sách khóa học</Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentMomoQr;
