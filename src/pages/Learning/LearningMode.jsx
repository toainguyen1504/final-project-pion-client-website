import classNames from 'classnames/bind';
import styles from './LearningMode.module.scss';

const cx = classNames.bind(styles);

export default function LearningMode() {
    return (
        <>
            {/* Khu vực xem video */}
            <div className={cx('video')}>
                <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/X0QjBKCDBVw?si=2i8KAHVMhjMsQnIO"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>

            <div className={cx('content')}>
                <h1>Tiêu đề bài học</h1>
                <p>Mô tả ngắn về bài học hoặc nội dung đang học.</p>
                {Array.from({ length: 100 }).map((_, i) => (
                    <p key={i}>Dòng mô tả nội dung {i + 1}</p>
                ))}
            </div>
        </>
    );
}
