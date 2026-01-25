import classNames from 'classnames/bind';
import { Tag, Collapse } from 'antd';
import { useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { IoMdPlayCircle } from 'react-icons/io';
import { Helmet } from 'react-helmet-async';

import styles from './Learning.module.scss';
import { eCourseDetails } from '@/data/eCourses';
import Button from '@/components/Button'; // import Button custom
import Breadcrumb from '@/components/Breadcrumb';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

const ECourseDetail = () => {
    const { slug } = useParams(); // lấy slug từ route
    const course = eCourseDetails[slug]; // lấy đúng course theo slug

    if (!course) return <div>Khóa học không tồn tại</div>;

    return (
        <section className={cx('course-detail')}>
            <Helmet>
                <title>{`E-Learning - ${course?.title ?? 'Đang cập nhật'}`} | PION</title>
                <meta name="description" content={course?.descDetail || 'Thông tin khóa học tại PION'} />
            </Helmet>

            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb
                    title={`Khóa Học - ${course?.title ?? 'Đang cập nhật...'}`}
                    parentPath="/learning"
                    parentLabel="E-Learning"
                />
            </div>

            {/* Thông tin khóa học */}
            <div className={cx('banner')}>
                <img src={course.thumbnail} alt={course.title} className={cx('thumbnail')} />
                <div className={cx('info')}>
                    <h1 className={cx('title')}>{course.title}</h1>
                    <p className={cx('description')}>{course.meta.description}</p>
                    <div className={cx('meta')}>
                        <Tag color="volcano">{course.level}</Tag>
                        <Tag color="volcano">{course.meta.participants?.toLocaleString()} học viên đã tham gia</Tag>
                        {course.is_free ? (
                            <span className={cx('free')}>Miễn phí</span>
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
                            <span className={cx('text')}>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Dùng chapters dùng chung, còn việc render thì tùy, 
            tuy nhiên với language thì nên để là Topics, học theo topics */}
            <div className={cx('chapters')}>
                <h2>Nội dung khóa học</h2>

                <div className={cx('meta')}>
                    <p className={cx('item')}>
                        <span>{course.chapters.length}</span> chương
                    </p>
                    <p className={cx('item')}>
                        <span>{course.meta.total_lessons}</span> bài học
                    </p>
                    <p className={cx('item')}>
                        Thời lượng <span>{course.meta.duration}</span>
                    </p>
                </div>

                <Collapse accordion>
                    {(() => {
                        let lessonIndex = 1; // khởi tạo biến đếm toàn cục

                        return course.chapters.map((chapter, index) => (
                            <Panel header={`${index + 1}. ${chapter.title}`} key={index}>
                                <ul className={cx('lesson-list')}>
                                    {chapter.lessons.map((lesson, i) => {
                                        const currentIndex = lessonIndex++;
                                        return (
                                            <li key={currentIndex}>
                                                <span className={cx('play-icon')}>
                                                    <IoMdPlayCircle />
                                                </span>
                                                <span className={cx('lesson-title')}>
                                                    {currentIndex}. {lesson}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Panel>
                        ));
                    })()}
                </Collapse>
            </div>
        </section>
    );
};

export default ECourseDetail;
