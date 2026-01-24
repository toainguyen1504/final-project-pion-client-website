import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Skeleton } from 'antd';
import { FaUsers, FaVideo, FaClock } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './ECoursesCard.module.scss';

const cx = classNames.bind(styles);
const DEFAULT_IMAGE = '/assets/img/placeholder_img.png';

const ECoursesCard = ({
    title,
    price,
    discount_price,
    button,
    image,
    link,
    loading,
    participants,
    total_lessons,
    duration,
}) => {
    const isFree = price === 0 && discount_price === 0;

    return (
        <article className={cx('image-card')}>
            <Card
                className={cx('card-inner')}
                cover={loading ? <Skeleton.Image /> : <img alt={title} src={image || DEFAULT_IMAGE} loading="lazy" />}
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
                                    {isFree ? (
                                        <p className={cx('course-price', 'free')}>Miễn phí</p>
                                    ) : (
                                        <p className={cx('course-price')}>
                                            {price > 0 && (
                                                <span className={cx('original-price')}>
                                                    {`${price.toLocaleString('vi-VN')}đ`}
                                                </span>
                                            )}
                                            {discount_price > 0 && (
                                                <span className={cx('discount-price')}>
                                                    {`${discount_price.toLocaleString('vi-VN')}đ`}
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>
                                {(participants || total_lessons || duration) && (
                                    <ul className={cx('course-stats')}>
                                        {participants !== undefined && (
                                            <li>
                                                <FaUsers /> {Number(participants).toLocaleString('vi-VN')}
                                            </li>
                                        )}
                                        {total_lessons !== undefined && (
                                            <li>
                                                <FaVideo /> {total_lessons}
                                            </li>
                                        )}
                                        {duration && (
                                            <li>
                                                <FaClock /> {duration}
                                            </li>
                                        )}
                                    </ul>
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
    button: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    participants: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total_lessons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duration: PropTypes.string,
};

ECoursesCard.defaultProps = {
    price: 0,
    discount_price: 0,
    button: null,
    image: DEFAULT_IMAGE,
    loading: false,
    participants: null,
    total_lessons: null,
    duration: null,
};

export default ECoursesCard;
