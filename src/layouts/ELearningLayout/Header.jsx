import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';
import { TbHelpHexagonFilled } from 'react-icons/tb';
import { FaAngleLeft } from 'react-icons/fa6';
import { Tooltip, Progress, Skeleton } from 'antd';

import config from '@/config';
import Button from '@/components/Button'; // import Button custom
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

// colors for conic gradient progress circle
const conicColors = {
    '0%': '#87d068',
    '50%': '#ffccc7',
    '100%': 'var(--primary-highlight)',
};

export default function Header({ course, loading, progressMap, onOpenNoteModal }) {
    const total = course?.lessons?.length || 0;

    const completed = Object.values(progressMap || {}).filter((p) => p.is_completed).length;

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Nếu đang loading dữ liệu, hiển thị skeleton
    if (loading) {
        return (
            <header className={cx('header')}>
                <Skeleton.Input active size="small" style={{ width: 200 }} />
            </header>
        );
    }

    if (!course) return null;

    // Todo: optimize
    // percent completed lessons - hiện đang hardcode, cần hàm xử lý logic để tính toán dựa trên course.completed_lessons và course.total_lessons
    // const completedLessons = course.completed_lessons || 0;
    // const percent = Math.round((completedLessons / course.total_lessons) * 100);

    return (
        <header className={cx('header')}>
            <div className={cx('header-inner')}>
                <Tooltip title="Quay lại trang E-Learning">
                    <Link to={config.routes.learning} className={cx('back-icon')}>
                        <FaAngleLeft />
                    </Link>
                </Tooltip>
                <div className={cx('logo-wrapper')}>
                    <Tooltip title="Quay lại trang chủ">
                        <Link to={config.routes.learning}>
                            <figure className={cx('logo-inner')}>
                                <img src="/assets/img/logo_gadient.png" alt="Logo" className={cx('logo')} />
                                {/* <img src="/assets/img/logo_text.png" alt="Logo" className={cx('logo_text')} /> */}
                            </figure>
                        </Link>
                    </Tooltip>
                </div>
                <div className={cx('course-title')}>{course.title}</div>
            </div>

            <div className={cx('module-action')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('progress-circle')}>
                        <Progress type="circle" percent={percent} strokeColor={conicColors} size={36} />
                    </div>

                    <p className={cx('completed-msg')}>
                        {completed}/{total} bài học
                    </p>

                    {/* <a href="#!" className={cx('cert-link')}>
                        Xem chứng chỉ
                    </a> */}
                </div>

                <div className={cx('buttons')}>
                    <Button text small leftIcon={<GiNotebook />} className={cx('note-btn')} onClick={onOpenNoteModal}>
                        <p className={cx('note-txt')}>Ghi chú</p>
                    </Button>
                    <Button text small leftIcon={<TbHelpHexagonFilled />} className={cx('help-btn')}>
                        Hướng dẫn
                    </Button>
                </div>
            </div>
        </header>
    );
}
