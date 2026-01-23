import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Skeleton } from 'antd';
import { FaUsers, FaVideo, FaClock } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './ECoursesCard.module.scss';

const cx = classNames.bind(styles);
const DEFAULT_IMAGE = '/assets/img/placeholder_img.png';

const ECoursesCard = ({ title, price, button, image, link, loading, stats }) => {
    const isFree = price === 0;

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
                    <>
                        <Card.Meta
                            title={
                                <Link to={link} className={cx('card-title')}>
                                    {title}
                                </Link>
                            }
                            description={
                                <>
                                    <p className={cx('course-price', { free: isFree })}>
                                        {isFree ? 'Miễn phí' : `${price.toLocaleString()}đ`}
                                    </p>
                                    {stats && (
                                        <ul className={cx('course-stats')}>
                                            <li>
                                                <FaUsers /> {Number(stats.participants).toLocaleString()}
                                            </li>
                                            <li>
                                                <FaVideo /> {stats.lessons}
                                            </li>
                                            <li>
                                                <FaClock /> {stats.duration}
                                            </li>
                                        </ul>
                                    )}
                                </>
                            }
                        />
                    </>
                )}
            </Card>
        </article>
    );
};

ECoursesCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    button: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    stats: PropTypes.shape({
        participants: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        lessons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        duration: PropTypes.string,
    }),
};

ECoursesCard.defaultProps = {
    price: 0,
    button: null,
    image: DEFAULT_IMAGE,
    loading: false,
    stats: null,
};

export default ECoursesCard;
