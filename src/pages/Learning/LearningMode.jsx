import classNames from 'classnames/bind';
import { FaPlus } from 'react-icons/fa6';
import styles from './LearningMode.module.scss';

const cx = classNames.bind(styles);

export default function LearningMode({ sidebarOpen, onToggleNote, showNotePopup }) {
    return (
        <>
            {/* Khu vực xem video */}
            <div className={cx('video', { expanded: !sidebarOpen })}>
                <iframe
                    width="100%"
                    height="100%"
                    // src="https://www.youtube.com/embed/X0QjBKCDBVw?si=2i8KAHVMhjMsQnIO"
                    src="https://www.youtube.com/embed/bojdCI-dH5g?si=kHH8dTbVCqJo2YWb"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>

            <div className={cx('content')}>
                <div className={cx('title-wrapper')}>
                    {/* TITLE */}
                    <div className={cx('title-inner')}>
                        <h1 className={cx('lesson-title')}>Tiêu đề bài học</h1>
                        <p className={cx('lesson-desc')}>Cập nhật tháng 1 năm 2026</p>
                    </div>

                    {/* NOTE */}
                    {!showNotePopup && (
                        <button className={cx('note-btn')} onClick={onToggleNote}>
                            <FaPlus className={cx('note-icon')} />
                            Thêm ghi chú tại
                            <p className={cx('note-time')}>03:18</p>
                        </button>
                    )}
                </div>

                {/* CONTENT */}
                <p>
                    Mô tả ngắn về bài học hoặc nội dung đang học. Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Laudantium, quia. Nihil odio dolorem totam, fugiat quo nobis quibusdam non recusandae expedita
                    earum aliquid sit adipisci officia ea. Nemo, hic optio.
                </p>
                {Array.from({ length: 30 }).map((_, i) => (
                    <p key={i}>Dòng mô tả nội dung {i + 1}</p>
                ))}
            </div>
        </>
    );
}
