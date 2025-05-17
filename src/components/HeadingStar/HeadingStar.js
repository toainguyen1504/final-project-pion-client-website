import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FaStar } from 'react-icons/fa';
import styles from './HeadingStar.module.scss';

const cx = classNames.bind(styles);

const HeadingStar = ({ title, color = 'var(--white)' }) => {
    return (
        <div className={cx('title-wrapper')} style={{ '--heading-color': color }}>
            <h2 className={cx('title')}>{title}</h2>
            <span className={cx('star-icon')}>
                <FaStar />
            </span>
        </div>
    );
};

HeadingStar.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default HeadingStar;
