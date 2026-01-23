import { Link } from 'react-router-dom';
import config from '@/config';
import styles from '../Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function AuthButtons() {
    return (
        <div className={cx('auth-buttons')}>
            <Link to={config.routes.register} className={cx('btn', 'btn-outline')}>
                Đăng ký
            </Link>
            <Link to={config.routes.login} className={cx('btn', 'btn-primary')}>
                Đăng nhập
            </Link>
        </div>
    );
}
