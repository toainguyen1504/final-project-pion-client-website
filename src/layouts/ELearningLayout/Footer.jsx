import classNames from 'classnames/bind';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Button from '@/components/Button'; // import Button custom
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-inner')}>
                <Button rounded small primary leftIcon={<FaAngleLeft />} className={cx('nav-btn')}>
                    Bài trước
                </Button>
                <Button rounded small primary rightIcon={<FaAngleRight />} className={cx('nav-btn')}>
                    Bài tiếp theo
                </Button>
            </div>
        </footer>
    );
}
