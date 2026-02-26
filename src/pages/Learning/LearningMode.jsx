import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './LearningMode.module.scss';
import { getLearningCourseBySlug } from '@/services/coursesService';
import { FaPlus } from 'react-icons/fa6';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // để hiển thị tiếng Việt
dayjs.locale('vi');

const cx = classNames.bind(styles);

export default function LearningMode({ sidebarOpen, onToggleNote, showNotePopup }) {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const data = await getLearningCourseBySlug(slug);
                setCourse(data);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu học tập:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [slug]);

    if (loading) return <div>Đang tải dữ liệu học tập...</div>;
    if (!course) return <div>Không tìm thấy khóa học hoặc bạn chưa đăng ký.</div>;

    // Lấy bài học đầu tiên để demo
    const currentLesson = course.lessons[0] || {};

    return (
        <>
            {/* Khu vực xem video */}
            <div className={cx('video', { expanded: !sidebarOpen })}>
                <iframe
                    width="100%"
                    height="100%"
                    src={currentLesson.video_url || ''}
                    title={currentLesson.title || 'Video bài học'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className={cx('content')}>
                <div className={cx('title-wrapper')}>
                    {/* Title */}
                    <div className={cx('title-inner')}>
                        <h1 className={cx('lesson-title')}>{currentLesson.title}</h1>
                        <p className={cx('lesson-desc')}>
                            Cập nhật {dayjs(currentLesson.updated_at).format('MMMM [năm] YYYY')}
                        </p>
                    </div>

                    {/* Note */}
                    {!showNotePopup && (
                        <button className={cx('note-btn')} onClick={onToggleNote}>
                            <FaPlus className={cx('note-icon')} />
                            Thêm ghi chú tại
                            <p className={cx('note-time')}>03:18</p>
                        </button>
                    )}
                </div>

                <p className={cx('lesson-desc')}>
                    {currentLesson.intro && currentLesson.intro.trim() !== ''
                        ? currentLesson.intro
                        : 'Nội dung đang được cập nhật'}
                </p>
            </div>
        </>
    );
}
