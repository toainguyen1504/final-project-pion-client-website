import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import classNames from 'classnames/bind';
import { DEFAULT_IMAGE } from '@/constants';
import styles from './LearningBannerCarousel.module.scss';

const cx = classNames.bind(styles);

function BannerCarousel({ banners = [] }) {
    const imageList = banners.length > 0 ? banners : [DEFAULT_IMAGE];

    return (
        <div className={cx('banner-wrapper')}>
            <Carousel arrows autoplay autoplaySpeed={6000} dots>
                {imageList.map((item, index) => {
                    const isObject = typeof item === 'object';
                    const image = isObject ? item.image : item;
                    const title = isObject ? item.title : '';
                    const desc = isObject ? item.desc : '';
                    const cta = isObject ? item.cta : '';
                    const bgColor = isObject ? item.bgColor : '#ce232d';
                    const gradient = isObject
                        ? item.gradient
                        : 'linear-gradient(90deg, rgba(206,35,45,0.95), rgba(206,35,45,0.55))';

                    return (
                        <div key={index}>
                            <div
                                className={cx('carousel-img', 'banner-slide')}
                                style={{
                                    '--banner-bg': bgColor,
                                    '--banner-gradient': gradient,
                                    '--banner-image': `url(${image || DEFAULT_IMAGE})`,
                                }}
                            >
                                {isObject && (
                                    <div className={cx('banner-content')}>
                                        <h2>{title}</h2>
                                        <p>{desc}</p>
                                        {cta && <button type="button">{cta}</button>}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
}

BannerCarousel.propTypes = {
    images: PropTypes.array.isRequired,
};

export default BannerCarousel;
