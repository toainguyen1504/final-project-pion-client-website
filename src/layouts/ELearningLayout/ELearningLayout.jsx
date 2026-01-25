import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

export default function ELearningLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <main className={cx('main')}>
                <div className={cx('content')}>
                    <div className={cx('video-area')}>{children}</div>
                    <Sidebar />
                </div>
            </main>
            <Footer />
        </div>
    );
}
