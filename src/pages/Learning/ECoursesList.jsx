import classNames from 'classnames/bind';
import ECoursesCard from '@/components/ECoursesCard';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

const ECoursesList = ({ courses, loading, onBuy }) => {
    return (
        <section className={cx('courses')}>
            <div className={cx('courses-inner')}>
                {loading ? (
                    [...Array(6)].map((_, i) => <ECoursesCard key={i} loading title="Loading..." link="#" />)
                ) : courses.length === 0 ? (
                    <p className={cx('empty-text')}>Hiện chưa có khóa học nào.</p>
                ) : (
                    courses.map((course, i) => (
                        <div
                            className={cx('course-animate')}
                            style={{ animationDelay: `${i * 0.16}s` }}
                            key={course.id || course.link}
                        >
                            <ECoursesCard
                                course={course}
                                title={course.title}
                                price={course.price}
                                discount_price={course.discount_price}
                                is_free={course.is_free}
                                image={course.image}
                                link={course.link}
                                participants={course.participants}
                                total_lessons={course.total_lessons}
                                duration={course.duration}
                                onBuy={onBuy}
                            />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ECoursesList;
