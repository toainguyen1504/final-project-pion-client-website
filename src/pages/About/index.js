import AOS from 'aos';
import 'aos/dist/aos.css';
import classNames from 'classnames/bind';
// import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { FaHandshake, FaBalanceScale, FaHandHoldingHeart } from 'react-icons/fa';
import { GiHumanTarget } from 'react-icons/gi';
import { FaCirclePlay } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';

import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import ZigzagSection from '@/components/ZigzagSection';
import TeacherCard from '@/components/TeacherCard';
import CoreValuesSlider from './CoreValuesSlider';
import CeoInfo from './CeoInfo';
import Departments from './Departments';
// Css
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const teacherData = [
    {
        image: '/assets/img/about/teacher_01.png',
        name: 'Cô Melinda',
        qualifications: [
            'Cử nhân giáo dục Tiểu học  & TESOL',
            'Kinh nghiệm 7 năm',
            'Giáo viên nước ngoài - Philippines',
        ],
    },
    {
        image: '/assets/img/about/teacher_02.png',
        name: 'Cô Madina',
        qualifications: ['Cử nhân ngôn ngữ học và giảng dạy tiếng Anh', 'Kinh nghiệm: 9 năm', 'Giáo viên nước ngoài'],
    },
    {
        image: '/assets/img/about/teacher_05.png',
        name: 'Cô Rita',
        qualifications: ['IELTS Speaking & lớp thiếu nhi', 'Kinh nghiệm: 10 năm', 'Giáo viên nước ngoài'],
    },
    {
        image: '/assets/img/about/teacher_03.png',
        name: 'Cô Phạm Thị Út Ảnh',
        qualifications: [
            'Cử nhân ngôn ngữ Anh, chuyên ngành giảng dạy tiếng Anh cho bậc Tiểu học',
            'Kinh nghiệm: 1 năm',
            'Giáo viên Việt Nam',
        ],
    },
    {
        image: '/assets/img/about/teacher_04.png',
        name: 'Cô Huỳnh Thị Thanh Quý',
        qualifications: ['Cử nhân ngôn ngữ Anh, nghiệp vụ sư phạm', 'Kinh nghiệm: 1 năm', 'Giáo viên Việt Nam'],
    },
    {
        image: '/assets/img/about/teacher_06.png',
        name: 'Cô Đỗ Thị Uyên',
        qualifications: [
            'Giáo viên tiếng Trung',
            'Tốt nghiệp đại học - chuyên ngành ngôn ngữ TQ, Trường ĐH Mở TPHCM',
            'Kinh nghiệm: 2 năm',
        ],
    },
    {
        image: '/assets/img/about/teacher_07.png',
        name: 'Cô Cleo Edelyn Larot',
        qualifications: [
            'Giáo viên nước ngoài - Philippines',
            'Cử nhân Giáo dục Tiểu học, chuyên ngành Giáo dục học & TESOL',
            'Kinh nghiệm: 3 năm',
        ],
    },
    {
        image: '/assets/img/about/teacher_08.png',
        name: 'Cô Ivy Paragama',
        qualifications: [
            'Giáo viên nước ngoài - Philippines',
            'Cử nhân Giáo dục Tiểu học & Chứng chỉ TESOL',
            'Kinh nghiệm: 4 năm',
        ],
    },
];

const visionMissionData = [
    {
        title: 'Tầm Nhìn',
        content:
            'Pion hướng đến trở thành công ty giáo dục hàng đầu chuyên cung cấp dịch vụ đào tạo ngôn ngữ và tư vấn du học. Chúng tôi mong muốn mở rộng hợp tác quốc tế, tạo cơ hội kết nối học viên với hệ thống giáo dục toàn cầu. Bên cạnh đó, việc ứng dụng công nghệ tiên tiến vào quá trình giảng dạy sẽ giúp nâng cao chất lượng đào tạo. Chúng tôi cam kết đóng góp vào việc phát triển nguồn nhân lực Việt Nam, giúp họ vươn ra thế giới và hội nhập thành công.',
        imageUrl: '/assets/img/about/vision.jpg',
    },
    {
        title: 'Sứ Mệnh',
        content:
            'Pion cung cấp các giải pháp đào tạo ngôn ngữ và tư vấn du học chất lượng cao, giúp học viên phát triển kỹ năng ngôn ngữ và tự tin hội nhập vào cộng đồng quốc tế. Chúng tôi kết nối học viên với những cơ hội giáo dục và nghề nghiệp toàn cầu, đồng thời xây dựng một hệ sinh thái giáo dục hiện đại, tiên phong trong lĩnh vực đào tạo ngôn ngữ. Chúng tôi cam kết không ngừng tìm kiếm và mang đến cho học viên những gói học bổng giá trị cao, mở rộng cơ hội học tập và phát triển trên toàn thế giới.',
        imageUrl: '/assets/img/about/mission.jpg',
    },
];

const coreValuesData = [
    {
        icon: <GiHumanTarget size={32} />,
        title: 'NHÂN',
        description: 'Lấy con người làm trung tâm, xây dựng cộng đồng học tập gắn kết, tôn trọng và hỗ trợ lẫn nhau.',
    },
    {
        icon: <FaHandHoldingHeart size={32} />,
        title: 'TÂM',
        description: 'Tận tâm, chân thành, luôn chăm sóc học viên như người thân để giúp họ đạt mục tiêu học tập.',
    },
    {
        icon: <FaBalanceScale size={32} />,
        title: 'ĐỨC',
        description: 'Trung thực, trách nhiệm và đạo đức, xây dựng môi trường học tập lành mạnh và công bằng.',
    },
    {
        icon: <FaHandshake size={32} />,
        title: 'TÍN',
        description: 'Cam kết minh bạch, giữ vững uy tín và tạo dựng niềm tin với học viên, phụ huynh và đối tác.',
    },
];

function About() {
    const [isPlaying, setIsPlaying] = useState(false);

    // const handleContactSubmit = (data) => {
    //     console.log('Dữ liệu gửi đi:', data);
    //     // API
    // };

    const handlePlay = () => {
        setTimeout(() => {
            setIsPlaying(true);
            const videoElement = document.getElementById('about-video');
            if (videoElement) {
                videoElement.muted = false;
                videoElement.play();
            }
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
        <>
            <Helmet>
                <title>Giới thiệu | PION</title>
            </Helmet>
            <div className={cx('about')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title={'Về Pion'} />
                </div>

                <section className={cx('about-desc')}>
                    <div className={cx('about-wrapper')}>
                        <figure className={cx('about-media')} data-aos="fade-left" data-aos-delay="200">
                            {!isPlaying ? (
                                <div className={cx('video-thumbnail')} onClick={handlePlay}>
                                    <img
                                        src="/assets/img/about/thumbnail.jpg"
                                        alt="Pion"
                                        className={cx('media-thumb')}
                                        loading="lazy"
                                    />
                                    <button className={cx('btn-play')}>
                                        <FaCirclePlay size={60} />
                                    </button>
                                </div>
                            ) : (
                                <video
                                    id="about-video"
                                    src="/assets/video/new_about_us.mp4"
                                    controls
                                    autoPlay
                                    loop
                                    playsInline
                                    className={cx('video-element')}
                                />
                            )}
                        </figure>
                        <div className={cx('about-content')} data-aos="fade-right" data-aos-delay="200">
                            <h1>Về Chúng Tôi</h1>
                            <p className={cx('desc')}>
                                <span>Pion</span> là một công ty giáo dục chuyên cung cấp các dịch vụ đào tạo ngôn ngữ
                                chất lượng cao và tư vấn du học. Công ty kết hợp đào tạo ngôn ngữ với định hướng du học
                                chuyên nghiệp, mang lại một lợi thế cạnh tranh độc đáo.
                            </p>
                            <p className={cx('desc')}>
                                Trung tâm ngoại ngữ Pion Academy được thành lập vào năm 2022 và đã được Sở giáo dục và
                                Đào tạo cấp phép hoạt động số 538/QĐ-SGDĐT
                            </p>
                            <p className={cx('desc')}>
                                Sau 3 năm nỗ lực không ngừng nghỉ, công ty đã đạt được nhiều thành tựu quan trọng. Đặc
                                biệt, vào năm 2025, chúng tôi đã mở rộng thêm lĩnh vực du học tại Trung Quốc và Đài
                                Loan, đồng thời trở thành đối tác tin cậy của nhiều trường đại học danh tiếng tại hai
                                quốc gia này, mở ra nhiều cơ hội học tập và phát triển cho học viên.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CEO Info*/}
                <section className={cx('ceo-info')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>CEO</h2>
                    </div>
                    <CeoInfo />
                </section>

                {/* Teachers*/}
                <section className={cx('teachers')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>Đội ngũ giáo viên</h2>
                    </div>

                    <div className={cx('teacher-list')}>
                        {teacherData.map((teacher, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <TeacherCard
                                    image={teacher.image || '/assets/img/default.jpg'}
                                    name={teacher.name}
                                    qualifications={teacher.qualifications}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Departments */}
                <Departments />

                {/*  VisionMission */}
                <section>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>Tầm Nhìn và Sứ mệnh</h2>
                    </div>
                    <ZigzagSection items={visionMissionData} />
                </section>

                {/* Core Values */}
                <section className={cx('slider-wrapper')}>
                    <div className={cx('heading-section')}>
                        <h2 className={cx('title-section', 'uppercase')}>Giá trị cốt lõi</h2>
                    </div>

                    <CoreValuesSlider data={coreValuesData} interval={6000} />
                </section>

                {/* Question */}
                <section className={cx('question-wrapper')}></section>

                {/* Contact */}
                <section className={cx('contact-wrapper')}>
                    <ContactForm />
                </section>
            </div>
        </>
    );
}

export default About;
