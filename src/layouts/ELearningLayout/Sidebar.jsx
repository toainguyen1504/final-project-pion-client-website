import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Sidebar({ isOpen }) {
    return (
        <aside className={cx('sidebar', { closed: !isOpen })}>
            <h2 className={cx('sidebar-title')}>Nội dung khóa học</h2>
            <div className={cx('sidebar-inner')}>
                <ul className={cx('list')}>
                    {Array.from({ length: 50 }).map((_, i) => (
                        <li key={i}>Bài học {i + 1}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
