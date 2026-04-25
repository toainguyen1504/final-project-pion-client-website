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

    const banners = [
        {
            title: 'Tiếng Anh Mầm Non',
            desc: 'Làm quen tiếng Anh từ sớm qua bài hát, trò chơi và hoạt động tương tác. Phát triển tự nhiên kỹ năng Nghe – Nói.',
            cta: 'Xem lộ trình',
            image: '/assets/img/banner/en-mam-non.png',
            bgColor: '#f6783c',
            gradient:
                'linear-gradient(90deg, rgba(246,120,60,1) 0%, rgba(246,120,60,1) 52%, rgba(246,120,60,0.96) 58%, rgba(246,120,60,0.82) 64%, rgba(246,120,60,0.58) 70%, rgba(246,120,60,0.32) 76%, rgba(246,120,60,0.14) 84%, rgba(246,120,60,0.04) 92%, rgba(246,120,60,0.015) 100%)',
        },
        {
            title: 'Tiếng Anh Tiểu Học',
            desc: 'Xây dựng nền tảng vững chắc 4 kỹ năng Nghe – Nói – Đọc – Viết, phát triển tư duy và giao tiếp tự tin.',
            cta: 'Khám phá khóa học',
            image: '/assets/img/banner/en-tieu-hoc.png',
            bgColor: '#1f6aa5',
            gradient:
                'linear-gradient(90deg, rgba(31,106,165,1) 0%, rgba(31,106,165,1) 52%, rgba(31,106,165,0.96) 58%, rgba(31,106,165,0.82) 64%, rgba(31,106,165,0.58) 70%, rgba(31,106,165,0.32) 76%, rgba(31,106,165,0.14) 84%, rgba(31,106,165,0.04) 92%, rgba(31,106,165,0.015) 100%)',
        },
        {
            title: 'PION trên Youtube',
            desc: 'Cập nhật kiến thức tiếng Anh, mẹo học hiệu quả và video bài giảng từ PION. Học mọi lúc, mọi nơi cùng lộ trình rõ ràng.',
            cta: 'Đăng ký kênh',
            image: '/assets/img/banner/youtube.png',
            bgColor: '#ff416c',
            gradient:
                'linear-gradient(90deg, rgba(255,65,108,1) 0%, rgba(255,65,108,1) 52%, rgba(255,65,108,0.96) 58%, rgba(255,65,108,0.82) 64%, rgba(255,65,108,0.58) 70%, rgba(255,65,108,0.32) 76%, rgba(255,65,108,0.14) 84%, rgba(255,65,108,0.04) 92%, rgba(255,65,108,0.015) 100%)',
        },
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
                        <LearningBannerCarousel banners={banners} />
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
