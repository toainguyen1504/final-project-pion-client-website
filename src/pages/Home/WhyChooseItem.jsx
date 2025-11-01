import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function WhyChooseItem({ icon, title, description }) {
    return (
        <article className={cx('card')}>
            <div className={cx('icon')}>{icon}</div>
            <h3 className={cx('title')}>{title}</h3>
            <p className={cx('description')}>{description}</p>
        </article>
    );
}

export default WhyChooseItem;
