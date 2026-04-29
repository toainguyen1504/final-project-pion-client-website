import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '@/components/Button';
import styles from './PaymentMomoResult.module.scss';

const cx = classNames.bind(styles);

function PaymentMomoResult() {
    const { state } = useLocation();

    const orderNumber = state?.orderNumber;
    const course = state?.course;
    const status = state?.status;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('card')}>
                <h1 className={cx('title')}>
                    {status === 'paid' ? 'Thanh toán thành công' : 'Thanh toán chưa hoàn tất'}
                </h1>

                {orderNumber && (
                    <p className={cx('text')}>
                        Mã đơn hàng: <strong>{orderNumber}</strong>
                    </p>
                )}

                {course?.title && (
                    <p className={cx('text')}>
                        Khóa học: <strong>{course.title}</strong>
                    </p>
                )}

                <div className={cx('actions')}>
                    <Button primary to="/learning">
                        Về trang học tập
                    </Button>

                    {course?.slug && <Button to={`/e-courses/${course.slug}`}>Xem lại khóa học</Button>}
                </div>
            </div>
        </div>
    );
}

export default PaymentMomoResult;
