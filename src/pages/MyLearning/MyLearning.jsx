import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import useMyLearning from '@/hooks/useMyLearning';
import MyLearningCard from '@/components/MyLearningCard';
import Breadcrumb from '@/components/Breadcrumb';
import { Empty } from 'antd';
import Button from '@/components/Button';
import config from '@/config';
import styles from './MyLearning.module.scss';

const cx = classNames.bind(styles);

function MyLearning() {
    const { courses, loading } = useMyLearning();

    return (
        <>
            <Helmet>
                <title>E-learning | PION</title>
                <meta
                    name="description"
                    content="Tại Pion, chúng tôi tin rằng giáo dục là chìa khóa để mở ra cánh cửa tương lai."
                />
            </Helmet>
            <div className={cx('wrapper')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title="Khóa học của tôi" />
                </div>

                <h1 className={cx('title')}>Khóa học của tôi</h1>

                <div className={cx('course-wrapper')}>
                    <div className={cx('courses')}>
                        <div className={cx('courses-inner')}>
                            {loading ? (
                                [...Array(8)].map((_, i) => (
                                    <div
                                        className={cx('course-animate')}
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                        key={i}
                                    >
                                        <MyLearningCard loading />
                                    </div>
                                ))
                            ) : courses.length > 0 ? (
                                courses.map((course, i) => (
                                    <div
                                        className={cx('course-animate')}
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                        key={course?.course_id || i}
                                    >
                                        <MyLearningCard course={course} />
                                    </div>
                                ))
                            ) : (
                                <div className={cx('empty-wrapper')}>
                                    <Empty
                                        image="/assets/no-note-yet.svg"
                                        imageStyle={{ height: 160 }}
                                        description={
                                            <div className={cx('empty-content')}>
                                                <h3>Bạn chưa có khóa học nào đang học</h3>
                                                <p>Hãy khám phá các khóa học phù hợp và bắt đầu học ngay hôm nay.</p>
                                            </div>
                                        }
                                    >
                                        <Button primary to={config.routes.learning}>
                                            Khám phá khóa học
                                        </Button>
                                    </Empty>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyLearning;
