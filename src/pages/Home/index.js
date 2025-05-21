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

import BannerCarousel from '@/components/BannerCarousel';
import FeedbackCard from '@/components/FeedbackCard';
import WhyChooseItem from './WhyChooseItem';
import CourseList from './CourseList';
import NewsList from './NewsList';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const bannerImages = [
    '/assets/img/banner/banner_1.jpg',
    '/assets/img/banner/banner_2.jpg',
    '/assets/img/banner/banner_3.jpg',
    '/assets/img/banner/banner_4.jpg',
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
        description: 'Cung cấp các khóa học tiếng Anh, tiếng Đức, tiếng Hàn và tiếng Trung giúp bạn sẵn sàng hội nhập.',
    },
    {
        icon: <FaBookAtlas size={48} />,
        title: 'Hỗ trợ hồ sơ trọn gói',
        description:
            'Chuẩn bị giấy tờ từ A-Z: dịch thuật, hồ sơ, Visa, thủ tục pháp lý. Hỗ trợ học viên xuyên suốt quá trình nhập học và xuất cảnh.',
    },
    {
        icon: <FaPlaneDeparture size={48} />,
        title: 'Chương trình du học & XKLĐ uy tín',
        description:
            'Đối tác với các trường đại học danh tiếng tại Đức, Hàn Quốc, Trung Quốc. Cung cấp cơ hội việc làm sau tốt nghiệp với mức thu nhập hấp dẫn.',
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
        description:
            'Không chỉ đơn thuần là du học hay xuất khẩu lao động, PION giúp bạn xây dựng sự nghiệp quốc tế vững chắc.',
    },
];

const feedbackData = [
    {
        avatar: '/assets/img/students/ph_bao_tran.jpg',
        name: 'Phụ huynh bạn Bảo Trân',
        university: 'Hoài Nhơn',
        feedback:
            'Sau khi tìm hiểu rất nhiều trung tâm dạy tiếng anh trên thị trường, tôi đã lựa chọn PION vì ở đây các chi phí đều rất minh bạch, làm việc trực tiếp không qua trung gian nên tiết kiệm một khoảng nho nhỏ. Trước khi chốt, chúng tôi còn ghé qua trung tâm để xem kỹ hơn. Thấy nơi ở của các cháu sạch sẽ, an toàn, có đủ đồ phòng cháy chữa cháy, thầy cô thân thiện.. nên mới yên tâm đặt bút ký.',
    },
    {
        avatar: '/assets/img/students/phuong_bao.jpg',
        name: 'Bạn Nguyễn Lê Phương Bảo',
        university: 'Học viên (2000 - Hoài Ân)',
        feedback:
            'Em chân thành cảm ơn quý thầy cô tại trung tâm du học Pion đã tận tình giúp đỡ em trong suốt thời gian qua. Nhờ sự hướng dẫn tận tâm và kiên nhẫn của thầy cô, em đã từng bước chinh phục những thử thách và tự tin hơn trên hành trình học tập của mình. Không chỉ là nơi học tập, Pion còn là một gia đình, nơi em có những kỷ niệm đáng nhớ cùng lớp học, thầy cô, và các anh chị trong văn phòng. Những buổi học sôi nổi, những lần được thầy cô động viên, và cả những lời khuyên quý giá đã giúp em vững bước hơn trên con đường phía trước. Một lần nữa, em xin gửi lời cảm ơn chân thành đến trung tâm Pion, nơi đã giúp em phát triển và tự tin theo đuổi ước mơ!',
    },
    {
        avatar: '/assets/img/students/ph_ha_linh.jpg',
        name: 'Phụ huynh bé Hà Linh',
        university: 'Hoài Nhơn',
        feedback:
            'Tôi rất vui khi thấy con hào hứng mỗi khi đến lớp học tiếng Anh tại PION! Giáo viên luôn sử dụng phương pháp giảng dạy trực quan, kết hợp bài hát, trò chơi và hoạt động tương tác giúp bé dễ tiếp thu từ vựng. Chỉ sau vài tuần, bé đã có thể nhận diện và nói một số từ cơ bản. Tôi cảm thấy yên tâm vì con đang có một nền tảng tốt để phát triển khả năng ngoại ngữ sau này!',
    },
    {
        avatar: '/assets/img/students/tuan_anh.jpg',
        name: 'Tuấn Anh',
        university: 'Học sinh THCS',
        feedback:
            'Ban đầu mình khá lo lắng vì không tự tin với khả năng nói tiếng Anh, nhưng sau khi học tại PION, mình đã cải thiện đáng kể! Các thầy cô không chỉ dạy ngữ pháp mà còn giúp học viên luyện tập giao tiếp thực tế, phản xạ nhanh và phát âm chuẩn. Nhờ các buổi thực hành và tương tác liên tục, mình thấy tiếng Anh không còn khó như trước. Cảm ơn PION đã giúp mình có động lực học tập hơn!',
    },
    {
        avatar: '/assets/img/students/ph_minh_khang.jpg',
        name: 'Phụ huynh bé Minh Khang',
        university: 'Hoài Nhơn',
        feedback:
            'Tôi thật sự hài lòng với khóa học tiếng Anh tại PION dành cho trẻ. Bé nhà tôi vốn nhút nhát, ngại giao tiếp nhưng sau một thời gian học tại trung tâm, con đã trở nên tự tin hơn, có thể chủ động nói những câu tiếng Anh đơn giản mà không e ngại. Giáo viên luôn tận tâm, kiên nhẫn và có phương pháp giảng dạy sinh động, giúp bé thích thú học tập mỗi ngày. Đặc biệt, các hoạt động ngoại khóa và trò chơi tương tác đã giúp con học tiếng Anh một cách tự nhiên và hiệu quả. Xin cảm ơn trung tâm đã giúp con tiến bộ rõ rệt!',
    },
    {
        avatar: '/assets/img/students/thu_huyen.jpg',
        name: 'Bạn Nguyễn Thu Huyền',
        university: 'Sinh viên Đại học Hankuk',
        feedback:
            'Em từng trượt ở 1 trung tâm khác và đã quyết định gửi lại hồ sơ vào PION. Cảm ơn trung tâm đã giúp đỡ em rất nhiều. Bởi với em khoảng thời gian đó thực sự khó khăn, em mất niềm tin vào bản thân và từng nghĩ mình là kẻ thất bại. Cảm ơn cô giáo, cảm ơn chị Nhung và chị sale đã luôn động viên em ạ!',
    },
];

const MAX_FEEDBACK_VISIBLE = 4;

function Home() {
    const [visibleCount, setVisibleCount] = useState(MAX_FEEDBACK_VISIBLE);
    const [loading, setLoading] = useState(false);

    const handleShowMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + 6);
            setLoading(false);
        }, 300);
    };

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
                                        Tại <span>Pion Corporation</span>, chúng tôi tin rằng giáo dục là chìa khóa để
                                        mở ra cánh cửa tương lai. Với mô hình
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
                                        <span> Pion Corporation </span> luôn đồng hành cùng bạn trong hành trình chinh
                                        phục tri thức và phát triển sự nghiệp toàn cầu.
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
                            {feedbackData.slice(0, visibleCount).map((item, index) => (
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
                        ) : (
                            visibleCount < feedbackData.length && (
                                <div className={cx('show-more-wrapper')}>
                                    <Button
                                        color="default"
                                        variant="text"
                                        icon={<FaAnglesRight size={22} />}
                                        className={cx('show-more-btn')}
                                        onClick={handleShowMore}
                                    >
                                        Xem thêm cảm nhận
                                    </Button>
                                </div>
                            )
                        )}
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
