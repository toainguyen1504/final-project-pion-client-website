import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const CoreValuesSlider = ({ data = [], interval = 2000 }) => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const cardsPerPage = 3;
    const totalPages = Math.ceil(data.length / cardsPerPage);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const autoScroll = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % totalPages;
                const scrollLeft = nextIndex * scrollContainer.offsetWidth;
                scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                return nextIndex;
            });
        }, interval);

        return () => clearInterval(autoScroll); // cleanup interval on component unmount
    }, [totalPages, interval]);

    const handleScroll = () => {
        const scrollContainer = scrollRef.current;
        const pageWidth = scrollContainer.offsetWidth;
        const newIndex = Math.round(scrollContainer.scrollLeft / pageWidth);

        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    const handleDotClick = (index) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollLeft = index * scrollContainer.offsetWidth;
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        setActiveIndex(index);
    };

    return (
        <div className={cx('slider')}>
            <div className={cx('scrollContainer')} ref={scrollRef} onScroll={handleScroll}>
                {data.map((item, index) => (
                    <div className={cx('card')} key={index}>
                        <div className={cx('icon')}>{item.icon}</div>
                        <h3 className={cx('title')}>{item.title}</h3>
                        <p className={cx('desc')}>{item.description}</p>
                    </div>
                ))}
            </div>

            <div className={cx('dots')}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        className={cx('dot', { active: index === activeIndex })}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoreValuesSlider;
