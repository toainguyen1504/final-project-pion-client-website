import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaPlus } from 'react-icons/fa6';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Skeleton } from 'antd';

import LessonFlashcardReview from './LessonFlashcardReview';
import { getLessonProgress, updateLessonProgress } from '@/services/myLearningServices';
import { formatDuration } from '@/utils/formatDuration';
import styles from './LearningMode.module.scss';

dayjs.locale('vi');
const cx = classNames.bind(styles);

function extractVideoId(url) {
    if (!url) return null;

    const embedMatch = url.match(/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];

    const watchMatch = url.match(/[?&]v=([^?&]+)/);
    if (watchMatch) return watchMatch[1];

    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];

    return null;
}

function loadYouTubeApi() {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT);
            return;
        }

        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');

        window.onYouTubeIframeAPIReady = () => {
            resolve(window.YT);
        };

        if (!existingScript) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
        }
    });
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
    const [activeTab, setActiveTab] = useState('content');

    const playerRef = useRef(null);
    const playerMountRef = useRef(null);

    const progressIntervalRef = useRef(null); // save progress
    const timeIntervalRef = useRef(null); // update UI time
    const isMountedRef = useRef(true);

    const location = useLocation();
    const fromNote = location.state?.fromNote;
    const noteTime = location.state?.time;

    const videoId = useMemo(() => {
        return extractVideoId(currentLesson?.video_url);
    }, [currentLesson?.video_url]);

    const updatedDate = useMemo(() => {
        if (!currentLesson?.updated_at) return '---';
        return dayjs(currentLesson.updated_at).format('MMMM [năm] YYYY');
    }, [currentLesson?.updated_at]);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (fromNote) {
            window.history.replaceState({}, document.title);
        }
    }, [fromNote]);

    // reset time and tab khi đổi lesson
    useEffect(() => {
        setResumeTime(null);
        setCurrentTime(0);
        setActiveTab('content');
    }, [currentLesson?.id]);

    // fetch progress (resume)
    useEffect(() => {
        if (!currentLesson?.id) return;

        let cancelled = false;

        async function fetchProgress() {
            try {
                const res = await getLessonProgress(currentLesson.id);

                if (!cancelled) {
                    setResumeTime(res?.watched_duration ?? 0);
                }
            } catch (err) {
                console.error(err);

                if (!cancelled) {
                    setResumeTime(0);
                }
            }
        }

        fetchProgress();

        return () => {
            cancelled = true;
        };
    }, [currentLesson?.id]);

    // load YouTube API
    useEffect(() => {
        if (!currentLesson?.id) return;
        if (!videoId) return;
        if (resumeTime === null) return;
        if (!playerMountRef.current) return;

        let cancelled = false;

        const clearTimers = () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }

            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
                timeIntervalRef.current = null;
            }
        };

        const destroyPlayer = () => {
            clearTimers();

            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) {}

                playerRef.current = null;
            }
        };

        async function initPlayer() {
            await loadYouTubeApi();

            if (cancelled || !isMountedRef.current || !playerMountRef.current) return;

            destroyPlayer();

            // Quan trọng:
            // Tạo node con thủ công, không để YouTube replace trực tiếp node do React quản lý.
            playerMountRef.current.innerHTML = '';

            const playerNode = document.createElement('div');
            playerNode.id = `youtube-player-${currentLesson.id}-${Date.now()}`;
            playerMountRef.current.appendChild(playerNode);

            playerRef.current = new window.YT.Player(playerNode, {
                videoId,
                width: '100%',
                height: '100%',
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                    rel: 0,
                    modestbranding: 1,
                    start: fromNote && noteTime != null ? Math.floor(noteTime) : Math.floor(resumeTime || 0),
                },
                events: {
                    onReady: (event) => {
                        if (cancelled) return;

                        window.dispatchEvent(new CustomEvent('player-ready'));

                        const targetTime = fromNote && noteTime != null ? noteTime : resumeTime;

                        if (targetTime > 0) {
                            setTimeout(() => {
                                try {
                                    event.target.seekTo(targetTime, true);
                                } catch (e) {}
                            }, 500);
                        }

                        timeIntervalRef.current = setInterval(() => {
                            try {
                                const time = Math.floor(event.target.getCurrentTime());
                                setCurrentTime(time);
                            } catch (e) {}
                        }, 500);
                    },

                    onStateChange: (event) => {
                        if (!window.YT?.PlayerState) return;

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

                        // PAUSE / END -> stop save progress
                        if (event.data === window.YT.PlayerState.PAUSED) {
                            if (progressIntervalRef.current) {
                                clearInterval(progressIntervalRef.current);
                                progressIntervalRef.current = null;
                            }
                        }

                        if (event.data === window.YT.PlayerState.ENDED) {
                            if (progressIntervalRef.current) {
                                clearInterval(progressIntervalRef.current);
                                progressIntervalRef.current = null;
                            }

                            try {
                                const duration = Math.floor(event.target.getDuration());

                                updateLessonProgress({
                                    lesson_id: currentLesson.id,
                                    watched_duration: duration,
                                    is_completed: true,
                                }).then((res) => {
                                    window.dispatchEvent(
                                        new CustomEvent('progress-updated', {
                                            detail: {
                                                lessonId: currentLesson.id,
                                                progress: res,
                                            },
                                        }),
                                    );
                                });
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    },
                },
            });
        }

        initPlayer();

        return () => {
            cancelled = true;
            destroyPlayer();

            if (playerMountRef.current) {
                playerMountRef.current.innerHTML = '';
            }
        };
    }, [currentLesson?.id, videoId, resumeTime, fromNote, noteTime]);

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
                try {
                    playerRef.current.seekTo(time, true);
                } catch (err) {
                    pendingSeekTime = time;
                }
            } else {
                pendingSeekTime = time; // player chưa ready -> lưu lại
            }
        };

        const readyHandler = () => {
            if (pendingSeekTime !== null && playerRef.current && typeof playerRef.current.seekTo === 'function') {
                try {
                    playerRef.current.seekTo(pendingSeekTime, true);
                } catch (err) {}

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
        <div>
            <div className={cx('video', { expanded: !sidebarOpen })}>
                {videoId ? (
                    <div ref={playerMountRef} style={{ width: '100%', height: '100%' }} />
                ) : (
                    <div className={cx('video-error')}>
                        <h3>Không có video</h3>
                        <p>Bài học này chưa có video.</p>
                    </div>
                )}
            </div>

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

                <div className={cx('lesson-tabs')}>
                    <button
                        className={cx('tab-btn', { active: activeTab === 'content' })}
                        onClick={() => setActiveTab('content')}
                    >
                        Nội dung
                    </button>

                    <button
                        className={cx('tab-btn', { active: activeTab === 'flashcards' })}
                        onClick={() => setActiveTab('flashcards')}
                    >
                        Flashcard Review
                    </button>
                </div>

                <div className={cx('lesson-tab-panel')}>
                    {activeTab === 'content' ? (
                        <div className={cx('lesson-content-panel')}>
                            <p className={cx('lesson-desc')}>
                                {currentLesson.intro?.trim() || 'Nội dung đang được cập nhật'}
                            </p>
                        </div>
                    ) : (
                        <LessonFlashcardReview lessonId={currentLesson?.id} />
                    )}
                </div>
            </div>
        </div>
    );
}
