// src/pages/About/EnglishCourseTables.jsx
import React from 'react';
import CustomTable from '@/components/CustomTable';

const tableConfigs = {
    // khóa tiếng anh tiểu học
    'tieng-anh-tieu-hoc': {
        title: '',
        columns: [
            { title: 'Cấp Độ', dataIndex: 'level', key: 'level', align: 'center' },
            { title: <>Giáo&nbsp;Trình</>, dataIndex: 'curriculum', key: 'curriculum', align: 'center' },
            { title: <>Trình Độ Tương&nbsp;Ứng</>, dataIndex: 'equivalent', key: 'equivalent', align: 'center' },
            { title: 'Thời Gian Học', dataIndex: 'duration', key: 'duration', align: 'center' },
            {
                title: 'Mục Tiêu Chính',
                dataIndex: 'objective',
                key: 'objective',
                align: 'center',
                render: (text) => <span style={{ whiteSpace: 'pre-line' }}>{text}</span>,
            },
        ],
        data: [
            {
                key: 1,
                level: '1',
                curriculum: 'Share It 0',
                equivalent: 'Starters',
                duration: '12 tháng',
                objective: 'Làm quen tiếng Anh, phản xạ nghe – nói tự nhiên',
            },
            {
                key: 2,
                level: '2',
                curriculum: 'Share It 1',
                equivalent: 'Starters',
                duration: '12 tháng',
                objective: 'Học từ vựng và mẫu câu đơn giản, nói về bản thân và gia đình',
            },
            {
                key: 3,
                level: '3',
                curriculum: 'Share It 2',
                equivalent: 'Starters',
                duration: '12 tháng',
                objective: 'Tăng cường giao tiếp, luyện kỹ năng đọc – viết cơ bản',
            },
            {
                key: 4,
                level: '4',
                curriculum: 'Share It 3',
                equivalent: 'Movers',
                duration: '12 tháng',
                objective: 'Phát triển câu dài hơn, làm quen ngữ pháp và viết đoạn ngắn',
            },
            {
                key: 5,
                level: '5',
                curriculum: 'Share It 4',
                equivalent: 'Movers',
                duration: '12 tháng',
                objective: 'Tự tin nói về sở thích, hoạt động hằng ngày, môi trường xung quanh',
            },
            {
                key: 6,
                level: '6',
                curriculum: 'Share It 5',
                equivalent: 'Flyers',
                duration: '12 tháng',
                objective: 'Luyện kỹ năng tư duy và diễn đạt phức tạp hơn',
            },
            {
                key: 7,
                level: '7',
                curriculum: 'Share It 6',
                equivalent: 'Flyers',
                duration: '12 tháng',
                objective: 'Hoàn thiện 4 kỹ năng, sẵn sàng cho Cambridge Flyers và bậc THCS',
            },
        ],
    },

    // khóa tiếng anh giao tiếp
    'tieng-anh-giao-tiep': {
        title: '',
        columns: [
            { title: 'Cấp Độ', dataIndex: 'level', key: 'level', align: 'center' },
            { title: <>Giáo&nbsp;Trình</>, dataIndex: 'curriculum', key: 'curriculum', align: 'center' },
            { title: <>Trình Độ Tương&nbsp;Ứng</>, dataIndex: 'equivalent', key: 'equivalent', align: 'center' },
            { title: 'Thời Gian Học', dataIndex: 'duration', key: 'duration', align: 'center' },
            {
                title: 'Mục Tiêu Chính',
                dataIndex: 'objective',
                key: 'objective',
                align: 'center',
                render: (text) => <span style={{ whiteSpace: 'pre-line' }}>{text}</span>,
            },
        ],
        data: [
            {
                key: 1,
                level: '1',
                curriculum: 'Prepare 1',
                equivalent: 'A1',
                duration: '9–12 tháng',
                objective: 'Làm quen giao tiếp cơ bản, từ vựng và mẫu câu đơn giản.',
            },

            // A2
            {
                key: 2,
                level: '2',
                curriculum: 'Prepare 2',
                equivalent: 'A2',
                duration: '9–12 tháng',
                objective: 'Mở rộng vốn từ, giao tiếp về các chủ đề quen thuộc.',
            },
            {
                key: 3,
                level: '3',
                curriculum: 'Prepare 3',
                equivalent: 'A2',
                duration: '9–12 tháng',
                objective: 'Tăng phản xạ nói, viết đoạn ngắn, nghe – hiểu văn bản cơ bản.',
            },

            // B1
            {
                key: 4,
                level: '4',
                curriculum: 'Prepare 4',
                equivalent: 'B1',
                duration: '9–12 tháng',
                objective: 'Giao tiếp tự tin, viết bài luận ngắn, phát triển kỹ năng thuyết trình.',
            },
            {
                key: 5,
                level: '5',
                curriculum: 'Prepare 5',
                equivalent: 'B1',
                duration: '9–12 tháng',
                objective: 'Củng cố ngữ pháp, phản xạ tự nhiên, hiểu các nội dung học thuật đơn giản.',
            },

            // B2
            {
                key: 6,
                level: '6',
                curriculum: 'Prepare 6',
                equivalent: 'B2',
                duration: '9–12 tháng',
                objective: 'Củng cố ngữ pháp, phản xạ tự nhiên, hiểu các nội dung học thuật đơn giản.',
            },
            {
                key: 7,
                level: '7',
                curriculum: 'Prepare 7',
                equivalent: 'B2',
                duration: '9–12 tháng',
                objective: 'Củng cố ngữ pháp, phản xạ tự nhiên, hiểu các nội dung học thuật đơn giản.',
            },
        ],
    },
};

const EnglishCourseTable = ({ slug }) => {
    const config = tableConfigs[slug];
    if (!config) return null;

    return <CustomTable title={config.title} columns={config.columns} data={config.data} />;
};

export default EnglishCourseTable;
