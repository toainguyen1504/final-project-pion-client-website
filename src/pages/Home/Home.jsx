import AOS from 'aos';
import classNames from 'classnames/bind';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { FaAnglesRight, FaBookAtlas } from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';
import { GiBookmarklet } from 'react-icons/gi';
import { MdHandshake } from 'react-icons/md';
import { FaPlaneDeparture } from 'react-icons/fa';
import { IoMdTrendingUp } from 'react-icons/io';
import { Row, Col, Image, Button, Spin } from 'antd';

import { feedbacks } from '@/data';
import BannerCarousel from '@/components/BannerCarousel';
import FeedbackCard from '@/components/FeedbackCard';
import WhyChooseItem from './WhyChooseItem';
import CourseList from './CourseList';
import NewsList from './NewsList';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const bannerImages = [
    '/assets/img/banner/new_banner_1.jpg',
    '/assets/img/banner/new_banner_2.jpg',
    '/assets/img/banner/banner_1.png',
    '/assets/img/banner/banner_2.png',
    '/assets/img/banner/banner_3.png',
    '/assets/img/banner/banner_4.png',
    '/assets/img/banner/banner_5.png',
];

const whyChooseData = [
    {
        icon: <GoGoal size={48} />,
        title: 'Định hướng nghề nghiệp bài bản',
        description:
            'Tư vấn chọn quốc gia, ngành học, công việc phù hợp với năng lực. Giúp bạn xây dựng lộ trình học tập và làm việc rõ ràng, dài hạn.',
    },
    {
        icon: <GiBookmarklet size={48} />,
        title: 'Các khóa học đạt chuẩn quốc tế',
        description: 'Cung cấp các khóa học tiếng Anh và tiếng Trung giúp bạn sẵn sàng hội nhập.',
    },
    {
        icon: <FaBookAtlas size={48} />,
        title: 'Hỗ trợ hồ sơ trọn gói',
        description:
            'Chuẩn bị giấy tờ từ A-Z: dịch thuật, hồ sơ, Visa, thủ tục pháp lý. Hỗ trợ học viên xuyên suốt quá trình nhập học và xuất cảnh.',
    },
    {
        icon: <FaPlaneDeparture size={48} />,
        title: 'Chương trình du học uy tín',
        description:
            'Đối tác với các trường đại học danh tiếng tại Đài Loan và Trung Quốc. Cung cấp cơ hội việc làm sau tốt nghiệp với mức thu nhập hấp dẫn.',
    },
    {
        icon: <MdHandshake size={48} />,
        title: 'Đồng hành và hỗ trợ tận tâm',
        description:
            'Hỗ trợ ổn định cuộc sống cho học viên và người lao động tại nước ngoài. Kết nối với cộng đồng và đối tác để giúp bạn hòa nhập dễ dàng hơn.',
    },
    {
        icon: <IoMdTrendingUp size={48} />,
        title: 'Cơ hội phát triển sự nghiệp bền vững',
        description: 'Không chỉ đơn thuần là du học, PION giúp bạn xây dựng sự nghiệp quốc tế vững chắc.',
    },
];

// default
const MAX_FEEDBACK_VISIBLE = 4;

function Home() {
    const [visibleCount, setVisibleCount] = useState(MAX_FEEDBACK_VISIBLE);
    const [hasExpanded, setHasExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    // handle "xem thêm cảm nhận" - feedback button
    const handleShowMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + 18);
            setHasExpanded(true);
            setLoading(false);
        }, 300);
    };

    // handle thu gọn
    const handleCollapse = () => {
        setVisibleCount(MAX_FEEDBACK_VISIBLE);
        setHasExpanded(false);

        // Cuộn mượt lên phần feedback
        const feedbackSection = document.getElementById('cam-nhan-ve-hoc-vien');
        if (feedbackSection) {
            feedbackSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

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
        <div className={cx('wrapper')}>
            <div className="inner">
                {/* Banner */}
                <BannerCarousel images={bannerImages} />

                {/* CEO message*/}
                <section className={cx('message')}>
                    <div className={cx('message-inner')}>
                        <Row gutter={16} align="middle">
                            <Col
                                xs={24}
                                md={15}
                                lg={14}
                                className={cx('content-col')}
                                data-aos="fade-left"
                                data-aos-delay="400"
                            >
                                <div className={cx('title-wrapper')}>
                                    <figure className={cx('title-box')}>
                                        <Image
                                            src="/assets/img/home/thong_diep.png"
                                            alt="Thông điệp"
                                            height={80}
                                            preview={false}
                                        />
                                        <span className={cx('badge')}>CEO</span>
                                    </figure>
                                    <div className={cx('sub-title')}>
                                        Pion là nơi nuôi dưỡng <br />
                                        <span style={{ marginTop: 8, display: 'block' }}>tương lai của bạn</span>
                                    </div>
                                </div>

                                <div className={cx('content')}>
                                    <p>
                                        Tại <span>Pion</span>, chúng tôi tin rằng giáo dục là chìa khóa để mở ra cánh
                                        cửa tương lai. Với mô hình
                                        <em>&nbsp;"Đào tạo ngôn ngữ - Du học - Hệ thống chuỗi"</em>, chúng tôi cam kết
                                        mang đến cho học viên không chỉ kiến thức ngôn ngữ vững chắc mà còn cơ hội phát
                                        triển toàn diện trên nền tảng quốc tế. Chúng tôi tập trung vào hai mô hình trọng
                                        yếu:
                                    </p>

                                    <ul className={cx('content-list')}>
                                        <li className={cx('content-item')}>
                                            <p>
                                                <span>Đào tạo ngôn ngữ chất lượng cao:</span> Cung cấp các khóa học
                                                tiếng Anh và tiếng Trung chuẩn quốc tế, áp dụng phương pháp giảng dạy
                                                hiện đại, giúp học viên tự tin giao tiếp và phát triển kỹ năng ngôn ngữ,
                                                hỗ trợ việc làm tại các doanh nghiệp nước ngoài.
                                            </p>
                                        </li>
                                        <li className={cx('content-item')}>
                                            <p>
                                                <span>Đào tạo toàn diện:</span> Hỗ trợ học viên từ việc chọn trường,
                                                ngành học cho đến đào tạo tiếng, chuẩn bị hồ sơ, visa và giúp họ hòa
                                                nhập với môi trường học tập tại các trường đại học, cao đẳng uy tín trên
                                                toàn cầu.
                                            </p>
                                        </li>
                                    </ul>

                                    <p>
                                        Chúng tôi tự hào với những thành tựu đã đạt được và luôn nỗ lực không ngừng để
                                        mang đến cho học viên những cơ hội tốt nhất.
                                        <span> Pion</span> luôn đồng hành cùng bạn trong hành trình chinh phục tri thức
                                        và phát triển sự nghiệp toàn cầu.
                                    </p>
                                </div>
                            </Col>

                            <Col
                                xs={24}
                                md={9}
                                lg={10}
                                className={cx('img-col')}
                                data-aos="fade-right"
                                data-aos-delay="400"
                            >
                                <figure className={cx('ceo')}>
                                    <Image
                                        src="/assets/img/home/ceo.jpg"
                                        alt="Nguyễn Thị Kim Danh"
                                        preview={false}
                                        className={cx('ceo-image')}
                                    />
                                    <figcaption className={cx('ceo-info')}>
                                        CEO:
                                        <span className={cx('ceo-name')}> Nguyễn Thị Kim Danh</span>
                                    </figcaption>
                                </figure>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Why choose Pion Academy */}
                <section className={cx('why-choose')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>
                            <a href="#!">Vì sao nên chọn PION?</a>
                        </h2>
                    </div>
                    <div className={cx('grid', 'why-choose-inner')}>
                        {whyChooseData.map((item, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 120}>
                                <WhyChooseItem icon={item.icon} title={item.title} description={item.description} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Courses */}
                <section className={cx('courses')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>
                            <a href="#!">Khóa học nổi bật</a>
                        </h2>
                    </div>

                    <CourseList />
                </section>

                {/* Student feedback */}
                <section id="cam-nhan-ve-hoc-vien" className={cx('feedback')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>
                            <a href="#!">Cảm nhận về học viên</a>
                        </h2>
                    </div>
                    <div className={cx('feedback-inner')}>
                        {/* <figure className={cx('feedback-media')}>
                            <div
                                className={cx('media-wrapper')}
                                data-aos="fade-up"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >
                                <img
                                    src="/assets/img/default.jpg"
                                    alt="Video cảm nhận"
                                    className={cx('media-thumb')}
                                    loading="lazy"
                                />
                                <button className={cx('btn-play')}>
                                    <FaCirclePlay size={60} />
                                </button>
                            </div>

                            <div
                                className={cx('media-wrapper')}
                                data-aos="fade-up"
                                data-aos-delay="100"
                                data-aos-once="true"
                            >
                                <img
                                    src="/assets/img/default.jpg"
                                    alt="Video cảm nhận"
                                    className={cx('media-thumb')}
                                    loading="lazy"
                                />
                                <button className={cx('btn-play')}>
                                    <FaCirclePlay size={60} />
                                </button>
                            </div>
                        </figure> */}

                        <div className={cx('feedback-body')}>
                            {/* Card feedback */}
                            {feedbacks.slice(0, visibleCount).map((item, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100} // delay động
                                    data-aos-once="true"
                                >
                                    <FeedbackCard {...item} />
                                </div>
                            ))}
                        </div>

                        {/* Button More */}
                        {loading ? (
                            <div className={cx('feedback-spin')}>
                                <Spin size="large" />
                            </div>
                        ) : visibleCount < feedbacks.length || hasExpanded ? (
                            <div className={cx('show-more-wrapper')}>
                                {visibleCount < feedbacks.length && (
                                    <Button
                                        color="default"
                                        variant="text"
                                        icon={<FaAnglesRight size={22} />}
                                        className={cx('show-more-btn')}
                                        onClick={handleShowMore}
                                    >
                                        Xem thêm cảm nhận
                                    </Button>
                                )}
                                {hasExpanded && (
                                    <Button
                                        danger
                                        color="default"
                                        className={cx('collapse-btn')}
                                        onClick={handleCollapse}
                                    >
                                        Thu gọn
                                    </Button>
                                )}
                            </div>
                        ) : null}
                    </div>
                </section>

                {/* News */}
                <section className={cx('news')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>
                            <a href="#!">Tin tức mới nhất</a>
                        </h2>
                    </div>
                    <NewsList />
                </section>
            </div>
        </div>
    );
}

export default Home;
