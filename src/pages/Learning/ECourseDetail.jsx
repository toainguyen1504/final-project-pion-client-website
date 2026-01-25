import classNames from 'classnames/bind';
import { Tag, Collapse } from 'antd';
import { useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import styles from './Learning.module.scss';
import { eCourseDetails } from '@/data/eCourses';
import Button from '@/components/Button'; // import Button custom

const cx = classNames.bind(styles);
const { Panel } = Collapse;

const ECourseDetail = () => {
    const { slug } = useParams(); // lấy slug từ route
    const course = eCourseDetails[slug]; // lấy đúng course theo slug

    if (!course) return <div>Khóa học không tồn tại</div>;

    return (
        <section className={cx('course-detail')}>
            <div className={cx('banner')}>
                <img src={course.thumbnail} alt={course.title} className={cx('thumbnail')} />
                <div className={cx('info')}>
                    <h1 className={cx('title')}>{course.title}</h1>
                    <p className={cx('description')}>{course.meta.description}</p>
                    <div className={cx('meta')}>
                        <Tag color="blue">{course.level}</Tag>
                        <Tag color="green">{course.meta.duration}</Tag>
                        <Tag color="purple">{course.meta.total_lessons} bài học</Tag>
                        <Tag color="volcano">{course.meta.participants?.toLocaleString()} người học</Tag>
                        {course.is_free ? (
                            <Tag color="success">Miễn phí</Tag>
                        ) : (
                            <div className={cx('price')}>
                                <span className={cx('discount')}>{course.meta.discount_price?.toLocaleString()}đ</span>
                                <span className={cx('original')}>{course.meta.price?.toLocaleString()}đ</span>
                            </div>
                        )}
                    </div>

                    <Button rounded large primary className={cx('enroll-btn')}>
                        Đăng ký học
                    </Button>
                </div>
            </div>

            <div className={cx('benefits')}>
                <h2>Bạn sẽ học được gì?</h2>
                <ul>
                    {course.benefits.map((item, index) => (
                        <li key={index}>
                            <FaCheck className={cx('check-icon')} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Dùng chapters dùng chung, còn việc render thì tùy, 
            tuy nhiên với language thì nên để là Topics, học theo topics */}
            <div className={cx('chapters')}>
                <h2>Nội dung khóa học</h2>
                <Collapse accordion>
                    {course.chapters.map((chapter, index) => (
                        <Panel header={`${index + 1}. ${chapter.title} (${chapter.lesson_count} bài học)`} key={index}>
                            <ul>
                                {chapter.lessons.map((lesson, i) => (
                                    <li key={i}>{lesson}</li>
                                ))}
                            </ul>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </section>
    );
};

export default ECourseDetail;
