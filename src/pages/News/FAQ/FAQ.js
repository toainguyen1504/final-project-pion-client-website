import { Collapse } from 'antd';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './FAQ.module.scss';

const cx = classNames.bind(styles);

const faqItems = [
    {
        key: 'faq_1',
        label: 'Làm thế nào để đăng ký khóa học Tiếng Anh hoặc Tiếng Trung?',
        children: (
            <p>
                Bạn có thể đăng ký trực tuyến qua website, Zalo, fanpage, hotline hoặc đến trực tiếp trung tâm để nhận
                tư vấn và hỗ trợ.
            </p>
        ),
    },
    {
        key: 'faq_2',
        label: 'Có chương trình ưu đãi nào cho học viên Tiếng Anh, Tiếng Trung không?',
        children: (
            <p>
                Trung tâm thường xuyên có các chương trình khuyến mãi, giảm học phí, tặng giáo trình. Bạn có thể theo
                dõi trên fanpage hoặc liên hệ tư vấn viên để biết chi tiết.
            </p>
        ),
    },
    {
        key: 'faq_3',
        label: 'Thời gian học có linh hoạt không?',
        children: (
            <p>Bạn có thể chọn lịch học linh hoạt theo nhóm hoặc cá nhân, phù hợp với nhu cầu và trình độ của mình.</p>
        ),
    },
    {
        key: 'faq_4',
        label: 'Học phí được thanh toán như thế nào?',
        children: (
            <p>
                Học phí có thể thanh toán theo từng kỳ hoặc trọn khóa qua chuyển khoản ngân hàng hoặc trực tiếp tại
                trung tâm.
            </p>
        ),
    },
    {
        key: 'faq_5',
        label: 'Khóa học Tiếng Anh, Tiếng Trung dành cho đối tượng nào?',
        children: (
            <p>
                Các khóa học được thiết kế phù hợp cho mọi đối tượng: từ trẻ em, học sinh, sinh viên đến người đi làm,
                luyện thi chứng chỉ như IELTS, TOEIC, HSK.
            </p>
        ),
    },
    {
        key: 'faq_6',
        label: 'Thời gian học một khóa là bao lâu?',
        children: (
            <p>
                Mỗi khóa học thường kéo dài từ 2 đến 6 tháng tùy vào cấp độ (cơ bản, nâng cao) và mục tiêu (giao tiếp,
                luyện thi).
            </p>
        ),
    },
    {
        key: 'faq_7',
        label: 'Khóa học có hình thức online không?',
        children: (
            <p>
                Có! Trung tâm cung cấp các khóa học trực tuyến Tiếng Anh và Tiếng Trung theo hình thức học nhóm hoặc 1
                kèm 1, giúp học viên linh hoạt về thời gian và địa điểm.
            </p>
        ),
    },
    {
        key: 'faq_8',
        label: 'Điều kiện đầu vào cho khóa học Tiếng Trung là gì?',
        children: (
            <p>
                Học viên sẽ được kiểm tra trình độ đầu vào miễn phí để xếp lớp phù hợp. Không yêu cầu kiến thức nền đối
                với lớp sơ cấp.
            </p>
        ),
    },
    {
        key: 'faq_9',
        label: 'Khóa học có hỗ trợ luyện thi chứng chỉ không?',
        children: (
            <p>
                Có! Trung tâm có các khóa luyện thi chứng chỉ quốc tế như IELTS, TOEIC, HSK với giáo viên giàu kinh
                nghiệm.
            </p>
        ),
    },
    {
        key: 'faq_10',
        label: 'Khóa học có cam kết đầu ra không?',
        children: (
            <p>
                Các khóa luyện thi chứng chỉ tại trung tâm có cam kết đầu ra bằng hợp đồng, đảm bảo học viên đạt mục
                tiêu nếu tuân thủ đúng lộ trình học.
            </p>
        ),
    },
    {
        key: 'faq_11',
        label: 'Điều kiện nhập học các trường đại học tại Trung Quốc là gì?',
        children: <p>Yêu cầu HSK 4 trở lên cho chương trình tiếng Trung, hoặc IELTS nếu học bằng tiếng Anh.</p>,
    },
    {
        key: 'faq_12',
        label: 'Du học Trung Quốc có được làm thêm không?',
        children: <p>Có! Du học sinh có thể làm thêm 20 giờ/tuần theo quy định.</p>,
    },
    {
        key: 'faq_14',
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
        <>
            <Helmet>
                <title>Câu hỏi thường gặp | PION</title>
                <meta
                    name="description"
                    content="Các câu hỏi thường gặp về khóa học Tiếng Anh, Tiếng Trung và du học Trung Quốc tại PION."
                />
            </Helmet>
            <section className={cx('wrapper')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title={'Câu hỏi thường gặp'} />
                </div>
                <HeadingStar title="Câu hỏi thường gặp" color="var(--primary)" />
                <Collapse accordion className={cx('faq-list')} size="large" items={faqItems} />
            </section>
        </>
    );
}

export default FAQ;
