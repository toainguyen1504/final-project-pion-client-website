import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import { FaAnglesRight } from 'react-icons/fa6';

const cx = classNames.bind(styles);

export default function Breadcrumb({ title = '', parentPath = '', parentLabel = '' }) {
    if (!title) return null;

    return (
        <nav className={cx('wrapper')}>
            <Link to="/" className={cx('link', 'home')}>
                Trang chủ
            </Link>

            {parentPath && parentLabel && (
                <div className={cx('parent_link')}>
                    <span className={cx('separator')}>
                        <FaAnglesRight size={10} />
                    </span>
                    <Link to={parentPath} className={cx('link')}>
                        {parentLabel}
                    </Link>
                </div>
            )}

            <div className={cx('children_link')}>
                <span className={cx('separator')}>
                    <FaAnglesRight size={10} />
                </span>
                <p className={cx('current')}>{title}</p>
            </div>
        </nav>
    );
}
