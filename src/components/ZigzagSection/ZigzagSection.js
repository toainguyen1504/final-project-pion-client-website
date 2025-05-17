import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DEFAULT_IMAGE } from '@/constants';
import styles from './ZigzagSection.module.scss';

const cx = classNames.bind(styles);

const ZigzagSection = ({ items }) => {
    return (
        <div className={cx('zigzag-section')}>
            {items.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                    <div
                        key={index}
                        className={cx('row', { reverse: !isEven })}
                        data-aos={isEven ? 'fade-right' : 'fade-left'}
                    >
                        <figure className={cx('image-wrapper')}>
                            <img src={item.imageUrl || DEFAULT_IMAGE} alt={item.title} loading="lazy" />
                        </figure>

                        <div className={cx('content')}>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

ZigzagSection.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default ZigzagSection;
