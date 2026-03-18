import { useState, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import { FaPlus } from 'react-icons/fa6';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Skeleton } from 'antd';

import { getLessonProgress, updateLessonProgress } from '@/services/myLearningServices';

import styles from './LearningMode.module.scss';
dayjs.locale('vi');

const cx = classNames.bind(styles);

// extract videoId từ embed url
function extractVideoId(url) {
    if (!url) return null;
    const match = url.match(/embed\/([^\?]+)/);
    return match ? match[1] : null;
}

export default function LearningMode({ sidebarOpen, onToggleNote, showNotePopup, currentLesson, loading }) {
    const [videoError, setVideoError] = useState(false);
    const [resumeTime, setResumeTime] = useState(null);

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const intervalRef = useRef(null);

    // reset error + resumeTime khi đổi lesson
    useEffect(() => {
        setVideoError(false);
        setResumeTime(null);
    }, [currentLesson?.id]);

    // format date
    const updatedDate = useMemo(() => {
        if (!currentLesson?.updated_at) return '---';
        return dayjs(currentLesson.updated_at).format('MMMM [năm] YYYY');
    }, [currentLesson?.updated_at]);

    // fetch progress
    useEffect(() => {
        if (!currentLesson?.id) return;

        const fetchProgress = async () => {
            try {
                const res = await getLessonProgress(currentLesson.id);
                setResumeTime(res?.watched_duration ?? 0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProgress();
    }, [currentLesson?.id]);

    // load YouTube API 1 lần
    useEffect(() => {
        if (window.YT) return;

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }, []);

    // init player
    useEffect(() => {
        if (!currentLesson?.video_url) return;
        if (resumeTime === null) return; // (chờ resumeTime)

        const videoId = extractVideoId(currentLesson.video_url);
        if (!videoId) return;

        const initPlayer = () => {
            // clear interval cũ
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            // destroy player cũ
            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) {}
                playerRef.current = null;
            }

            playerRef.current = new window.YT.Player(playerContainerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                },
                events: {
                    onReady: (event) => {
                        console.log('🎬 Player ready');

                        // delay để chắc chắn video load xong
                        if (resumeTime > 0) {
                            setTimeout(() => {
                                try {
                                    event.target.seekTo(resumeTime, true);
                                } catch (e) {}
                            }, 500);
                        }
                    },

                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            if (intervalRef.current) clearInterval(intervalRef.current);

                            intervalRef.current = setInterval(async () => {
                                try {
                                    const currentTime = Math.floor(event.target.getCurrentTime());

                                    const res = await updateLessonProgress({
                                        lesson_id: currentLesson.id,
                                        watched_duration: currentTime,
                                    });

                                    window.dispatchEvent(
                                        new CustomEvent('progress-updated', {
                                            detail: {
                                                lessonId: currentLesson.id,
                                                progress: res,
                                            },
                                        }),
                                    );
                                } catch (err) {
                                    console.error(err);
                                }
                            }, 5000);
                        }

                        if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                            if (intervalRef.current) {
                                clearInterval(intervalRef.current);
                                intervalRef.current = null;
                            }
                        }
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) {}
                playerRef.current = null;
            }
        };
    }, [currentLesson?.id, resumeTime]);

    // loading
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

    return (
        <>
            {/* VIDEO */}
            <div className={cx('video', { expanded: !sidebarOpen })}>
                <div ref={playerContainerRef} style={{ width: '100%', height: '100%' }} />
            </div>

            {/* CONTENT */}
            <div className={cx('content')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title-inner')}>
                        <h1 className={cx('lesson-title')}>{currentLesson.title}</h1>
                        <p className={cx('lesson-desc')}>Cập nhật {updatedDate}</p>
                    </div>

                    {!showNotePopup && (
                        <button className={cx('note-btn')} onClick={onToggleNote}>
                            <FaPlus className={cx('note-icon')} />
                            Thêm ghi chú tại
                            <p className={cx('note-time')}>--:--</p>
                        </button>
                    )}
                </div>

                <p className={cx('lesson-desc')}>{currentLesson.intro?.trim() || 'Nội dung đang được cập nhật'}</p>
            </div>
        </>
    );
}
