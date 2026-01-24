import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import classNames from 'classnames/bind';
import { DEFAULT_IMAGE } from '@/constants';
import styles from './LearningBannerCarousel.module.scss';

const cx = classNames.bind(styles);

function BannerCarousel({ images = [] }) {
    const imageList = images.length > 0 ? images : [DEFAULT_IMAGE];

    return (
        <div className={cx('banner-wrapper')}>
            <Carousel arrows autoplay autoplaySpeed={6000} dots>
                {imageList.map((url, index) => (
                    <img
                        key={index}
                        src={url || DEFAULT_IMAGE}
                        alt={`banner-${index}`}
                        className={cx('carousel-img')}
                        loading="lazy"
                    />
                ))}
            </Carousel>
        </div>
    );
}

BannerCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BannerCarousel;
