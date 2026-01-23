import AOS from 'aos';
import classNames from 'classnames/bind';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import BannerCarousel from '@/components/BannerCarousel';
import ECoursesList from './ECoursesList';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

const bannerImages = [
    '/assets/img/banner/new_banner_1.jpg',
    '/assets/img/banner/new_banner_2.jpg',
    '/assets/img/banner/banner_5.png',
    '/assets/img/banner/banner_4.png',
    '/assets/img/banner/banner_3.png',
];

function Learning() {
    // animation
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true, // animate once
            easing: 'ease-in-out',
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <Helmet>
                <title>E-learning | PION</title>
                <meta
                    name="description"
                    content="Tại Pion, chúng tôi tin rằng giáo dục là chìa khóa để mở ra cánh cửa tương lai."
                />
            </Helmet>

            <div className={cx('wrapper')}>
                <div className="inner">
                    {/* Banner - sau tối ưu lại như F8 */}
                    {/* <BannerCarousel images={bannerImages} /> */}

                    {/* Courses */}
                    <section className={cx('courses')}>
                        <div className={cx('heading-section')}>
                            <h2 className={cx('title-section', 'uppercase')}>
                                <a href="#!">Khóa học miễn phí</a>
                            </h2>
                        </div>
                        <ECoursesList />
                        {/* khóa học miễn phí - tạo Ecourses ở đây: click thumb hoặc title sẽ vào detail*/}
                    </section>
                </div>
            </div>
        </>
    );
}

export default Learning;
