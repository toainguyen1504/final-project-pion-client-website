import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('header-inner')}>
                <h1 className={cx('logo')}>Pion Learning</h1>
            </div>
        </header>
    );
}
