import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSearchParams, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './ELearningLayout.module.scss';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import LearningMode from '@/pages/Learning/LearningMode';
import Button from '@/components/Button'; // import Button custom
import { getLearningCourseBySlug } from '@/services/coursesService';

const cx = classNames.bind(styles);

export default function ELearningLayout() {
    const { slug } = useParams(); // slug của khóa học từ URL
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // để lấy query param (ví dụ: ?id=123)
    const currentLessonId = searchParams.get('id'); // id của bài học hiện tại (nếu có)

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showNotePopup, setShowNotePopup] = useState(false);

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch course data để truyền xuống các component con (Header, Sidebar, LearningMode)
    useEffect(() => {
        async function fetchCourse() {
            try {
                const data = await getLearningCourseBySlug(slug);
                setCourse(data);

                // nếu URL chưa có id -> redirect sang lesson đầu tiên
                // OPTIMIZE: Cần hàm xử lý để redirect đến lesson tiếp theo nếu đã hoàn thành bài học hiện tại, thay vì luôn redirect về bài đầu tiên
                // Tức nếu mới đăng kí và chưa có bài học nào hoàn thành thì redirect về bài đầu tiên, nhưng nếu đã hoàn thành bài 1 thì lần sau vào sẽ redirect đến bài 2 thay vì bài 1
                if (!currentLessonId && data?.lessons?.length > 0) {
                    navigate(`/learning/${slug}?id=${data.lessons[0].id}`, { replace: true });
                }
            } finally {
                setLoading(false);
            }
        }

        fetchCourse();
    }, [slug]);

    // Sidebar toggle handler
    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Note popup handler
    const handleToggleNote = () => setShowNotePopup((prev) => !prev);

    // Tìm bài học hiện tại dựa trên currentLessonId
    const currentLesson = course?.lessons.find((lesson) => lesson.id.toString() === currentLessonId);

    if (loading) return <div>Đang tải khóa học...</div>;
    if (!course) return <div>Không tìm thấy khóa học</div>;

    return (
        <div className={cx('wrapper')}>
            <Header course={course} />
            <main className={cx('main')}>
                <div className={cx('content')}>
                    <div className={cx('video-area', { expanded: !sidebarOpen })}>
                        {/* video and content */}
                        <LearningMode
                            course={course}
                            currentLesson={currentLesson}
                            sidebarOpen={sidebarOpen}
                            onToggleNote={handleToggleNote}
                            showNotePopup={showNotePopup}
                        />
                    </div>
                    <Sidebar course={course} isOpen={sidebarOpen} />
                </div>
            </main>
            <Footer
                course={course}
                currentLesson={currentLesson}
                onToggleSidebar={handleToggleSidebar}
                isOpen={sidebarOpen}
            />

            {showNotePopup && (
                <div className={cx('note-popup', 'animate')}>
                    <div className={cx('note-header')}>
                        <h3 className={cx('note-title')}>Thêm ghi chú tại</h3>
                        <span className={cx('note-time')}>03:18</span>
                    </div>

                    {/* Sau này chuyển sang Editor nếu cần thiết */}
                    <textarea className={cx('note-input')} placeholder="Nội dung ghi chú..."></textarea>

                    <div className={cx('note-actions')}>
                        <Button rounded small className={cx('cancel-btn')} onClick={handleToggleNote}>
                            HỦY BỎ
                        </Button>
                        <Button rounded small primary className={cx('save-btn')}>
                            TẠO GHI ChÚ
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
