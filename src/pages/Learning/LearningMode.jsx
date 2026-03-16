import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { FaPlus } from 'react-icons/fa6';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // để hiển thị tiếng Việt
import { Skeleton } from 'antd';

import styles from './LearningMode.module.scss';
dayjs.locale('vi');

const cx = classNames.bind(styles);

function isValidVideoUrl(url) {
    if (!url) return false;

    try {
        const parsed = new URL(url);

        const host = parsed.hostname.replace('www.', '');

        return host.includes('youtube.com') || host.includes('youtu.be') || host.includes('vimeo.com');
    } catch {
        return false;
    }
}

export default function LearningMode({ sidebarOpen, onToggleNote, showNotePopup, currentLesson, loading }) {
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        setVideoError(false);
    }, [currentLesson?.id]);

    const updatedDate = useMemo(() => {
        if (!currentLesson?.updated_at) return '---';
        return dayjs(currentLesson.updated_at).format('MMMM [năm] YYYY');
    }, [currentLesson?.updated_at]);

    // Nếu đang loading dữ liệu, hiển thị skeleton
    if (loading) {
        return (
            <>
                <div className={cx('video')}>
                    <Skeleton.Image
                        active
                        style={{
                            width: '100%',
                            aspectRatio: '16/9',
                        }}
                    />
                </div>

                <div className={cx('content')}>
                    <Skeleton.Input active size="large" style={{ width: '40%' }} />

                    <Skeleton.Input active size="small" style={{ width: 150, marginTop: 8 }} />

                    <Skeleton active paragraph={{ rows: 4 }} />
                </div>
            </>
        );
    }

    if (!currentLesson) return null;

    const validVideo = isValidVideoUrl(currentLesson.video_url);

    return (
        <>
            {/* Khu vực xem video */}
            <div className={cx('video', { expanded: !sidebarOpen })}>
                {!videoError && validVideo ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={currentLesson.video_url}
                        title={currentLesson.title || 'Video bài học'}
                        frameBorder="0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className={cx('video-error')}>
                        <h3>Không thể tải video</h3>
                        <p>Video này hiện không khả dụng.</p>
                    </div>
                )}
            </div>

            <div className={cx('content')}>
                <div className={cx('title-wrapper')}>
                    {/* Title */}
                    <div className={cx('title-inner')}>
                        <h1 className={cx('lesson-title')}>{currentLesson.title}</h1>
                        <p className={cx('lesson-desc')}>Cập nhật {updatedDate}</p>
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
