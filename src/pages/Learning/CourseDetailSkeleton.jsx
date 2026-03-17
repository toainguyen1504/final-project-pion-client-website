import { Skeleton } from 'antd';
import classNames from 'classnames/bind';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

const CourseDetailSkeleton = () => {
    return (
        <section className={cx('course-detail')}>
            <div className={cx('banner')}>
                <Skeleton.Image style={{ width: 320, height: 180 }} active />

                <div className={cx('info')}>
                    <Skeleton active title={{ width: '70%' }} paragraph={{ rows: 2 }} />

                    <Skeleton.Button active size="large" style={{ width: 200, marginTop: 16 }} />
                </div>
            </div>

            <div className={cx('benefits')}>
                <Skeleton active title={{ width: 220 }} paragraph={{ rows: 4 }} />
            </div>

            <div className={cx('lesson-list-wrapper')}>
                <Skeleton active title={{ width: 260 }} />
            </div>
        </section>
    );
};

export default CourseDetailSkeleton;
