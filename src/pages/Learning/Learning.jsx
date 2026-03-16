import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import Breadcrumb from '@/components/Breadcrumb';
import HeadingSection from '@/components/HeadingSection';
import LearningBannerCarousel from './LearningBannerCarousel';
// import { eCourses } from '@/data/eCourses';
import { getAllCourses } from '@/services/coursesService';
import ECoursesList from './ECoursesList';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

function Learning() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = await getAllCourses();
                setCourses(data);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    const proCourses = useMemo(() => courses.filter((c) => !c.is_free), [courses]); // Khóa học có phí

    const freeCourses = useMemo(() => courses.filter((c) => c.is_free), [courses]); // Khóa học miễn phí

    // const proCourses = () => courses.filter((course) => course.is_free === false);
    // const freeCourses = () => courses.filter((course) => course.is_free === true);

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
                        {/* Khóa học có phí - sau này sẽ là các khóa học bên Trung tâm tự quay và bán -> ví dụ: HSK1-6 */}
                        <HeadingSection title="Khóa học Pro" />
                        <ECoursesList courses={proCourses} loading={loading} />

                        {/* khóa học miễn phí - tạo Ecourses ở đây: click thumb hoặc title sẽ vào detail*/}
                        <HeadingSection title="Khóa học miễn phí" />
                        <ECoursesList courses={freeCourses} loading={loading} />
                    </section>
                </div>
            </div>
        </>
    );
}

export default Learning;
