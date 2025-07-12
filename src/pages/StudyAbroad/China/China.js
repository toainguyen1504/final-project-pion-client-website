import classNames from 'classnames/bind';
import { RiQuillPenFill } from 'react-icons/ri';
import { Steps } from 'antd';

import { FiUser, FiSearch, FiMail, FiCalendar, FiSmile } from 'react-icons/fi';
import { HiOutlineClipboardList } from 'react-icons/hi';

// import RelatedContent from '@/components/RelatedContent';
import { slugify } from '@/utils';
import styles from '../StudyAbroad.module.scss'; // Css

const cx = classNames.bind(styles);

function ContentItem({ title, description, children }) {
    return (
        <div className={cx('content-item')}>
            <div className={cx('title-wrapper')}>
                <h2 id={slugify(title)} className={cx('title')}>
                    {title}
                </h2>
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}

const benefitItems = [
    {
        title: 'Hệ thống giáo dục đẳng cấp quốc tế',
        content:
            'Trung Quốc sở hữu một hệ thống giáo dục phát triển mạnh mẽ với nhiều trường đại học danh tiếng nằm trong top các trường hàng đầu thế giới. Các cơ sở giáo dục tại đây không chỉ cung cấp chương trình học chuyên sâu mà còn tạo ra môi trường học thuật sáng tạo và đầy thử thách. Sinh viên du học tại Trung Quốc sẽ được tiếp cận với các giáo sư hàng đầu, các chương trình nghiên cứu tiên tiến và các công nghệ mới nhất, giúp phát triển năng lực toàn diện, không chỉ về kiến thức mà còn về kỹ năng mềm.',
    },
    {
        title: 'Học bổng hấp dẫn, chi phí tiết kiệm',
        content:
            'Trung Quốc là điểm đến lý tưởng cho những ai muốn theo đuổi du học với chi phí hợp lý nhưng vẫn đảm bảo chất lượng giáo dục cao. Chính phủ Trung Quốc và các trường đại học tại đây cung cấp hàng nghìn suất học bổng toàn phần và bán phần mỗi năm, giúp giảm thiểu gánh nặng tài chính cho sinh viên quốc tế.',
    },
    {
        title: 'Mở rộng tương lai nghề nghiệp',
        content:
            'Một trong những lợi ích lớn khi du học tại Trung Quốc là cơ hội nghề nghiệp rộng mở. Sau khi tốt nghiệp, bạn sẽ có cơ hội làm việc tại các doanh nghiệp lớn không chỉ tại Trung Quốc mà còn ở các quốc gia khác nhờ vào mạng lưới kết nối toàn cầu của các trường đại học Trung Quốc. Trung Quốc là một trong những nền kinh tế lớn nhất thế giới, và các tập đoàn đa quốc gia luôn tìm kiếm những nhân tài có kiến thức vững vàng và khả năng làm việc trong môi trường quốc tế. Du học tại Trung Quốc không chỉ giúp bạn trau dồi kiến thức chuyên môn mà còn mở ra cánh cửa nghề nghiệp trong các ngành công nghiệp đang phát triển mạnh mẽ như công nghệ, tài chính, và thương mại quốc tế.',
    },
    {
        title: 'Khám phá nền văn hóa đặc sắc',
        content:
            'Du học tại Trung Quốc không chỉ là cơ hội học tập mà còn là dịp để bạn khám phá một nền văn hóa lâu đời và phong phú. Trung Quốc, với lịch sử hơn 5.000 năm, sở hữu một kho tàng di sản văn hóa vô cùng đa dạng, từ những công trình kiến trúc nổi tiếng như Tử Cấm Thành, đến những lễ hội truyền thống đầy sắc màu. Việc sống và học tập tại đây sẽ giúp bạn không chỉ hiểu thêm về nền văn minh cổ xưa mà còn trải nghiệm các giá trị văn hóa đương đại. Hơn nữa, việc học tiếng Trung trong môi trường bản xứ sẽ là một lợi thế lớn trong công việc sau này, đặc biệt trong bối cảnh Trung Quốc ngày càng đóng vai trò quan trọng trên trường quốc tế.',
        image: {
            src: '/assets/img/du_hoc/china_03.jpg',
            alt: ' Vạn Lý Trường Thành – một trong những công trình kiến trúc vĩ đại nhất thế giới',
            caption: ' Vạn Lý Trường Thành – một trong những công trình kiến trúc vĩ đại nhất thế giới',
        },
    },
];

const factorItems = [
    {
        title: 'Trình độ học vấn phù hợp',
        content:
            'Ứng viên cần đáp ứng yêu cầu học vấn tương ứng với bậc học mà mình đăng ký. Đối với hệ đại học, người học cần đã hoàn tất chương trình THPT. Nếu có nguyện vọng theo học bậc cao hơn như thạc sĩ hoặc tiến sĩ, bắt buộc phải có bằng cử nhân đúng chuyên ngành hoặc liên quan. Ngoài ra, điểm trung bình học tập từ khá trở lên (thường từ 6.5/10 hoặc tương đương) sẽ gia tăng cơ hội được chấp nhận và xét học bổng.',
    },
    {
        title: 'Năng lực ngoại ngữ',
        content:
            'Tùy vào chương trình học chọn lựa mà du học sinh cần có chứng chỉ ngoại ngữ tương ứng. Nếu đăng ký chương trình dạy bằng tiếng Trung, bạn phải có chứng chỉ HSK cấp độ phù hợp (thường từ HSK 4 trở lên đối với bậc đại học). Ngược lại, với các khóa học bằng tiếng Anh, các chứng chỉ quốc tế như IELTS hoặc TOEFL là điều kiện bắt buộc, giúp chứng minh khả năng tiếp thu kiến thức trong môi trường học thuật quốc tế.',
    },
    {
        title: 'Điều kiện sức khỏe',
        content:
            'Sức khỏe tốt là một trong những yếu tố tiên quyết để có thể học tập lâu dài tại Trung Quốc. Bạn cần thực hiện khám sức khỏe tổng quát theo mẫu quy định của đại sứ quán và không mắc các bệnh truyền nhiễm nghiêm trọng. Đây là cơ sở để đảm bảo bạn có đủ khả năng thích nghi với môi trường mới và không ảnh hưởng đến cộng đồng quốc tế tại nơi học.',
    },
    {
        title: 'Hồ sơ cá nhân rõ ràng',
        content:
            'Người có nguyện vọng du học không được nằm trong danh sách cấm xuất cảnh tại Việt Nam hoặc bị cấm nhập cảnh vào Trung Quốc. Đồng thời, hồ sơ lý lịch cần minh bạch, không có tiền án tiền sự và không có người thân định cư bất hợp pháp tại Trung Quốc. Đây là những tiêu chí ngày càng được siết chặt trong quá trình xét duyệt visa và tuyển chọn du học sinh quốc tế.',
    },
    {
        title: 'Khả năng tài chính',
        content:
            'Một điều kiện không thể thiếu khi du học Trung Quốc là chứng minh tài chính. Bạn cần có đủ năng lực chi trả học phí và chi phí sinh hoạt trong suốt quá trình học, trừ khi đã nhận được học bổng toàn phần. Việc có sổ tiết kiệm với số dư hợp lý, nguồn thu nhập ổn định từ người bảo trợ sẽ giúp tăng khả năng đậu visa và chứng minh được sự nghiêm túc trong kế hoạch học tập.',
    },
];

const { Step } = Steps;

function China() {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('heading')}>
                <h1>Du học Trung Quốc – Lựa chọn thông minh cho tương lai rộng mở </h1>
                <p>
                    Lựa chọn du học tại Trung Quốc mang lại cho sinh viên nhiều lợi ích vượt trội. Không chỉ được tiếp
                    cận với hệ thống giáo dục tiên tiến cùng cơ sở vật chất hiện đại, bạn còn có cơ hội khám phá nền văn
                    hóa lâu đời, đa dạng và giàu bản sắc. Bên cạnh đó, rất nhiều trường đại học tại Trung Quốc còn cung
                    cấp các chương trình học bổng hấp dẫn dành cho sinh viên quốc tế, giúp giảm đáng kể chi phí học tập
                    và sinh hoạt. Đây chính là điểm cộng lớn khiến Trung Quốc ngày càng trở thành điểm đến du học được
                    ưa chuộng trên thế giới.
                </p>
                <figure className={cx('image-wrapper')}>
                    <img src="/assets/img/du_hoc/china_01.jpg" alt="" className={cx('content-image')} loading="lazy" />
                    <figcaption>
                        Sinh viên quốc tế tại Trung Quốc – Hành trình học tập và khám phá văn hóa phương Đông
                    </figcaption>
                </figure>
            </section>
            <section className={cx('content')}>
                {/* Item 1 */}
                <ContentItem
                    title="Bốn lý do nên chọn du học tại Trung Quốc"
                    description="Du học Trung Quốc đang trở thành xu hướng được nhiều bạn trẻ lựa chọn nhờ chất lượng giáo dục ngày càng nâng cao, chính sách học bổng hào phóng và môi trường học tập năng động, hiện đại. Không chỉ mang lại cơ hội nghề nghiệp rộng mở, hành trình học tập tại đây còn là dịp để khám phá một nền văn hóa lâu đời, đậm đà bản sắc phương Đông. Nếu bạn đang tìm kiếm một điểm đến du học vừa chất lượng vừa tiết kiệm, Trung Quốc chắc chắn là lựa chọn không nên bỏ lỡ."
                >
                    <ul className={cx('benefit-list', 'icon-list')}>
                        {benefitItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                                {item.image && (
                                    <figure className={cx('image-wrapper')}>
                                        <img
                                            src={item.image.src}
                                            alt={item.image.alt}
                                            className={cx('content-image')}
                                            loading="lazy"
                                        />
                                        <figcaption>{item.image.caption}</figcaption>
                                    </figure>
                                )}
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 2 */}
                <ContentItem
                    title="Điều kiện du học Trung Quốc, bạn cần chuẩn bị gì?"
                    description="Để chinh phục ước mơ du học tại Trung Quốc, bạn cần đáp ứng một số điều kiện cơ bản nhưng không quá phức tạp. Cụ thể như sau:"
                >
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/du_hoc/china_04.jpg"
                            alt=""
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>
                            Khuôn viên Đại học Nhân dân Trung Quốc – một trong những ngôi trường hàng đầu tại Trung Quốc
                        </figcaption>
                    </figure>
                    <ul className={cx('factors-list', 'icon-list')}>
                        {factorItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                                {item.image && (
                                    <figure className={cx('image-wrapper')}>
                                        <img
                                            src={item.image.src}
                                            alt={item.image.alt}
                                            className={cx('content-image')}
                                            loading="lazy"
                                        />
                                        <figcaption>{item.image.caption}</figcaption>
                                    </figure>
                                )}
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 2 */}
                <ContentItem
                    title="Quy trình tư vấn"
                    description="Tư vấn du học Trung Quốc là một quy trình toàn diện giúp học sinh và phụ huynh lựa chọn chương trình học, trường đại học và chuẩn bị tốt nhất cho hành trình du học. Với mục tiêu không chỉ giúp học sinh chọn được ngành học phù hợp mà còn hỗ trợ trong việc hoàn thiện hồ sơ, xin visa, chuẩn bị cuộc sống tại Trung Quốc, chúng tôi cam kết đồng hành cùng bạn từ lúc bắt đầu đến khi kết thúc hành trình du học."
                >
                    <Steps current={0} className={cx('steps')} labelPlacement="vertical">
                        <Step title="Tiếp nhận" icon={<FiUser size={24} className={cx('icon')} />} />
                        <Step title="Lập kế hoạch" icon={<HiOutlineClipboardList size={24} className={cx('icon')} />} />
                        <Step title="Đề xuất phương án" icon={<FiSearch size={24} className={cx('icon')} />} />
                        <Step title="Hoàn thiện hồ sơ" icon={<FiMail size={24} className={cx('icon')} />} />
                        <Step title="Chuẩn bị nhập học" icon={<FiCalendar size={24} className={cx('icon')} />} />
                        <Step title="Tư vấn việc làm" icon={<FiSmile size={24} className={cx('icon')} />} />
                    </Steps>
                </ContentItem>
            </section>
            {/* <RelatedContent /> */}
        </div>
    );
}

export default China;
