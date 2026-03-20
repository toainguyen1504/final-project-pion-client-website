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
import NoteModal from './NoteModal';
import { getLearningCourseBySlug } from '@/services/coursesService';
import { getLessonProgress } from '@/services/myLearningServices';
import { createNote } from '@/services/noteService';
import { formatDuration } from '@/utils/formatDuration';

const cx = classNames.bind(styles);

// ** Tiếp theo nên làm **
// 1. Resume video (watched_duration)
// 2. Auto save progress khi xem video
// 3. Continue learning (header button)

export default function ELearningLayout() {
    const { slug } = useParams(); // slug của khóa học từ URL
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // để lấy query param (ví dụ: ?id=123)
    const currentLessonId = searchParams.get('id'); // id của bài học hiện tại (nếu có)

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [progressMap, setProgressMap] = useState({});

    const [showNotePopup, setShowNotePopup] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [noteTime, setNoteTime] = useState(0); // NOTE lesson
    const [noteContent, setNoteContent] = useState('');

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

    // Navigate lesson theo note
    useEffect(() => {
        const handler = (e) => {
            const { lessonId, time } = e.detail;

            navigate(`/learning/${slug}?id=${lessonId}`);

            setTimeout(() => {
                window.dispatchEvent(
                    new CustomEvent('seek-to-time', {
                        detail: { time },
                    }),
                );
            }, 800);
        };

        window.addEventListener('navigate-to-note', handler);
        return () => window.removeEventListener('navigate-to-note', handler);
    }, [slug]);

    // fetch tiến độ học tập
    const fetchProgress = async () => {
        if (!course?.lessons) return;

        try {
            const map = {};

            await Promise.all(
                course.lessons.map(async (lesson) => {
                    try {
                        const res = await getLessonProgress(lesson.id);
                        if (res) {
                            map[lesson.id] = res;
                        }
                    } catch (err) {
                        console.error('Progress error:', err);
                    }
                }),
            );

            setProgressMap(map);
        } catch (err) {
            console.error('Fetch progress failed:', err);
        }
    };

    // auto fetch tiến độ học tập
    useEffect(() => {
        fetchProgress();
    }, [course]);

    // Update tiến độ học tập
    useEffect(() => {
        const handler = (event) => {
            const { lessonId, progress } = event.detail;

            // update trực tiếp vào map (KHÔNG cần call lại API)
            setProgressMap((prev) => ({
                ...prev,
                [lessonId]: progress,
            }));
        };

        window.addEventListener('progress-updated', handler);

        return () => window.removeEventListener('progress-updated', handler);
    }, []);

    // reset content khi đóng popup
    useEffect(() => {
        if (!showNotePopup) {
            setNoteContent('');
        }
    }, [showNotePopup]);

    // Sidebar toggle handler
    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Note popup handler
    const handleToggleNote = (time = 0) => {
        setNoteTime(time);
        setShowNotePopup((prev) => !prev);
    };

    // Handle save note
    const handleSaveNote = async () => {
        if (!noteContent.trim()) return;

        try {
            await createNote({
                lesson_id: currentLesson.id,
                content: noteContent,
                timestamp: noteTime,
            });

            window.dispatchEvent(new Event('note-created')); //clear cache
            setNoteContent('');
            setShowNotePopup(false);
        } catch (err) {
            console.error(err);
        }
    };

    const currentLesson = course?.lessons.find((lesson) => lesson.id.toString() === currentLessonId); // Tìm bài học hiện tại dựa trên currentLessonId
    const lessons = [...(course?.lessons ?? [])].sort((a, b) => a.order - b.order); // sắp xếp bài học theo thứ tự (order) để tìm bài trước/sau chính xác
    const currentIndex = lessons.findIndex((lesson) => lesson.id.toString() === currentLessonId); // tìm index của bài học hiện tại trong mảng đã sắp xếp

    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    return (
        <div className={cx('wrapper')}>
            <Header
                course={course}
                loading={loading}
                progressMap={progressMap}
                onOpenNoteModal={() => setShowNoteModal(true)}
            />
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
                            loading={loading}
                        />
                    </div>
                    <Sidebar
                        lessons={lessons}
                        currentLessonId={currentLessonId}
                        courseSlug={course?.slug}
                        isOpen={sidebarOpen}
                        loading={loading}
                        progressMap={progressMap}
                    />
                </div>
            </main>
            <Footer
                courseSlug={course?.slug}
                currentLesson={currentLesson}
                prevLesson={prevLesson}
                nextLesson={nextLesson}
                onToggleSidebar={handleToggleSidebar}
                isOpen={sidebarOpen}
            />

            {showNotePopup && (
                <div className={cx('note-popup', 'animate')}>
                    <div className={cx('note-header')}>
                        <h3 className={cx('note-title')}>Thêm ghi chú tại</h3>
                        <span className={cx('note-time')}> {formatDuration(noteTime, 'lesson')}</span>
                    </div>

                    {/* Sau này chuyển sang Editor nếu cần thiết */}
                    <textarea
                        className={cx('note-input')}
                        placeholder="Nội dung ghi chú..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />

                    <div className={cx('note-actions')}>
                        <Button rounded small className={cx('cancel-btn')} onClick={() => setShowNotePopup(false)}>
                            HỦY BỎ
                        </Button>
                        <Button
                            rounded
                            small
                            primary
                            className={cx('save-btn')}
                            onClick={handleSaveNote}
                            disabled={!noteContent.trim()}
                        >
                            TẠO GHI ChÚ
                        </Button>
                    </div>
                </div>
            )}

            <NoteModal
                open={showNoteModal}
                onClose={() => setShowNoteModal(false)}
                lessonId={currentLesson?.id}
                courseId={course?.id}
            />
        </div>
    );
}
