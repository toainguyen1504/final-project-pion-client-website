import { Collapse } from 'antd';
import classNames from 'classnames/bind';

import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './FAQ.module.scss';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

const faqData = [
    {
        key: '1',
        question: 'Làm thế nào để đăng ký khóa học?',
        answer: 'Bạn có thể đăng ký trực tuyến qua website, zalo, fanpage, hotline hoặc đến trực tiếp trung tâm để nhận tư vấn và hỗ trợ.',
    },
    {
        key: '2',
        question: 'Có chương trình ưu đãi nào cho học viên không?',
        answer: 'Trung tâm thường xuyên có các chương trình khuyến mãi, bạn có thể theo dõi trên fanpage hoặc liên hệ tư vấn viên.',
    },
    {
        key: '3',
        question: 'Thời gian học linh hoạt hay cố định?',
        answer: 'Bạn có thể chọn lịch học linh hoạt theo nhóm hoặc cá nhân, tùy theo nhu cầu và chương trình đăng ký.',
    },
    {
        key: '4',
        question: 'Học phí được thanh toán như thế nào?',
        answer: 'Học phí có thể thanh toán theo kỳ hoặc toàn khóa qua chuyển khoản ngân hàng hoặc trực tiếp tại trung tâm.',
    },
    {
        key: '5',
        question: 'Khóa học này dành cho đối tượng nào?',
        answer: 'Các khóa học được thiết kế phù hợp với từng độ tuổi và trình độ. Ví dụ, Tiếng Anh Mầm Non dành cho trẻ nhỏ, trong khi Luyện Thi HSK dành cho học viên muốn đạt chứng chỉ HSK.',
    },
    {
        key: '6',
        question: 'Thời gian học một khóa là bao lâu?',
        answer: 'Thời gian mỗi khóa học có thể từ vài tuần đến vài tháng, tùy vào nội dung và cấp độ. Thông thường, khóa Tiếng Đức A1 kéo dài khoảng 3-6 tháng.',
    },
    {
        key: '7',
        question: 'Khóa học có hình thức học online không?',
        answer: 'Có! Trung tâm cung cấp các khóa học trực tuyến như Tiếng Đức Online 1 Kèm 1, giúp học viên linh hoạt về thời gian học.',
    },
    {
        key: '8',
        question: 'Điều kiện để du học nghề tại Đức là gì?',
        answer: 'Yêu cầu cơ bản gồm: tốt nghiệp THPT, có chứng chỉ tiếng Đức tối thiểu B1, đủ điều kiện tài chính và sức khỏe.',
    },
    {
        key: '9',
        question: 'Chi phí du học nghề Đức là bao nhiêu?',
        answer: 'Du học nghề tại Đức thường miễn học phí, nhưng học viên cần có tiền bảo chứng tối thiểu khoảng 11,208€ để trang trải sinh hoạt phí.',
    },
    {
        key: '10',
        question: 'Sau khi tốt nghiệp có thể làm việc tại Đức không?',
        answer: 'Có! Du học sinh tốt nghiệp có thể xin visa làm việc và ở lại Đức với mức lương hấp dẫn.',
    },
    {
        key: '11',
        question: 'Học tiếng Hàn trước khi du học có bắt buộc không?',
        answer: 'Có! Hầu hết các trường yêu cầu TOPIK 2 trở lên. Nếu chưa có chứng chỉ, bạn cần học tiếng tại Hàn trước khi vào chuyên ngành.',
    },
    {
        key: '12',
        question: 'Chi phí du học Hàn Quốc là bao nhiêu?',
        answer: 'Tổng chi phí năm đầu dao động từ 6,000 - 10,000 USD, gồm học phí, ký túc xá và các chi phí sinh hoạt.',
    },
    {
        key: '13',
        question: 'Có học bổng cho du học sinh không?',
        answer: 'Có nhiều học bổng từ Chính phủ Hàn Quốc và các trường đại học, hỗ trợ từ 30% - 100% học phí.',
    },
    {
        key: '14',
        question: 'Điều kiện nhập học các trường đại học tại Trung Quốc là gì?',
        answer: 'Yêu cầu HSK 4 trở lên cho chương trình tiếng Trung, hoặc IELTS nếu học bằng tiếng Anh.',
    },
    {
        key: '15',
        question: 'Du học Trung Quốc có được làm thêm không?',
        answer: 'Có! Du học sinh có thể làm thêm 20 giờ/tuần theo quy định.',
    },
    {
        key: '16',
        question: 'Học bổng Chính phủ Trung Quốc có dễ xin không?',
        answer: 'Cạnh tranh cao, nhưng nếu có điểm học tập tốt và thư giới thiệu từ giáo viên, bạn có cơ hội nhận học bổng toàn phần.',
    },
];

function FAQ() {
    return (
        <section className={cx('wrapper')}>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb title={'Câu hỏi thường gặp'} />
            </div>
            <HeadingStar title="Câu hỏi thường gặp" color="var(--primary)" />
            <Collapse accordion className={cx('faq-list')} size="large">
                {faqData.map((faq) => (
                    <Panel header={faq.question} key={faq.key}>
                        <p>{faq.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </section>
    );
}

export default FAQ;
