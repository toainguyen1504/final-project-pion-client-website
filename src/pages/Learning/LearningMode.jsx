import classNames from 'classnames/bind';
import styles from './LearningMode.module.scss';

const cx = classNames.bind(styles);

export default function LearningMode({ sidebarOpen }) {
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
                <h1>Tiêu đề bài học</h1>
                <p>
                    Mô tả ngắn về bài học hoặc nội dung đang học. Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Laudantium, quia. Nihil odio dolorem totam, fugiat quo nobis quibusdam non recusandae expedita
                    earum aliquid sit adipisci officia ea. Nemo, hic optio.
                </p>
                {Array.from({ length: 100 }).map((_, i) => (
                    <p key={i}>Dòng mô tả nội dung {i + 1}</p>
                ))}
            </div>
        </>
    );
}
