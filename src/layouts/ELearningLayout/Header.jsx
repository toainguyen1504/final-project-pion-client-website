import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';
import { TbHelpHexagonFilled } from 'react-icons/tb';
import { FaAngleLeft } from 'react-icons/fa6';
import { Tooltip, Progress } from 'antd';
import config from '@/config';
import Button from '@/components/Button'; // import Button custom
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

// colors for conic gradient progress circle
const conicColors = {
    '0%': '#87d068',
    '50%': '#ffccc7',
    '100%': 'var(--primary-highlight)',
};

export default function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('header-inner')}>
                <Tooltip title="Quay lại trang E-Learning">
                    <Link to={config.routes.learning} className={cx('back-icon')}>
                        <FaAngleLeft />
                    </Link>
                </Tooltip>
                <div className={cx('logo-wrapper')}>
                    <Tooltip title="Quay lại trang chủ">
                        <Link to={config.routes.home}>
                            <figure className={cx('logo-inner')}>
                                <img src="/assets/img/logo_gadient.png" alt="Logo" className={cx('logo')} />
                                {/* <img src="/assets/img/logo_text.png" alt="Logo" className={cx('logo_text')} /> */}
                            </figure>
                        </Link>
                    </Tooltip>
                </div>
                <div className={cx('course-title')}>Tên khóa học</div>
            </div>

            <div className={cx('module-action')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('progress-circle')}>
                        <Progress type="circle" percent={89} strokeColor={conicColors} size={36} />
                    </div>
                    <p className={cx('completed-msg')}>11/12 bài học</p>
                    <a href="#!" className={cx('cert-link')}>
                        Xem chứng chỉ
                    </a>
                </div>

                <div className={cx('buttons')}>
                    <Button text small leftIcon={<GiNotebook />} className={cx('note-btn')}>
                        Ghi chú
                    </Button>
                    <Button text small leftIcon={<TbHelpHexagonFilled />} className={cx('help-btn')}>
                        Hướng dẫn
                    </Button>
                </div>
            </div>
        </header>
    );
}
