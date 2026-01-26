import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

export default function ELearningLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <main className={cx('main')}>
                <div className={cx('content')}>
                    <div className={cx('video-area', { expanded: !sidebarOpen })}>{children}</div>
                    <Sidebar isOpen={sidebarOpen} />
                </div>
            </main>
            <Footer onToggleSidebar={handleToggleSidebar} isOpen={sidebarOpen} />
        </div>
    );
}
