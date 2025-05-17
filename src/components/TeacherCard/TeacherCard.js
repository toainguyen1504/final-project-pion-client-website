import classNames from 'classnames/bind';
import { DEFAULT_AVATAR_IMAGE } from '@/constants';
import styles from './TeacherCard.module.scss';

const cx = classNames.bind(styles);

function TeacherCard({ image, name, qualifications = [] }) {
    return (
        <article className={cx('card')} data-aos="fade-up" data-aos-delay="100">
            <figure className={cx('image-wrapper')}>
                <img src={image || DEFAULT_AVATAR_IMAGE} alt={name} loading="lazy" />
            </figure>
            <div className={cx('info')}>
                <h4 className={cx('name')}>{name}</h4>
                <ul className={cx('qualifications')}>
                    {qualifications.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default TeacherCard;
