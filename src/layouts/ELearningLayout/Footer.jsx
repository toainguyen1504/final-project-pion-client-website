import classNames from 'classnames/bind';
import { FaAngleLeft, FaAngleRight, FaArrowRight } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';

import Button from '@/components/Button'; // import Button custom
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Footer({ currentChapter = '2. Môi trường, con người IT (ví dụ)', onToggleSidebar, isOpen }) {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-inner')}>
                <div className={cx('buttons')}>
                    <Button rounded small primary leftIcon={<FaAngleLeft />} className={cx('nav-btn')}>
                        Bài trước
                    </Button>
                    <Button rounded small primary rightIcon={<FaAngleRight />} className={cx('nav-btn')}>
                        Bài tiếp theo
                    </Button>
                </div>

                {/* Hiển thị tên chương và nút toggle */}
                <div className={cx('chapter-info')}>
                    {/* optimize: Cần hàm xử lý text ở đây, nếu quá dài thì sẽ bị cắt + Tooltip */}
                    <span className={cx('chapter-name')}>{currentChapter}</span>

                    {/* Toggle button */}
                    <button className={cx('toggle-btn')} onClick={onToggleSidebar}>
                        {isOpen ? <FaArrowRight /> : <HiMenu />}
                    </button>
                </div>
            </div>
        </footer>
    );
}
