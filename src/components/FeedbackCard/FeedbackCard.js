import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FaQuoteLeft } from 'react-icons/fa';
import { DEFAULT_AVATAR_IMAGE } from '@/constants';
import styles from './FeedbackCard.module.scss';

const cx = classNames.bind(styles);

const FeedbackCard = ({ avatar, name, info, feedback }) => {
    return (
        <article className={cx('feedback-card')}>
            <div className={cx('feedback-icon')}>
                <FaQuoteLeft />
            </div>

            {/* Desktop layout */}
            <div className={cx('feedback-content-desktop')}>
                <figure className={cx('feedback-content')}>
                    <img
                        src={avatar || DEFAULT_AVATAR_IMAGE}
                        alt={name}
                        className={cx('feedback-avatar')}
                        loading="lazy"
                    />
                    <figcaption>
                        <blockquote className={cx('feedback-text')}>{feedback}</blockquote>
                        <span>{name}</span>
                        <p>{info}</p>
                    </figcaption>
                </figure>
            </div>

            {/* Mobile layout */}
            <div className={cx('feedback-content-mobile')}>
                <figure className={cx('feedback-content')}>
                    <blockquote className={cx('feedback-text')}>{feedback}</blockquote>
                    <div className={cx('feedback-bottom')}>
                        <img
                            src={avatar || DEFAULT_AVATAR_IMAGE}
                            alt={name}
                            className={cx('feedback-avatar')}
                            loading="lazy"
                        />
                        <figcaption>
                            <span>{name}</span>
                            <p>{info}</p>
                        </figcaption>
                    </div>
                </figure>
            </div>
        </article>
    );
};

FeedbackCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
};

export default FeedbackCard;
