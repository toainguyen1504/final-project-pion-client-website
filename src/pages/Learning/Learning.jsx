import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import Breadcrumb from '@/components/Breadcrumb';
import HeadingSection from '@/components/HeadingSection';
import LearningBannerCarousel from './LearningBannerCarousel';
import { eCourses } from '@/data/eCourses';
import ECoursesList from './ECoursesList';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

function Learning() {
    const getProCourses = () => eCourses.filter((course) => course.price > 0);
    const getFreeCourses = () => eCourses.filter((course) => course.price === 0);

    // fake banners for e-learning
    const bannerImages = [
        '/assets/img/banner/new_banner_1.jpg',
        '/assets/img/banner/new_banner_2.jpg',
        '/assets/img/banner/banner_5.png',
        '/assets/img/banner/banner_4.png',
        '/assets/img/banner/banner_3.png',
    ];

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
                    <Breadcrumb title="E-learning" />
                </div>

                <div className="inner">
                    {/* Card text: Tiếp tục học - card đang học gần đây nhất -> có nút Học ngay -> */}

                    {/* Banner */}
                    <section className={cx('banners')}>
                        <LearningBannerCarousel images={bannerImages} />
                    </section>

                    {/* Courses */}
                    <section className={cx('courses')}>
                        <HeadingSection title="Khóa học Pro" />
                        <ECoursesList courses={getProCourses()} />

                        {/* khóa học miễn phí - tạo Ecourses ở đây: click thumb hoặc title sẽ vào detail*/}
                        <HeadingSection title="Khóa học miễn phí" />
                        <ECoursesList courses={getFreeCourses()} />
                    </section>
                </div>
            </div>
        </>
    );
}

export default Learning;
