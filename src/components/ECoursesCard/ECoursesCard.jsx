import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Skeleton } from 'antd';
import { FaUsers, FaClock } from 'react-icons/fa';
import { IoMdPlayCircle } from 'react-icons/io';
import classNames from 'classnames/bind';

import { formatDuration } from '@/utils/formatDuration';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/constants';
import styles from './ECoursesCard.module.scss';

const cx = classNames.bind(styles);

const ECoursesCard = ({
    title,
    price,
    discount_price,
    is_free,
    button,
    image,
    link,
    loading,
    participants,
    total_lessons,
    duration,
    onBuy,
    course,
}) => {
    return (
        <article className={cx('image-card')}>
            <Card
                className={cx('card-inner')}
                cover={
                    loading ? (
                        <Skeleton.Image />
                    ) : (
                        <Link to={link} className={cx('card-thumbnail')}>
                            <img alt={title} src={image || DEFAULT_PLACEHOLDER_IMAGE} loading="lazy" />
                        </Link>
                    )
                }
                loading={loading}
            >
                {loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                    <Card.Meta
                        title={null}
                        description={
                            <div className={cx('meta-wrapper')}>
                                <div className={cx('description-top')}>
                                    <Link to={link} className={cx('card-title')}>
                                        {title}
                                    </Link>

                                    {is_free ? (
                                        <p className={cx('course-price', 'free')}>Miễn phí</p>
                                    ) : (
                                        <p className={cx('course-price')}>
                                            {discount_price && discount_price > 0 ? (
                                                <>
                                                    <span className={cx('original-price')}>
                                                        {`${price.toLocaleString('vi-VN')}đ`}
                                                    </span>
                                                    <span className={cx('discount-price')}>
                                                        {`${discount_price.toLocaleString('vi-VN')}đ`}
                                                    </span>
                                                </>
                                            ) : price > 0 ? (
                                                <span className={cx('current-price')}>
                                                    {`${price.toLocaleString('vi-VN')}đ`}
                                                </span>
                                            ) : (
                                                <span className={cx('updating')}>Đang cập nhật...</span>
                                            )}
                                        </p>
                                    )}
                                </div>
                                {(participants !== null || total_lessons !== null || duration !== null) && (
                                    <ul className={cx('course-stats')}>
                                        {participants > 0 ? (
                                            <li>
                                                <FaUsers size={16} /> {Number(participants).toLocaleString('vi-VN')}
                                            </li>
                                        ) : (
                                            <li className={cx('new-course')}>
                                                <FaUsers size={16} /> Mới
                                            </li>
                                        )}

                                        {total_lessons !== null && (
                                            <li>
                                                <IoMdPlayCircle size={19} /> {total_lessons}
                                            </li>
                                        )}
                                        {duration !== null && (
                                            <li>
                                                <FaClock size={16} /> {formatDuration(duration, 'card')}
                                            </li>
                                        )}
                                    </ul>
                                )}

                                {!is_free && typeof onBuy === 'function' && (
                                    <div className={cx('card-actions')}>
                                        <button type="button" className={cx('buy-btn')} onClick={() => onBuy(course)}>
                                            Mua khóa học
                                        </button>
                                    </div>
                                )}
                            </div>
                        }
                    />
                )}
            </Card>
        </article>
    );
};

ECoursesCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    discount_price: PropTypes.number,
    is_free: PropTypes.bool, // thêm prop này
    button: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    participants: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total_lessons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBuy: PropTypes.func,
    course: PropTypes.object,
};

ECoursesCard.defaultProps = {
    price: 0,
    discount_price: 0,
    is_free: false, // mặc định false
    button: null,
    image: DEFAULT_PLACEHOLDER_IMAGE,
    loading: false,
    participants: null,
    total_lessons: null,
    duration: null,
    onBuy: null,
    course: null,
};

export default ECoursesCard;
