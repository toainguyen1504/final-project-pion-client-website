import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { Row, Col } from 'antd';

import styles from './About.module.scss';
// import { BookOutlined, GlobalOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';
import { MdFlightTakeoff, MdGavel, MdSchool } from 'react-icons/md';
import { LiaSchoolSolid } from 'react-icons/lia';

const cx = classNames.bind(styles);

const departments = [
    {
        title: 'Trung Tâm Đào Tạo',
        subTitle: 'Kiến tạo tri thức – Chắp cánh tương lai',
        description:
            'Trung tâm đào tạo bao gồm ba bộ phận chuyên trách, hoạt động đồng bộ để mang lại trải nghiệm học tập hoàn hảo cho học viên:',
        points: [
            'Giáo viên: Đội ngũ giảng viên giàu kinh nghiệm, chuyên môn vững vàng, luôn sáng tạo và tận tâm trong từng bài giảng, giúp học viên tiếp thu kiến thức một cách hiệu quả và sâu sắc.',
            'Giáo vụ: Bộ phận giáo vụ đảm nhiệm việc quản lý học viên, tổ chức lịch học hợp lý và hỗ trợ giải quyết mọi vấn đề trong quá trình học tập, đảm bảo tiến độ và chất lượng đào tạo.',
            'Tư vấn tuyển sinh - Chăm sóc khách hàng: Chuyên viên tư vấn cung cấp thông tin chi tiết về các khóa học, giúp học viên lựa chọn chương trình phù hợp, đồng thời hỗ trợ với các chương trình ưu đãi và dịch vụ chăm sóc chu đáo, mang lại sự hài lòng tối đa.',
        ],
        icon: <LiaSchoolSolid size={36} />,
        summary:
            'Chúng tôi cam kết mang đến môi trường học tập chuyên nghiệp, chất lượng cao và luôn nỗ lực đáp ứng mọi nhu cầu học viên, giúp họ vững bước trên con đường phát triển tương lai.',
    },
    {
        title: 'Phòng Du Học',
        subTitle: 'Mở rộng cơ hội, chắp cánh ước mơ!',
        description:
            'Phòng du học mang đến những cơ hội học tập quốc tế hàng đầu, với đội ngũ chuyên gia giàu kinh nghiệm, tận tâm đồng hành cùng bạn trên hành trình chinh phục ước mơ học tập và phát triển bản thân. Các bộ phận chuyên trách:',
        points: [
            'Chuyên viên tư vấn du học: Tư vấn chuyên sâu, giúp bạn lựa chọn chương trình học và điểm đến du học phù hợp với nguyện vọng, khả năng tài chính và mục tiêu nghề nghiệp.',
            'Chuyên viên xử lý hồ sơ du học: Đảm bảo hồ sơ du học của bạn được chuẩn bị đầy đủ, chính xác, từ thủ tục visa đến các yêu cầu từ các trường quốc tế.',
            'Chuyên viên phát triển thị trường ngoại: Nghiên cứu và mở rộng mạng lưới đối tác quốc tế, mang đến nhiều lựa chọn học tập tại các tổ chức giáo dục uy tín toàn cầu.',
        ],
        icon: <MdSchool size={36} />,
        summary:
            'Chúng tôi cam kết mang lại cho bạn một hành trình du học thành công và hỗ trợ tối đa, giúp bạn xây dựng tương lai với những cơ hội học tập quốc tế đẳng cấp.',
    },
    {
        title: 'Xuất Khẩu Lao Động',
        subTitle: 'Vươn xa, chạm đỉnh tương lai!',
        description:
            'Phòng xuất khẩu lao động mang đến cơ hội làm việc tại các thị trường quốc tế, với đội ngũ chuyên gia giàu kinh nghiệm, luôn đồng hành cùng bạn trong hành trình xuất khẩu lao động. Các bộ phận chuyên trách:',
        points: [
            'Chuyên viên tư vấn – sales: Tư vấn chi tiết về cơ hội việc làm, ngành nghề và mức lương tại các quốc gia, giúp bạn chọn công việc phù hợp với kỹ năng và mục tiêu.',
            'Chuyên viên xử lý hồ sơ: Hỗ trợ hoàn thiện hồ sơ, thủ tục visa, hợp đồng lao động và các giấy tờ pháp lý, đảm bảo hồ sơ của bạn chính xác và đầy đủ.',
            'Chuyên viên phát triển thị trường ngoại: Tìm kiếm và phát triển đối tác quốc tế, mở rộng cơ hội làm việc tại các thị trường lao động uy tín.',
        ],
        icon: <MdFlightTakeoff size={36} />,
        summary:
            'Với mạng lưới đối tác rộng khắp và quy trình hỗ trợ chuyên nghiệp, chúng tôi giúp bạn chinh phục thị trường lao động quốc tế, mở ra cơ hội phát triển sự nghiệp toàn cầu.',
    },
    {
        title: 'Hành Chính Tổng Hợp',
        subTitle: 'Nền tảng vững mạnh, phát triển bền vững!',
        description:
            'Phòng Hành chính tổng hợp đảm nhận các nhiệm vụ quan trọng, tạo nền tảng vững chắc cho sự phát triển và hoạt động hiệu quả của công ty. Các bộ phận chuyên trách:',
        points: [
            'Kế toán: Quản lý tài chính, lập báo cáo định kỳ, đảm bảo giao dịch tài chính và kê khai thuế chính xác, kịp thời. Giám sát và kiểm soát thu chi nội bộ công ty, đảm bảo sự minh bạch và hiệu quả tài chính.',
            'Hành chính nhân sự: Quản lý các hoạt động hành chính, tuyển dụng và phát triển nhân sự. Đảm bảo quyền lợi cho nhân viên, xây dựng và triển khai kế hoạch đào tạo định kỳ, nâng cao năng lực cho đội ngũ nhân sự.',
            'Pháp chế - pháp lý: Đảm bảo hoạt động của công ty tuân thủ đúng quy định pháp luật, tư vấn và giải quyết các vấn đề pháp lý.',
        ],
        icon: <MdGavel size={36} />,
        summary:
            'Chúng tôi không ngừng nâng cao chất lượng quản lý và tối ưu hóa quy trình làm việc, tạo điều kiện thuận lợi để doanh nghiệp phát triển bền vững.',
    },
];

const Departments = () => {
    return (
        <section className={cx('departments')}>
            <div className={cx('heading-section')}>
                <h2 className={cx('title-section', 'uppercase')}>CÁC PHÒNG BAN</h2>
            </div>

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
