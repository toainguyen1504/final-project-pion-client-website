import { Card, Progress, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { DEFAULT_PLACEHOLDER_IMAGE } from '@/constants';
import styles from './MyLearningCard.module.scss';

dayjs.extend(relativeTime);

const cx = classNames.bind(styles);

function MyLearningCard({ course, loading }) {
    // console.log('course detail: ', course);
    return (
        <div className={cx('card')}>
            <Card
                hoverable
                className={cx('card-inner')}
                cover={
                    loading ? (
                        <Skeleton.Image />
                    ) : (
                        <Link to={course.slug ? `/learning/${course.slug}` : '#'}>
                            <img
                                src={course.thumbnail || DEFAULT_PLACEHOLDER_IMAGE}
                                alt={course.title}
                                loading="lazy"
                            />
                        </Link>
                    )
                }
                loading={loading}
            >
                {loading ? (
                    <Skeleton active paragraph={{ rows: 2 }} />
                ) : (
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>{course.title}</h3>

                        <p className={cx('learning-meta')}>
                            {course.last_watched_at
                                ? `Học cách đây ${dayjs(course.last_watched_at).fromNow()}`
                                : 'Bạn chưa học khóa này'}
                        </p>

                        <Progress percent={course.progress} size="small" strokeColor="#ff4d4f" showInfo={false} />
                    </div>
                )}
            </Card>
        </div>
    );
}

export default MyLearningCard;
