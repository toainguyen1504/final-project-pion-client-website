import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '@/components/Button';
import { getFlashcardsByLesson } from '@/services/flashcardService';
import FlashcardReviewCard from './FlashcardReviewCard';
import styles from './LearningMode.module.scss';

const cx = classNames.bind(styles);

export default function LessonFlashcardReview({ lessonId }) {
    const [loading, setLoading] = useState(true);
    const [flashcards, setFlashcards] = useState([]);

    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [forgotIds, setForgotIds] = useState([]);
    const [hardIds, setHardIds] = useState([]);
    const [normalIds, setNormalIds] = useState([]);

    const [reviewPool, setReviewPool] = useState([]);

    useEffect(() => {
        async function fetchFlashcards() {
            if (!lessonId) return;

            setLoading(true);
            const data = await getFlashcardsByLesson(lessonId);
            setFlashcards(data || []);
            setReviewPool(data || []);

            setStarted(false);
            setCompleted(false);
            setFlipped(false);
            setCurrentIndex(0);
            setForgotIds([]);
            setHardIds([]);
            setNormalIds([]);

            setLoading(false);
        }

        fetchFlashcards();
    }, [lessonId]);

    const currentCard = reviewPool[currentIndex] || null;

    const totalCount = reviewPool.length;

    const handleStart = () => {
        setStarted(true);
        setCompleted(false);
        setFlipped(false);
        setCurrentIndex(0);
    };

    const handleAnswer = (type) => {
        if (!currentCard) return;

        if (type === 'forgot') {
            setForgotIds((prev) => [...prev, currentCard.id]);
        } else if (type === 'hard') {
            setHardIds((prev) => [...prev, currentCard.id]);
        } else {
            setNormalIds((prev) => [...prev, currentCard.id]);
        }

        const isLast = currentIndex >= reviewPool.length - 1;

        if (isLast) {
            setCompleted(true);
            setFlipped(false);
            return;
        }

        setCurrentIndex((prev) => prev + 1);
        setFlipped(false);
    };

    const handleRetryAll = () => {
        setReviewPool(flashcards);
        setStarted(true);
        setCompleted(false);
        setFlipped(false);
        setCurrentIndex(0);
        setForgotIds([]);
        setHardIds([]);
        setNormalIds([]);
    };

    const handleRetryForgot = () => {
        const nextPool = flashcards.filter((item) => forgotIds.includes(item.id));
        setReviewPool(nextPool);
        setStarted(true);
        setCompleted(false);
        setFlipped(false);
        setCurrentIndex(0);
        setForgotIds([]);
        setHardIds([]);
        setNormalIds([]);
    };

    const handleRetryForgotAndHard = () => {
        const nextPool = flashcards.filter((item) => forgotIds.includes(item.id) || hardIds.includes(item.id));

        setReviewPool(nextPool);
        setStarted(true);
        setCompleted(false);
        setFlipped(false);
        setCurrentIndex(0);
        setForgotIds([]);
        setHardIds([]);
        setNormalIds([]);
    };

    const progressText = useMemo(() => {
        if (!started || completed || totalCount === 0) return '';
        return `${currentIndex + 1}/${totalCount}`;
    }, [started, completed, currentIndex, totalCount]);

    if (loading) {
        return (
            <div className={cx('flashcard-panel')}>
                <div className={cx('flashcard-empty')}>Đang tải flashcards...</div>
            </div>
        );
    }

    if (!flashcards.length) {
        return (
            <div className={cx('flashcard-panel')}>
                <div className={cx('flashcard-empty')}>Bài học này chưa có flashcard để ôn tập.</div>
            </div>
        );
    }

    if (!started) {
        return (
            <div className={cx('flashcard-panel')}>
                <div className={cx('flashcard-start')}>
                    <p className={cx('flashcard-badge')}>Flashcard Review</p>
                    <h3 className={cx('flashcard-start-title')}>Ôn tập từ vựng bài học</h3>
                    <p className={cx('flashcard-start-desc')}>
                        Bài học này có <strong>{flashcards.length}</strong> flashcards. Hãy bắt đầu lật thẻ để tự kiểm
                        tra mức độ ghi nhớ của bạn.
                    </p>

                    <Button rounded primary onClick={handleStart}>
                        Bắt đầu ôn tập
                    </Button>
                </div>
            </div>
        );
    }

    if (completed) {
        return (
            <div className={cx('flashcard-panel')}>
                <div className={cx('flashcard-summary')}>
                    <p className={cx('flashcard-badge')}>Hoàn thành</p>
                    <h3 className={cx('flashcard-summary-title')}>Bạn đã hoàn thành phần ôn tập</h3>

                    <div className={cx('flashcard-summary-grid')}>
                        <div className={cx('summary-item')}>
                            <span className={cx('summary-label')}>Tổng số thẻ</span>
                            <strong className={cx('summary-value')}>
                                {forgotIds.length + hardIds.length + normalIds.length}
                            </strong>
                        </div>

                        <div className={cx('summary-item', 'forgot')}>
                            <span className={cx('summary-label')}>Quên</span>
                            <strong className={cx('summary-value')}>{forgotIds.length}</strong>
                        </div>

                        <div className={cx('summary-item', 'hard')}>
                            <span className={cx('summary-label')}>Khó</span>
                            <strong className={cx('summary-value')}>{hardIds.length}</strong>
                        </div>

                        <div className={cx('summary-item', 'normal')}>
                            <span className={cx('summary-label')}>Bình thường</span>
                            <strong className={cx('summary-value')}>{normalIds.length}</strong>
                        </div>
                    </div>

                    <div className={cx('flashcard-summary-actions')}>
                        <Button rounded primary onClick={handleRetryAll}>
                            Ôn lại toàn bộ
                        </Button>

                        <Button rounded disabled={forgotIds.length === 0} onClick={handleRetryForgot}>
                            Ôn lại thẻ Quên
                        </Button>

                        <Button
                            rounded
                            disabled={forgotIds.length + hardIds.length === 0}
                            onClick={handleRetryForgotAndHard}
                        >
                            Ôn lại thẻ Quên + Khó
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('flashcard-panel')}>
            <div className={cx('flashcard-topbar')}>
                <p className={cx('flashcard-badge')}>Flashcard Review</p>
                <span className={cx('flashcard-progress')}>{progressText}</span>
            </div>

            <FlashcardReviewCard
                card={currentCard}
                flipped={flipped}
                onFlip={() => setFlipped(true)}
                onAnswer={handleAnswer}
            />
        </div>
    );
}
