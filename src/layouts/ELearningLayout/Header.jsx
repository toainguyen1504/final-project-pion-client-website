import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';
import { TbHelpHexagonFilled } from 'react-icons/tb';
import config from '@/config';
import Button from '@/components/Button'; // import Button custom
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('header-inner')}>
                <div className={cx('logo-wrapper')}>
                    <Link to={config.routes.home}>
                        <figure className={cx('logo-inner')}>
                            <img src="/assets/img/logo_gadient.png" alt="Logo" className={cx('logo')} />
                            {/* <img src="/assets/img/logo_text.png" alt="Logo" className={cx('logo_text')} /> */}
                        </figure>
                    </Link>
                </div>
                <div className={cx('course-title')}>Tên khóa học</div>
            </div>

            <div className={cx('module-action')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('progress-item')}>100%</div>
                    <p className={cx('completed-msg')}>12/12 bài học</p>
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
