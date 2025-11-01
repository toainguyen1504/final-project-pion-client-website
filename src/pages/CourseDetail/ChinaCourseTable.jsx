import CustomTable from '@/components/CustomTable';

const tableConfigs = {
    // khóa tiếng trung trẻ em
    'tieng-trung-tre-em': {
        title: '',
        columns: [
            { title: 'No.', dataIndex: 'level', key: 'level', align: 'center' },
            { title: <>Khóa&nbsp;học</>, dataIndex: 'title', key: 'title', align: 'center' },
            { title: <>Thời&nbsp;gian</>, dataIndex: 'duration', key: 'duration', align: 'center' },
            {
                title: 'Nội dung',
                dataIndex: 'content',
                key: 'content',
                align: 'center',
                render: (text) => <span style={{ whiteSpace: 'pre-line' }}>{text}</span>,
            },
        ],
        data: [
            {
                key: 1,
                level: '1',
                title: 'YCT 1',
                duration: '24 buổi (03 tháng)',
                content:
                    'Giới thiệu từ vựng và cấu trúc câu đơn giản. Làm quen giao tiếp hàng ngày như chào hỏi, mua bán, hỏi thăm, miêu tả người, đồ vật, sở thích.',
            },
            {
                key: 2,
                level: '2',
                title: 'YCT 2',
                duration: '24 buổi (03 tháng)',
                content:
                    'Phát triển khả năng giao tiếp trong các tình huống phức tạp hơn. Học thêm các cấu trúc ngữ pháp và từ vựng nâng cao, bao gồm các chủ đề như học thuật, sở thích cá nhân, và các hoạt động xã hội.',
            },
            {
                key: 3,
                level: '3',
                title: 'YCT 3',
                duration: '24 buổi (03 tháng)',
                content:
                    'Tăng cường vốn từ vựng lên tới khoảng 400 từ vựng. Phát triển khả năng giao tiếp trong các tình huống phức tạp hơn.',
            },
            {
                key: 4,
                level: '4',
                title: 'YCT 4',
                duration: '24 buổi (03 tháng)',
                content:
                    'Hoàn thiện kỹ năng 4 kỹ năng. Học thêm các cấu trúc ngữ pháp và từ vựng nâng cao, bao gồm các chủ đề như học thuật, sở thích cá nhân, và các hoạt động xã hội.',
            },
            {
                key: 5,
                level: '5',
                title: 'YCT 5',
                duration: '32 buổi (04 tháng)',
                content:
                    'Tiến tới việc sử dụng tiếng Trung một cách tự nhiên và chính xác trong nhiều tình huống. Củng cố các kỹ năng đọc hiểu và viết với các bài tập và chủ đề phức tạp hơn.',
            },
            {
                key: 6,
                level: '6',
                title: 'YCT 6',
                duration: '32 buổi (04 tháng)',
                content:
                    'Củng cố và phát triển khả năng sử dụng tiếng Trung ở mức độ nâng cao, giúp học viên tham gia vào các cuộc thảo luận, viết bài luận và đọc các văn bản phức tạp. Tập trung vào các kỹ năng tiếng Trung chuyên sâu như viết văn, thảo luận các chủ đề xã hội, và nghiên cứu văn hóa Trung Quốc.',
            },
        ],
    },

    // khóa tiếng trung giao tiếp
    'tieng-trung-giao-tiep': {
        title: '',
        columns: [
            { title: 'No.', dataIndex: 'level', key: 'level', align: 'center' },
            { title: <>Chuyên&nbsp;đề</>, dataIndex: 'title', key: 'title', align: 'center' },
            { title: <>Nội&nbsp;dung</>, dataIndex: 'shortContent', key: 'shortContent', align: 'center' },
            {
                title: 'Phương pháp dạy',
                dataIndex: 'method',
                key: 'method',
                align: 'center',
                render: (text) => <span style={{ whiteSpace: 'pre-line' }}>{text}</span>,
            },
        ],
        data: [
            {
                key: 1,
                level: '1',
                title: 'Module 1',
                shortContent: 'Tăng cường kỹ năng nghe & phản xạ',
                method: 'Phương pháp trực quan và thực hành: Tăng cường việc sử dụng tài liệu hình ảnh, video, podcast để học viên có thể học qua các tình huống thực tế',
            },
            {
                key: 2,
                level: '2',
                title: 'Module 2',
                shortContent: 'Đàm thoại theo chủ đề học thuật & công việc',
                method: 'Luyện nghe, nói tương tác: Mỗi buổi học sẽ có phần luyện nghe, luyện nói theo nhóm hoặc đối thoại trực tiếp giữa giảng viên và học viên.',
            },
            {
                key: 3,
                level: '3',
                title: 'Module 3',
                shortContent: 'Mở rộng từ vựng & ngữ pháp',
                method: 'Bài tập về nhà: Để học viên củng cố và ôn luyện các kỹ năng sau mỗi buổi học',
            },
            {
                key: 4,
                level: '4',
                title: 'Module 4',
                shortContent: 'Luyện nói & thảo luận tự tin',
                method: 'Sử dụng công nghệ: Các ứng dụng học tiếng Trung (như Anki, HelloTalk, Duolingo) được khuyến khích để giúp học viên cải thiện kỹ năng giao tiếp mọi lúc mọi nơi.',
            },
            {
                key: 5,
                level: '5',
                title: 'Module 5',
                shortContent: 'Tình huống giao tiếp văn hóa',
                method: 'Giao tiếp trực tiếp dựa trên mô phỏng các tình huống thông dụng trong giao tiếp, công việc cùng giáo viên',
            },
        ],
    },

    // KHÓA HỌC HSK(K) TẠI PION
    'hskk-tai-pion': {
        title: '',
        columns: [
            { title: 'No.', dataIndex: 'level', key: 'level', align: 'center' },
            { title: <>Khóa&nbsp;học</>, dataIndex: 'title', key: 'title', align: 'center' },
            { title: <>Số&nbsp;buổi</>, dataIndex: 'sessions', key: 'sessions', align: 'center' },
            { title: <>Giờ/&nbsp;buổi</>, dataIndex: 'hoursPerSession', key: 'hoursPerSession', align: 'center' },
            { title: <>Giáo&nbsp;viên</>, dataIndex: 'teacher', key: 'teacher', align: 'center' },
            {
                title: 'Nội dung',
                dataIndex: 'content',
                key: 'content',
                align: 'center',
                render: (text) => <span style={{ whiteSpace: 'pre-line' }}>{text}</span>,
            },
        ],
        data: [
            {
                key: 1,
                level: '1',
                title: 'HSK 1',
                sessions: '20 buổi',
                hoursPerSession: '120 phút',
                teacher: '100% GVVN',
                content: 'Làm quen tiếng Trung, 150 từ vựng cơ bản, phát âm chuẩn Bắc Kinh.',
            },
            {
                key: 2,
                level: '2',
                title: 'HSK 2',
                sessions: '20 buổi',
                hoursPerSession: '120 phút',
                teacher: '100% GVVN',
                content: 'Hiểu và giao tiếp trong các tình huống đơn giản, 300 từ.',
            },
            {
                key: 3,
                level: '3',
                title: 'HSK 3',
                sessions: '25 buổi',
                hoursPerSession: '120 phút',
                teacher: '100% GVVN',
                content: 'Từ vựng: 600 từ, đọc hiểu đoạn văn, phản xạ nhanh trong giao tiếp.',
            },
            {
                key: 4,
                level: '4',
                title: 'HSK 4',
                sessions: '50 buổi',
                hoursPerSession: '120 phút',
                teacher: '30% GVNN & 70% GVVN',
                content: 'Từ vựng: 1.200 từ, luyện nói – viết nâng cao, tư duy bằng tiếng Trung.',
            },
            {
                key: 5,
                level: '5',
                title: 'HSK 5',
                sessions: '55 buổi',
                hoursPerSession: '120 phút',
                teacher: '30% GVNN & 70% GVVN',
                content: 'Từ vựng: 2.500 từ, giao tiếp học thuật, mở rộng hiểu biết văn hóa Trung Quốc.',
            },
            {
                key: 6,
                level: '6',
                title: 'HSK 6',
                sessions: '70 buổi',
                hoursPerSession: '120 phút',
                teacher: '30% GVNN & 70% GVVN',
                content: 'Từ vựng: 5.000 từ, sử dụng tiếng Trung trôi chảy, tự tin thi học bổng & làm việc quốc tế.',
            },
        ],
    },

    // KHÓA HỌC CSCA TẠI PION - được render riêng - ChinaCSCATable.jsx
};

const ChinaCourseTable = ({ slug }) => {
    const config = tableConfigs[slug];
    if (!config) return null;

    return <CustomTable title={config.title} columns={config.columns} data={config.data} />;
};

export default ChinaCourseTable;
