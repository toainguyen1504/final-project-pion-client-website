import { Collapse } from 'antd';
import classNames from 'classnames/bind';

import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './FAQ.module.scss';

const cx = classNames.bind(styles);

const faqItems = [
    {
        key: 'faq_1',
        label: 'Làm thế nào để đăng ký khóa học?',
        children: (
            <p>
                Bạn có thể đăng ký trực tuyến qua website, zalo, fanpage, hotline hoặc đến trực tiếp trung tâm để nhận
                tư vấn và hỗ trợ.
            </p>
        ),
    },
    {
        key: 'faq_2',
        label: 'Có chương trình ưu đãi nào cho học viên không?',
        children: (
            <p>
                Trung tâm thường xuyên có các chương trình khuyến mãi, bạn có thể theo dõi trên fanpage hoặc liên hệ tư
                vấn viên.
            </p>
        ),
    },
    {
        key: 'faq_3',
        label: 'Thời gian học linh hoạt hay cố định?',
        children: (
            <p>Bạn có thể chọn lịch học linh hoạt theo nhóm hoặc cá nhân, tùy theo nhu cầu và chương trình đăng ký.</p>
        ),
    },
    {
        key: 'faq_4',
        label: 'Học phí được thanh toán như thế nào?',
        children: (
            <p>
                Học phí có thể thanh toán theo kỳ hoặc toàn khóa qua chuyển khoản ngân hàng hoặc trực tiếp tại trung
                tâm.
            </p>
        ),
    },
    {
        key: 'faq_5',
        label: 'Khóa học này dành cho đối tượng nào?',
        children: (
            <p>
                Các khóa học được thiết kế phù hợp với từng độ tuổi và trình độ. Ví dụ, Tiếng Anh Mầm Non dành cho trẻ
                nhỏ, trong khi Luyện Thi HSK dành cho học viên muốn đạt chứng chỉ HSK.
            </p>
        ),
    },
    {
        key: 'faq_6',
        label: 'Thời gian học một khóa là bao lâu?',
        children: (
            <p>
                Thời gian mỗi khóa học có thể từ vài tuần đến vài tháng, tùy vào nội dung và cấp độ. Thông thường, khóa
                Tiếng Đức A1 kéo dài khoảng 3-6 tháng.
            </p>
        ),
    },
    {
        key: 'faq_7',
        label: 'Khóa học có hình thức học online không?',
        children: (
            <p>
                Có! Trung tâm cung cấp các khóa học trực tuyến như Tiếng Đức Online 1 Kèm 1, giúp học viên linh hoạt về
                thời gian học.
            </p>
        ),
    },
    {
        key: 'faq_8',
        label: 'Điều kiện để du học nghề tại Đức là gì?',
        children: (
            <p>
                Yêu cầu cơ bản gồm: tốt nghiệp THPT, có chứng chỉ tiếng Đức tối thiểu B1, đủ điều kiện tài chính và sức
                khỏe.
            </p>
        ),
    },
    {
        key: 'faq_9',
        label: 'Chi phí du học nghề Đức là bao nhiêu?',
        children: (
            <p>
                Du học nghề tại Đức thường miễn học phí, nhưng học viên cần có tiền bảo chứng tối thiểu khoảng 11,208€
                để trang trải sinh hoạt phí.
            </p>
        ),
    },
    {
        key: 'faq_10',
        label: 'Sau khi tốt nghiệp có thể làm việc tại Đức không?',
        children: <p>Có! Du học sinh tốt nghiệp có thể xin visa làm việc và ở lại Đức với mức lương hấp dẫn.</p>,
    },
    {
        key: 'faq_11',
        label: 'Học tiếng Hàn trước khi du học có bắt buộc không?',
        children: (
            <p>
                Có! Hầu hết các trường yêu cầu TOPIK 2 trở lên. Nếu chưa có chứng chỉ, bạn cần học tiếng tại Hàn trước
                khi vào chuyên ngành.
            </p>
        ),
    },
    {
        key: 'faq_12',
        label: 'Chi phí du học Hàn Quốc là bao nhiêu?',
        children: (
            <p>Tổng chi phí năm đầu dao động từ 6,000 - 10,000 USD, gồm học phí, ký túc xá và các chi phí sinh hoạt.</p>
        ),
    },
    {
        key: 'faq_13',
        label: 'Có học bổng cho du học sinh không?',
        children: <p>Có nhiều học bổng từ Chính phủ Hàn Quốc và các trường đại học, hỗ trợ từ 30% - 100% học phí.</p>,
    },
    {
        key: 'faq_14',
        label: 'Điều kiện nhập học các trường đại học tại Trung Quốc là gì?',
        children: <p>Yêu cầu HSK 4 trở lên cho chương trình tiếng Trung, hoặc IELTS nếu học bằng tiếng Anh.</p>,
    },
    {
        key: 'faq_15',
        label: 'Du học Trung Quốc có được làm thêm không?',
        children: <p>Có! Du học sinh có thể làm thêm 20 giờ/tuần theo quy định.</p>,
    },
    {
        key: 'faq_16',
        label: 'Học bổng Chính phủ Trung Quốc có dễ xin không?',
        children: (
            <p>
                Cạnh tranh cao, nhưng nếu có điểm học tập tốt và thư giới thiệu từ giáo viên, bạn có cơ hội nhận học
                bổng toàn phần.
            </p>
        ),
    },
];

function FAQ() {
    return (
        <section className={cx('wrapper')}>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb title={'Câu hỏi thường gặp'} />
            </div>
            <HeadingStar title="Câu hỏi thường gặp" color="var(--primary)" />
            <Collapse accordion className={cx('faq-list')} size="large" items={faqItems} />
        </section>
    );
}

export default FAQ;
