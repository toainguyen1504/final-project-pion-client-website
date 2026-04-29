import classNames from 'classnames/bind';
import Button from '@/components/Button';
import styles from './LearningMode.module.scss';

const cx = classNames.bind(styles);

export default function FlashcardReviewCard({ card, flipped, onFlip, onAnswer }) {
    if (!card) return null;

    return (
        <div className={cx('flashcard-review-card')}>
            <div className={cx('flashcard-review-inner', { flipped })}>
                {!flipped ? (
                    <div className={cx('flashcard-face', 'front')}>
                        <p className={cx('flashcard-label')}>Từ vựng</p>
                        <h3 className={cx('flashcard-vocabulary')}>{card.vocabulary || '---'}</h3>

                        {card.phonetic && <p className={cx('flashcard-phonetic')}>{card.phonetic}</p>}

                        <div className={cx('flashcard-actions')}>
                            <Button rounded primary onClick={onFlip}>
                                Lật thẻ
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={cx('flashcard-face', 'back')}>
                        <div className={cx('flashcard-answer-block')}>
                            <p className={cx('flashcard-label')}>Nghĩa tiếng Việt</p>
                            <h3 className={cx('flashcard-translation')}>{card.translation || '---'}</h3>
                        </div>

                        {card.example_sentence && (
                            <div className={cx('flashcard-answer-block')}>
                                <p className={cx('flashcard-label')}>Câu ví dụ</p>
                                <p className={cx('flashcard-example')}>{card.example_sentence}</p>
                            </div>
                        )}

                        {card.example_translation && (
                            <div className={cx('flashcard-answer-block')}>
                                <p className={cx('flashcard-label')}>Dịch câu ví dụ</p>
                                <p className={cx('flashcard-example-translation')}>{card.example_translation}</p>
                            </div>
                        )}

                        <div className={cx('flashcard-actions', 'review-actions')}>
                            <Button rounded className={cx('forget-btn')} onClick={() => onAnswer('forgot')}>
                                Quên
                            </Button>

                            <Button rounded className={cx('hard-btn')} onClick={() => onAnswer('hard')}>
                                Khó
                            </Button>

                            <Button rounded className={cx('normal-btn')} onClick={() => onAnswer('normal')}>
                                Bình thường
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
