import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import LearningMode from '@/pages/Learning/LearningMode';
import Button from '@/components/Button'; // import Button custom

const cx = classNames.bind(styles);

export default function ELearningLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showNotePopup, setShowNotePopup] = useState(false);

    // Sidebar toggle handler
    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Note popup handler
    const handleToggleNote = () => setShowNotePopup((prev) => !prev);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <main className={cx('main')}>
                <div className={cx('content')}>
                    <div className={cx('video-area', { expanded: !sidebarOpen })}>
                        {/* video and content */}
                        <LearningMode
                            sidebarOpen={sidebarOpen}
                            onToggleNote={handleToggleNote}
                            showNotePopup={showNotePopup}
                        />
                    </div>
                    <Sidebar isOpen={sidebarOpen} />
                </div>
            </main>
            <Footer onToggleSidebar={handleToggleSidebar} isOpen={sidebarOpen} />

            {showNotePopup && (
                <div className={cx('note-popup', 'animate')}>
                    <div className={cx('note-header')}>
                        <h3 className={cx('note-title')}>Thêm ghi chú tại</h3>
                        <span className={cx('note-time')}>03:18</span>
                    </div>

                    {/* Sau này chuyển sang Editor nếu cần thiết */}
                    <textarea className={cx('note-input')} placeholder="Nội dung ghi chú..."></textarea>

                    <div className={cx('note-actions')}>
                        <Button rounded small className={cx('cancel-btn')} onClick={handleToggleNote}>
                            HỦY BỎ
                        </Button>
                        <Button rounded small primary className={cx('save-btn')}>
                            TẠO GHI ChÚ
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
