import AOS from 'aos';
import classNames from 'classnames/bind';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Breadcrumb from '@/components/Breadcrumb';
import HeadingSection from '@/components/HeadingSection';
import ECoursesList from './ECoursesList';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

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
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title="E-learning - Khóa học" />
                </div>

                <div className="inner">
                    {/* Banner - sau tối ưu lại như F8 */}
                    {/* <BannerCarousel images={bannerImages} /> */}

                    {/* Courses */}
                    <section className={cx('courses')}>
                        <HeadingSection title="Khóa học miễn phí" />

                        <ECoursesList />
                        {/* khóa học miễn phí - tạo Ecourses ở đây: click thumb hoặc title sẽ vào detail*/}
                    </section>
                </div>
            </div>
        </>
    );
}

export default Learning;
