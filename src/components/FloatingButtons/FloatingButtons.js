// FloatingButtons.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './FloatingButtons.module.scss';

const cx = classNames.bind(styles);

export default function FloatingButtons({ zaloUrl, facebookPages, phoneNumber }) {
    const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
    const [isFacebookModalVisible, setIsFacebookModalVisible] = useState(false);

    return (
        <div className={cx('floating-buttons')}>
            {/* Zalo Button */}
            <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className={cx('btn', 'zalo')}>
                <img src="/assets/icons/zalo.png" alt="Zalo" className={cx('icon')} />
            </a>

            {/* Facebook Button */}
            <button onClick={() => setIsFacebookModalVisible(true)} className={cx('btn', 'facebook')}>
                <img src="/assets/icons/facebook.png" alt="Facebook" className={cx('icon')} />
            </button>

            {/* Facebook Modal */}
            <Modal
                title={<div className={cx('modal-title')}>Kết nối với chúng tôi trên Facebook</div>}
                open={isFacebookModalVisible}
                onCancel={() => setIsFacebookModalVisible(false)}
                footer={null}
                closeIcon={<CloseCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}
                className={cx('modal')}
            >
                <ul className={cx('modal-list')}>
                    {facebookPages.map(({ url, name }, index) => (
                        <li key={index}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className={cx('modal-link')}>
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
            </Modal>

            {/* Phone Button */}
            <button onClick={() => setIsPhoneModalVisible(true)} className={cx('btn', 'phone')}>
                <img src="/assets/icons/phone.png" alt="Phone" className={cx('icon')} />
            </button>

            {/* Phone Modal */}
            <Modal
                title={<div className={cx('modal-title')}>Gọi ngay để nhận tư vấn</div>}
                open={isPhoneModalVisible}
                onCancel={() => setIsPhoneModalVisible(false)}
                footer={null}
                closeIcon={<CloseCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}
                className={cx('modal')}
            >
                <p className={cx('modal-desc')}>
                    Hãy gọi ngay cho chúng tôi để nhận được những ưu đãi mới nhất và tư vấn của chuyên gia.
                </p>
                <div className={cx('phone-info')}>
                    <span>Hotline: </span>
                    <a href={`tel:${phoneNumber}`} className={cx('phone-link')}>
                        {phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
                    </a>
                </div>
            </Modal>
        </div>
    );
}

FloatingButtons.propTypes = {
    zaloUrl: PropTypes.string.isRequired,
    facebookPages: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    phoneNumber: PropTypes.string.isRequired,
};
