import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HeadingSection.module.scss';

const cx = classNames.bind(styles);

const HeadingSection = ({ title }) => {
    return (
        <div className={cx('heading-section')}>
            <h2 className={cx('title-section', 'uppercase')}>
                {/* Sau này có truyền props thì nên truyền thêm "link" dùng cho thẻ a (Link), optional */}
                <a href="#!">{title}</a>
            </h2>
        </div>
    );
};

HeadingSection.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeadingSection;
