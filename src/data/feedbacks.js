const feedbacks = [
    // 6 Phản hồi từ Học Trung Quốc + 6 Phản hồi Đào Tạo HKS, CSCA
    {
        avatar: '/assets/img/feedbacks/feedback_ch6.jpg',
        name: 'Bạn Đức Anh',
        info: 'Bình Định – Học viên tiếng Trung giao tiếp ',
        feedback:
            'Mình đang học tại Pion, ban đầu chỉ muốn học cho biết tiếng Trung thôi. Sau khi được tham gia trại hè do Trung tâm tổ chức, mình có thêm động lực và hiện tại đã bắt đầu làm hồ sơ du học 1 năm tiếng!',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch7.jpg',
        name: 'Bạn Tuấn Anh',
        info: 'Hồ Chí Minh – Tham gia trại hè',
        feedback: 'Trại hè Quế Lâm thật sự đáng nhớ! kết nối bạn quốc tế.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch8.jpg',
        name: 'Bạn Thanh Tùng',
        info: 'Hải Phòng – tham gia trại hè',
        feedback:
            'Trại hè là cuyến đi giúp mình trưởng thành hơn rất nhiều. Sau trải nghiệm này, mình càng có động lực theo đuổi ước mơ du học và sẽ nhờ Pion tư vấn để xin học bổng phù hợp cho mình.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch9.jpg',
        name: 'Bạn Quế Châu',
        info: 'Du học sinh',
        feedback:
            'Từ lúc xin học bổng đến nhập học, Pion đều được hướng dẫn chi tiết, dễ hiểu. Giờ mình đã chính thức là du học sinh Trung Quốc rồi!',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch4.jpg',
        name: 'Bạn Khánh Huyền',
        info: 'Quảng Ngãi – Đang học lớp luyên HSK online',
        feedback:
            'Cô giáo sửa phát âm cực kỹ, dạy cách làm bài logic. Mình từ HSK3 lên HSK5 trong 6 tháng – thật sự biết ơn đội ngũ Pion đã đồng hành hành tận tâm.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch5.jpg',
        name: 'Phụ huynh học viên Vân Trinh',
        info: 'Gia Lai – Kí hợp đồng du học Đại học ngành Hán ngữ',
        feedback:
            'Trung tâm có điều khoản, thỏa thuận rõ ràng và lộ trình học phù hợp. Mình cảm thấy rất yên tâm khi cho con học tại đây, vì mọi thứ đều được hướng dẫn minh bạch và có kế hoạch cụ thể',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch10.jpg',
        name: 'Bạn Trọng Tân',
        info: 'Du học sinh Trung Quốc',
        feedback:
            'Trường học đẹp, môi trường thân thiện. Các anh chị Pion luôn theo sát. mình cảm thấy yên tâm dù ở xa nhà.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch11.jpg',
        name: 'Bạn Trọng Nghĩa',
        info: 'Du học sinh Trung Quốc',
        feedback:
            'Thật sự rất bất ngờ với cơ hội học bổng mà Pion giúp mình đạt được! Không kỳ vọng quá nhiều về trợ cấp, nhưng kết quả lại vượt xa mong đợi. ',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch12.jpg',
        name: 'Bạn Tường Lam',
        info: 'Tham gia Trại hè',
        feedback:
            'Trại hè ở Quế Lâm là một trong những trải nghiệm tuyệt vời nhất của mình trong năm nay. Học – chơi – khám phá toàn diện!',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch2.jpg',
        name: 'Bạn Trần Thương',
        info: 'Hà Nội – Đang học lớp luyện CSCA online',
        feedback:
            'Trước khi học CSCA, mình khá mơ hồ về hồ sơ và trình tự apply học bổng. Sau khi được tư vấn, mình yên tâm tham gia lớp luyện, được thầy cô định hướng cụ thể cho hành trình săn học bổng giờ mình cảm thấy rất tự tin cho kỳ apply này.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch3.jpg',
        name: 'Bạn Vân Trinh ',
        info: 'Gia Lai – Đang học lớp luyên HSK online',
        feedback:
            'Pion không chỉ dạy tiếng Trung mà còn định hướng du học rất chi tiết. Mỗi buổi học đều có giá trị thực tế, giúp mình chuẩn bị kỹ năng cho kỳ thi HSK.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_ch1.jpg',
        name: 'Bạn Ngọc Ánh',
        info: 'Phú Yên – Đang học lớp luyên HSK online',
        feedback:
            'Lớp luyện HSK của Pion giúp mình tiến bộ nhanh hơn mong đợi. Cô giáo nhiệt tình, bài học dễ hiểu, luyện nói nhiều nên thi thật mình tự tin chắc chắn.',
    },

    // 10 Phản hồi Tiếng Anh
    {
        avatar: '/assets/img/feedbacks/feedback_en1.jpg',
        name: 'Phụ Huynh bé Hồ Nam',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback:
            'Mình cảm ơn Trung tâm vì đã giúp bé lại nền tảng. Bé từng mất gốc, giờ đã theo kịp các bạn. Cô dạy dễ hiểu, nhẹ nhàng và vừa phải, con học mà không thấy áp lực.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en2.jpg',
        name: 'Phụ Huynh bé Kim Bảo',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback: 'Mình cho con đi học tiếng Anh sớm để bé làm quen thôi nhưng giờ bé nhà mình thực sự yêu thích.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en3.jpg',
        name: 'Bé Minh Thư',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback:
            'Con thích cách thầy cô giải bài, lồng ghép trò chơi và ví dụ thực tế nên không phiền chán, giúp con nhớ lâu hơn, hiện con rất tự tin với vốn từ của mình.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en4.jpg',
        name: 'Phụ Huynh bé Thiên Ân',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback:
            'Con gái tôi rất thích mỗi buổi học ở Pion. Mỗi ngày đều năn nỉ mẹ chở đi học, bé rất thích các cô giáo ở Trung tâm.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en5.jpg',
        name: 'Phụ huynh bé Bảo Trân',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback: 'Trung tâm luôn cập nhật tình hình bé trên lớp và nội dung bài học cho phụ huynh.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en6.jpg',
        name: 'Bé Hạo Lâm',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback: 'Con tự tin nói chuyện với người nước Ngoài mỗi khi gia đình đi du lịch, ba mẹ con cảm thấy rất vui',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en7.jpg',
        name: 'Phụ huynh bé Hà My',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback:
            'Lúc đầu mình chỉ định cho bé học hè để xem lại kiến thức, tránh quên bài. Nhưng sau khóa học, đã thấy con tiến bộ rõ ràng, tự động và thích học hơn nên tôi quyết định đăng ký luôn khóa 12 tháng cho bé.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en8.jpg',
        name: 'Phụ huynh bé Kim Ngân',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback:
            'Sau khi học ở Trung tâm, bé không chỉ tự tin hơn mà còn yêu thích tiếng Anh. Trung tâm có điều khoản rõ ràng, môi trường thân thiện, mình rất yên tâm khi cho con theo học lâu dài.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en9.jpg',
        name: 'Phụ huynh bé Thiên Di',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback:
            'Trung tâm không chỉ dạy kiến thức mà còn giúp bé rèn tính kỷ luật và kỹ năng giao tiếp. Bé về nhà hay kể chuyện trên lớp, tự giác làm bài tập. Mình rất vui vì thấy bé thích học.',
    },
    {
        avatar: '/assets/img/feedbacks/feedback_en10.jpg',
        name: 'Phụ huynh Bé Hoàng Tuân',
        info: 'Gia Lai – Học viên đang theo học tại Trung tâm',
        feedback: 'Trước đây bé rất nhát, sợ nói trước đám đông. Sau thời gian học, con đã tự tin hơn nhiều.',
    },
];

export default feedbacks;
