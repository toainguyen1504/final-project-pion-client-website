import classNames from 'classnames/bind';
import { FaAngleLeft, FaAngleRight, FaArrowRight } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button'; // import Button custom
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Footer({ courseSlug, currentLesson, prevLesson, nextLesson, onToggleSidebar, isOpen }) {
    const navigate = useNavigate();

    // Hàm điều hướng đến bài học tiếp theo hoặc trước đó
    const goToLesson = (lesson) => {
        if (!lesson) return;

        navigate(`/learning/${courseSlug}?id=${lesson.id}`);
    };

    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-inner')}>
                <div className={cx('buttons')}>
                    <Button
                        rounded
                        small
                        primary
                        leftIcon={<FaAngleLeft />}
                        className={cx('nav-btn')}
                        disabled={!prevLesson}
                        onClick={() => goToLesson(prevLesson)}
                    >
                        Bài trước
                    </Button>

                    <Button
                        rounded
                        small
                        primary
                        rightIcon={<FaAngleRight />}
                        className={cx('nav-btn')}
                        disabled={!nextLesson}
                        onClick={() => goToLesson(nextLesson)}
                    >
                        Bài tiếp theo
                    </Button>
                </div>

                {/* Hiển thị tên lesson và nút toggle */}
                <div className={cx('lesson-info')}>
                    {/* optimize: Cần hàm xử lý text ở đây, nếu quá dài thì sẽ bị cắt + Tooltip */}
                    <span className={cx('lesson-name')}>
                        {currentLesson ? `${currentLesson.order}. ${currentLesson.title}` : 'Chưa chọn bài học'}
                    </span>

                    {/* Toggle button */}
                    <button className={cx('toggle-btn')} onClick={onToggleSidebar}>
                        {isOpen ? <FaArrowRight /> : <HiMenu />}
                    </button>
                </div>
            </div>
        </footer>
    );
}
