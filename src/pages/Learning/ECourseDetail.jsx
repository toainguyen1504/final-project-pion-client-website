import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Tag, Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { IoMdPlayCircle } from 'react-icons/io';
import { Helmet } from 'react-helmet-async';

import { getCourseBySlug, enrollCourse } from '@/services/coursesService';
import Button from '@/components/Button';
import { formatDuration } from '@/utils/formatDuration';
import Breadcrumb from '@/components/Breadcrumb';
import CourseDetailSkeleton from './CourseDetailSkeleton';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

const ECourseDetail = () => {
    const { slug } = useParams(); // lấy slug từ route
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCourse() {
            const data = await getCourseBySlug(slug);
            setCourse(data);
            setLoading(false);
        }
        fetchCourse();
    }, [slug]);

    async function handleEnroll() {
        try {
            const updatedCourse = await enrollCourse(course.id, course.slug, navigate);
            setCourse(updatedCourse);
        } catch (err) {
            // Nếu lỗi 422 (đã đăng ký rồi) thì không alert, chỉ điều hướng
            if (err.response?.status === 422) {
                navigate(`/learning/${course.slug}`);
            } else {
                // Các lỗi khác (ví dụ chưa login, server lỗi) mới alert
                alert('Có lỗi khi đăng ký: ' + (err.response?.data?.message || err.message));
            }
        }
    }

    if (loading) return <CourseDetailSkeleton />;
    if (!course) {
        return (
            <section className={cx('course-detail')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title="Khóa học" parentPath="/learning" parentLabel="E-Learning" />
                </div>

                <div className={cx('empty-wrapper')} style={{ marginTop: 50, marginBottom: 50 }}>
                    <Empty description="Khóa học không tồn tại hoặc đã bị xóa" />
                </div>
            </section>
        );
    }

    return (
        <section className={cx('course-detail')}>
            <Helmet>
                <title>{`E-Learning - ${course?.title ?? 'Đang cập nhật'}`} | PION</title>
                <meta name="description" content={course?.description || 'Thông tin khóa học tại PION'} />
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
                <img
                    src={course.thumbnail || '/assets/img/placeholder_img.png'}
                    alt={course.title}
                    className={cx('thumbnail')}
                />
                <div className={cx('info')}>
                    <h1 className={cx('title')}>{course.title}</h1>
                    <p className={cx('description')}>{course.description}</p>
                    <div className={cx('meta')}>
                        <Tag color="volcano">Level {course.level}</Tag>
                        {course.participants > 0 ? (
                            <Tag color="volcano">{course.participants.toLocaleString()} học viên đã tham gia</Tag>
                        ) : (
                            <Tag color="default">Khóa học mới mở</Tag>
                        )}

                        {course.is_free ? (
                            <span className={cx('free')}>Miễn phí</span>
                        ) : (
                            <div className={cx('price')}>
                                {course.discount_price > 0 && (
                                    <span className={cx('discount')}>{course.discount_price?.toLocaleString()}đ</span>
                                )}
                                {course.price > 0 && (
                                    <span className={cx('original')}>{course.price?.toLocaleString()}đ</span>
                                )}
                            </div>
                        )}
                    </div>

                    {course.enrolled ? (
                        <Button
                            rounded
                            large
                            primary
                            leftIcon
                            className={cx('enroll-btn')}
                            onClick={() => navigate(`/learning/${course.slug}`)}
                        >
                            Vào học ngay
                        </Button>
                    ) : (
                        <Button rounded large primary leftIcon className={cx('enroll-btn')} onClick={handleEnroll}>
                            Đăng ký học
                        </Button>
                    )}
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

            <div className={cx('lesson-list-wrapper')}>
                <h2>Nội dung khóa học</h2>

                <div className={cx('meta')}>
                    <p className={cx('item')}>
                        <span>{course.total_lessons}</span> bài học
                    </p>
                    <p className={cx('item')}>
                        <span>{formatDuration(course.duration, 'detail')}</span>
                    </p>
                </div>

                {/* danh sách bài học */}
                <div className={cx('lesson-list-inner')}>
                    <ul className={cx('lesson-list')}>
                        {course.lessons && course.lessons.length > 0 ? (
                            course.lessons.map((lesson, index) => (
                                <li key={lesson.id || index}>
                                    <span className={cx('play-icon')}>
                                        <IoMdPlayCircle />
                                    </span>
                                    <span className={cx('lesson-title')}>
                                        {index + 1}. {lesson.title}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className={cx('empty-lesson')}>Hiện tại chưa có bài học nào được công khai.</li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ECourseDetail;
