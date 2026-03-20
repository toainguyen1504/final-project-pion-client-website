import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaPlus } from 'react-icons/fa6';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Skeleton } from 'antd';

import { getLessonProgress, updateLessonProgress } from '@/services/myLearningServices';
import { formatDuration } from '@/utils/formatDuration';
import styles from './LearningMode.module.scss';

dayjs.locale('vi');
const cx = classNames.bind(styles);

// extract videoId từ embed url
function extractVideoId(url) {
    if (!url) return null;
    const match = url.match(/embed\/([^\?]+)/);
    return match ? match[1] : null;
}

export default function LearningMode({
    sidebarOpen,
    onToggleNote,
    showNotePopup,
    showNoteModal,
    currentLesson,
    loading,
}) {
    const [resumeTime, setResumeTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);

    // TÁCH RIÊNG 2 INTERVAL
    const progressIntervalRef = useRef(null); // save progress
    const timeIntervalRef = useRef(null); // update UI time

    const location = useLocation();
    const fromNote = location.state?.fromNote;
    const noteTime = location.state?.time;

    // Clear state cho from note
    useEffect(() => {
        if (fromNote) {
            window.history.replaceState({}, document.title);
        }
    }, [fromNote]);

    // reset khi đổi lesson
    useEffect(() => {
        setResumeTime(null);
        setCurrentTime(0);
    }, [currentLesson?.id]);

    // format date
    const updatedDate = useMemo(() => {
        if (!currentLesson?.updated_at) return '---';
        return dayjs(currentLesson.updated_at).format('MMMM [năm] YYYY');
    }, [currentLesson?.updated_at]);

    // fetch progress (resume)
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

    // load YouTube API
    useEffect(() => {
        if (window.YT) return;

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }, []);

    // init player
    useEffect(() => {
        if (!currentLesson?.video_url) return;
        if (resumeTime === null) return;

        const videoId = extractVideoId(currentLesson.video_url);
        if (!videoId) return;

        const initPlayer = () => {
            // cleanup cũ
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);

            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) {}
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

                        window.dispatchEvent(new CustomEvent('player-ready'));

                        // resume video
                        if (fromNote && noteTime != null) {
                            event.target.seekTo(noteTime, true);
                        } else if (resumeTime > 0) {
                            setTimeout(() => {
                                try {
                                    event.target.seekTo(resumeTime, true);
                                } catch (e) {}
                            }, 500);
                        }

                        // update UI time
                        timeIntervalRef.current = setInterval(() => {
                            try {
                                const time = Math.floor(event.target.getCurrentTime());
                                setCurrentTime(time);
                            } catch (e) {}
                        }, 500);
                    },

                    onStateChange: (event) => {
                        // PLAYING → start save progress
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            if (progressIntervalRef.current) {
                                clearInterval(progressIntervalRef.current);
                            }

                            progressIntervalRef.current = setInterval(async () => {
                                try {
                                    const time = Math.floor(event.target.getCurrentTime());

                                    const res = await updateLessonProgress({
                                        lesson_id: currentLesson.id,
                                        watched_duration: time,
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

                        // PAUSE / END → stop save progress
                        if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                            if (progressIntervalRef.current) {
                                clearInterval(progressIntervalRef.current);
                                progressIntervalRef.current = null;
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
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);

            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) {}
            }
        };
    }, [currentLesson?.id, resumeTime]);

    // handle auto play and pause when note modal (add and list)
    useEffect(() => {
        if (!playerRef.current) return;

        try {
            if (showNotePopup || showNoteModal) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        } catch (e) {}
    }, [showNotePopup, showNoteModal]);

    useEffect(() => {
        let pendingSeekTime = null;

        const seekHandler = (e) => {
            const time = e.detail.time;

            if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                playerRef.current.seekTo(time, true);
            } else {
                // player chưa ready -> lưu lại
                pendingSeekTime = time;
            }
        };

        const readyHandler = () => {
            if (pendingSeekTime !== null && playerRef.current && typeof playerRef.current.seekTo === 'function') {
                playerRef.current.seekTo(pendingSeekTime, true);
                pendingSeekTime = null;
            }
        };

        window.addEventListener('seek-to-time', seekHandler);
        window.addEventListener('player-ready', readyHandler);

        return () => {
            window.removeEventListener('seek-to-time', seekHandler);
            window.removeEventListener('player-ready', readyHandler);
        };
    }, []);

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
                        <button className={cx('note-btn')} onClick={() => onToggleNote(currentTime)}>
                            <FaPlus className={cx('note-icon')} />
                            Thêm ghi chú tại
                            <p className={cx('note-time')}>{formatDuration(currentTime, 'lesson')}</p>
                        </button>
                    )}
                </div>

                <p className={cx('lesson-desc')}>{currentLesson.intro?.trim() || 'Nội dung đang được cập nhật'}</p>
            </div>
        </>
    );
}
