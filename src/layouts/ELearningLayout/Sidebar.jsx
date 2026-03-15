import { MdCheckCircle } from 'react-icons/md';
import { IoMdPlayCircle } from 'react-icons/io';
import { SiGoogledocs } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLearningCourseBySlug } from '@/services/coursesService';

const cx = classNames.bind(styles);

export default function Sidebar({ isOpen }) {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCourse() {
            try {
                const data = await getLearningCourseBySlug(slug);
                setCourse(data);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu sidebar:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [slug]);

    if (loading) return <aside className={cx('sidebar', { closed: !isOpen })}>Đang tải...</aside>;
    if (!course) return <aside className={cx('sidebar', { closed: !isOpen })}>Khóa học không tồn tại</aside>;

    return (
        <aside className={cx('sidebar', { closed: !isOpen })}>
            <div className={cx('sidebar-inner')}>
                <h2 className={cx('sidebar-title')}>Nội dung khóa học</h2>

                <ul className={cx('lesson-list')}>
                    {course.lessons.map((lesson) => (
                        <li
                            key={lesson.id}
                            className={cx('lesson-wrapper')}
                            onClick={() => navigate(`/learning/${course.slug}?id=${lesson.id}`)}
                        >
                            <div className={cx('lesson-info')}>
                                <h3 className={cx('lesson-title')}>
                                    {lesson.order}. {lesson.title}
                                </h3>
                                <div className={cx('lesson-desc')}>
                                    <div className={cx('lesson-type')}>
                                        {lesson.is_quiz ? <SiGoogledocs /> : <IoMdPlayCircle />}
                                    </div>
                                    <span className={cx('lesson-time')}>
                                        {lesson.duration ? `${lesson.duration} phút` : '---time---'}
                                    </span>
                                </div>
                            </div>
                            <span className={cx('play-icon')}>
                                <MdCheckCircle />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
