import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { FaBookOpen, FaHandshake, FaFileInvoiceDollar } from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { Row, Col } from 'antd';

import HeadingSection from '@/components/HeadingSection';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const departments = [
    {
        title: 'PHÒNG HỌC THUẬT – TIẾNG ANH',
        subTitle: 'Xây dựng nền tảng tiếng Anh chuẩn quốc tế',
        description:
            'Phòng Học Thuật – Tiếng Anh chịu trách nhiệm thiết kế và triển khai chương trình đào tạo tiếng Anh chất lượng cao, đảm bảo học viên đạt kết quả tốt nhất.',
        points: [
            'Trưởng bộ môn Tiếng Anh: Chịu trách nhiệm định hướng chương trình đào tạo, quản lý đội ngũ giáo viên và đảm bảo chất lượng giảng dạy.',
            'Giáo viên: Giảng dạy theo chương trình chuẩn quốc tế, luôn đổi mới phương pháp nhằm mang đến hiệu quả học tập tối ưu.',
            'Trợ giảng: Hỗ trợ giáo viên trong quá trình giảng dạy, theo dõi tiến độ học tập và hỗ trợ học viên trong quá trình học.',
        ],
        icon: <FaBookOpen size={36} />,
        summary:
            'Chúng tôi cam kết mang đến chương trình học tiếng Anh chuyên nghiệp, giúp học viên tự tin hội nhập và phát triển.',
    },
    {
        title: 'PHÒNG HỌC THUẬT – TIẾNG TRUNG',
        subTitle: 'Chương trình đào tạo tiếng Trung chuẩn du học – nghề nghiệp',
        description:
            'Phòng Học Thuật – Tiếng Trung thiết kế và triển khai các chương trình học sát thực tế, đáp ứng nhu cầu du học và làm việc của học viên.',
        points: [
            'Trưởng bộ môn Tiếng Trung: Định hướng và quản lý chất lượng chương trình giảng dạy tiếng Trung.',
            'Giáo viên: Giảng dạy theo phương pháp hiện đại, giúp học viên nhanh chóng đạt trình độ tiếng Trung mục tiêu.',
            'Trợ giảng: Hỗ trợ giảng dạy, kèm cặp học viên và đảm bảo tiến độ học tập.',
        ],
        icon: <GiOpenBook size={36} />,
        summary:
            'Chúng tôi mang đến giải pháp học tiếng Trung hiệu quả, sát thực tế, giúp học viên tự tin chinh phục mục tiêu học tập và nghề nghiệp.',
    },
    {
        title: 'PHÒNG KINH DOANH',
        subTitle: 'Phát triển thị trường – Nâng tầm dịch vụ',
        description:
            'Phòng Kinh Doanh lên kế hoạch phát triển thị trường, tư vấn khóa học và chương trình du học, phối hợp các phòng ban nhằm nâng cao trải nghiệm học viên.',
        points: [
            'Trưởng phòng Kinh doanh: Quản lý, điều phối và chịu trách nhiệm về hoạt động kinh doanh của trung tâm.',
            'Chuyên viên tư vấn khóa học: Tư vấn chương trình tiếng Anh, tiếng Trung phù hợp với nhu cầu học viên.',
            'Chuyên viên tư vấn du học: Giới thiệu và tư vấn các chương trình du học phù hợp.',
        ],
        icon: <FaHandshake size={36} />,
        summary: 'Chúng tôi luôn nỗ lực mang lại dịch vụ tư vấn tận tâm và giải pháp học tập tối ưu cho học viên.',
    },
    {
        title: 'PHÒNG HÀNH CHÍNH – KẾ TOÁN',
        subTitle: 'Hậu phương vững chắc – Vận hành hiệu quả',
        description:
            'Phòng Hành chính – Kế toán chịu trách nhiệm quản lý công tác hành chính, tài chính và nhân sự, tạo nền tảng ổn định cho sự phát triển của trung tâm.',
        points: [
            'Trưởng phòng Hành chính – Kế toán: Điều phối các hoạt động hành chính, kế toán và nhân sự.',
            'Chuyên viên xử lý hồ sơ: Quản lý hồ sơ, thủ tục và văn bản nội bộ.',
            'Hành chính – Nhân sự: Thực hiện công tác tuyển dụng, quản lý chế độ và đào tạo nội bộ.',
        ],
        icon: <FaFileInvoiceDollar size={36} />,
        summary:
            'Chúng tôi cam kết mang đến sự minh bạch, chính xác trong quản lý tài chính và hiệu quả trong công tác nhân sự – hành chính.',
    },
];

const Departments = () => {
    return (
        <section className={cx('departments')}>
            <HeadingSection title="CÁC PHÒNG BAN" />

            <Row gutter={[24, 24]}>
                {departments.map((dept, index) => (
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        key={index}
                        data-aos="zoom-in"
                        data-aos-delay="100"
                        data-aos-duration="600"
                    >
                        <div className={cx('card')}>
                            <div className={cx('card-header')}>
                                <span className={cx('icon')}>{dept.icon}</span>
                                <Tippy content={dept.title}>
                                    <h3 className={cx('card-title')}>{dept.title}</h3>
                                </Tippy>
                            </div>
                            <p className={cx('sub-title')}>{dept.subTitle}</p>
                            <div className={cx('content')}>
                                <p className={cx('description')}>{dept.description}</p>
                                <ul className={cx('points')}>
                                    {dept.points.map((point, i) => (
                                        <li key={i}>
                                            <p>
                                                <span>{point.split(':')[0]}:</span>
                                                {point.split(':')[1]}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className={cx('summary')}>{dept.summary}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default Departments;
