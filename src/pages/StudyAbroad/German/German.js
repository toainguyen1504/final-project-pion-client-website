import classNames from 'classnames/bind';
import { RiQuillPenFill } from 'react-icons/ri';

import { slugify } from '@/utils';
// import Breadcrumb from '@/components/Breadcrumb';

import RelatedContent from '@/components/RelatedContent';
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
        title: 'Du học nghề Đức miễn phí',
        content:
            'Một trong những lợi thế nổi bật của việc học nghề tại Đức là chính sách miễn học phí. Điều này không chỉ giúp người học giảm bớt áp lực về tài chính mà còn tạo ra môi trường thuận lợi để chuyên tâm vào rèn luyện kỹ năng và tích lũy kinh nghiệm. Nhờ không phải chi trả chi phí đào tạo, các bạn trẻ có thể dành toàn bộ sự tập trung cho hành trình phát triển bản thân tại một quốc gia có nền giáo dục tiên tiến.',
    },
    {
        title: 'Thu nhập ngay sau khi tốt nghiệp',
        content:
            'Chương trình học nghề tại Đức mang đến cơ hội kết hợp giữa học tập và làm việc thực tế. Ngay sau khi tốt nghiệp trung học phổ thông, bạn có thể tham gia vào hệ thống đào tạo nghề, nơi vừa được hướng dẫn chuyên môn, vừa được trả lương. Mô hình này không chỉ giúp giảm gánh nặng tài chính cho bản thân và gia đình mà còn đóng vai trò là bàn đạp để xây dựng sự nghiệp trong môi trường quốc tế.',
    },
    {
        title: 'Nền giáo dục nghề nghiệp tiên tiến và thực tiễn',
        content:
            'Đức nổi tiếng với hệ thống đào tạo nghề mang tính ứng dụng cao và đạt chuẩn quốc tế. Khác với mô hình giảng dạy thuần lý thuyết, chương trình học nghề tại đây được tổ chức trực tiếp tại các doanh nghiệp và cơ sở thực hành hiện đại. Người học không chỉ tiếp thu kiến thức chuyên môn mà còn được hòa mình vào môi trường làm việc thực tế, từ đó rèn luyện kỹ năng và tích lũy kinh nghiệm cần thiết. Phương pháp đào tạo này tạo điều kiện lý tưởng để người học sẵn sàng bước vào thị trường lao động ngay sau khi hoàn thành chương trình.',
        image: {
            src: '/assets/img/du_hoc/german2.jpg',
            alt: 'Du học nghề Đức giúp bạn có sự nghiệp ổn định, thu nhập hấp dẫn',
            caption: 'Du học nghề Đức giúp bạn có sự nghiệp ổn định, thu nhập hấp dẫn',
        },
    },
    {
        title: 'Đa dạng ngành nghề',
        content:
            'Dù chương trình đào tạo nghề tại Đức có một số ngành nghề nhất định, nhưng bạn vẫn có nhiều sự lựa chọn hấp dẫn. Các lĩnh vực như Cơ khí, Điều dưỡng, Xây dựng, Nhà hàng – Khách sạn, đều mang lại thu nhập cao và bền vững. Bên cạnh những ngành nghề truyền thống, Đức cũng đang chú trọng phát triển các lĩnh vực mới, bắt kịp với xu thế toàn cầu. Điều này mở ra cơ hội cho bạn chọn lựa ngành nghề phù hợp với sở thích và nhu cầu của thị trường.',
        image: {
            src: '/assets/img/du_hoc/german4.jpg',
            alt: 'Du học nghề tại Đức mang đến nhiều lựa chọn ngành nghề phong phú',
            caption: 'Du học nghề tại Đức mang đến nhiều lựa chọn ngành nghề phong phú',
        },
    },
    {
        title: 'Thu nhập hấp dẫn',
        content:
            'Sau khi tốt nghiệp chương trình học nghề tại Đức, mức thu nhập ban đầu của bạn thường rơi vào khoảng từ 2.300 đến 3.000 Euro mỗi tháng, tương đương với 61 triệu đến 80 triệu đồng. Thêm vào đó, học viên có thể làm thêm tối đa 10 giờ mỗi tuần với mức lương tối thiểu khoảng 12 Euro mỗi giờ, tức là khoảng 320.000 đồng mỗi giờ. Những con số này cho thấy cơ hội kiếm sống tại Đức là rất khả thi. Bạn có thể tự lo liệu chi phí sinh hoạt từ công việc chính và đồng thời có thể làm thêm để nâng cao thu nhập, cải thiện chất lượng cuộc sống của mình.',
    },
    {
        title: 'Cơ hội định cư',
        content:
            'Khi đã sinh sống và làm việc tại Đức đủ lâu, đồng thời đáp ứng các tiêu chí cần thiết, bạn có thể nộp hồ sơ xin quyền cư trú lâu dài. Việc này sẽ thuận lợi hơn nếu bạn tích lũy được kinh nghiệm nghề nghiệp và có những đóng góp thiết thực cho cộng đồng. Quyền thường trú không chỉ mang lại sự ổn định trong công việc mà còn tạo điều kiện để bạn xây dựng một cuộc sống bền vững tại Đức.',
    },
    {
        title: 'Cơ hội làm thêm 40 giờ / tháng',
        content:
            'Tham gia chương trình đào tạo nghề tại Đức, bạn không chỉ được trang bị kỹ năng chuyên môn mà còn có cơ hội tăng thu nhập thông qua việc làm thêm. Theo quy định, học viên có thể làm thêm tối đa 40 giờ mỗi tháng, với mức lương dao động từ 10 đến 15 euro mỗi giờ. Khoản thu nhập này vừa giúp bạn chi trả các chi phí sinh hoạt, vừa giúp bạn tiếp cận môi trường làm việc thực tế, từ đó tích lũy thêm kinh nghiệm trong bối cảnh quốc tế.',
    },
];
const faqItems = [
    {
        title: 'Cơ hội nhận học bổng khi du học nghề tại Đức có dễ không?',
        content:
            'Mặc dù có một số chương trình hỗ trợ tài chính dành cho du học sinh quốc tế theo học nghề tại Đức, nhưng việc giành được học bổng không phải là điều đơn giản. Các suất học bổng thường giới hạn về số lượng và yêu cầu khá khắt khe về hồ sơ cũng như năng lực cá nhân. Vì vậy, bạn nên chủ động tra cứu thông tin từ các trường đào tạo nghề, tổ chức phi chính phủ hoặc quỹ hỗ trợ du học, đồng thời chuẩn bị đầy đủ hồ sơ với thành tích học tập, kỹ năng tiếng Đức và thư động lực thật thuyết phục để nâng cao cơ hội được xét duyệt.',
    },
    {
        title: 'Sinh viên quốc tế có được đi làm trong thời gian du học nghề tại Đức không?',
        content:
            'Câu trả lời là CÓ. Trong thời gian theo học nghề tại Đức, sinh viên quốc tế được phép làm việc bán thời gian với giới hạn tối đa 20 giờ mỗi tuần. Tính theo năm, bạn được phép làm việc tổng cộng 120 ngày toàn thời gian hoặc 240 ngày bán thời gian. Điều này giúp bạn vừa có thêm thu nhập để trang trải sinh hoạt, vừa tích lũy kinh nghiệm làm việc thực tế. Sau khi tốt nghiệp, bạn hoàn toàn có thể chuyển sang làm việc chính thức với mức lương khởi điểm hấp dẫn, dao động từ 2.800 đến 3.000 Euro mỗi tháng, tùy ngành nghề và kinh nghiệm.',
    },
    {
        title: 'Chương trình học nghề tại Đức kéo dài bao lâu?',
        content:
            'Thông thường, một khóa học nghề tại Đức kéo dài từ 2 đến 3,5 năm, tùy thuộc vào ngành học và khả năng tiếp thu của học viên. Trong suốt quá trình đào tạo, bạn sẽ được kết hợp giữa học lý thuyết tại các trường dạy nghề và thực hành trực tiếp tại các doanh nghiệp đối tác. Phần lý thuyết bao gồm kiến thức chuyên môn, kỹ năng mềm, thể chất và ngoại ngữ. Thời gian thực hành giúp bạn tiếp cận công việc thực tế, tích lũy kinh nghiệm và rèn luyện tay nghề. Nếu thể hiện tốt trong quá trình học và làm việc, bạn có thể được tuyển dụng chính thức ngay sau khi tốt nghiệp.',
    },
];

function German() {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('heading')}>
                <h1>Khám phá cơ hội du học nghề Đức</h1>
                <p>
                    Trong những năm gần đây, việc sang Đức học nghề đã thu hút sự quan tâm mạnh mẽ từ giới trẻ Việt Nam.
                    Lý do không chỉ nằm ở cơ hội tiếp cận nền giáo dục chất lượng cao mà còn ở trải nghiệm cuộc sống tại
                    một quốc gia hiện đại và giàu bản sắc văn hóa.
                </p>
            </section>
            <section className={cx('content')}>
                {/* Item 1 */}
                <ContentItem
                    title="Lợi ích của du học nghề Đức"
                    description="Đức là điểm đến lý tưởng cho những ai mong muốn vừa học nghề vừa khám phá thế giới. Những cơ hội tuyệt vời dành cho giới trẻ khi lựa chọn con đường này có thể kể đến như sau:"
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
                                <p>{item.content}</p>
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
                    title="Đức – điểm đến lý tưởng cho du học nghề"
                    description="Với hệ thống đào tạo nghề phát triển và được công nhận toàn cầu, Đức đang trở thành điểm đến hấp dẫn cho sinh viên quốc tế. Các chương trình học tập kết hợp giữa lý thuyết và thực hành, giúp người học vừa tích lũy kiến thức chuyên môn, vừa rèn luyện kỹ năng thực tế. Một số lĩnh vực được nhiều du học sinh lựa chọn bao gồm:"
                >
                    <ul className={cx('job-list', 'list-normal')}>
                        <li>Chăm sóc sức khỏe: Hộ lý, điều dưỡng</li>
                        <li>Dịch vụ: Nhà hàng – khách sạn, đầu bếp, chế biến thực phẩm</li>
                        <li>Thẩm mỹ: Làm đẹp, chăm sóc móng (nails)</li>
                        <li>Kỹ thuật – công nghệ: Cơ khí, điện – điện tử, ô tô, xây dựng, công nghệ thông tin</li>
                        <li>Ngành thủ công: Thợ mộc, thợ điện, thợ ống nước,...</li>
                    </ul>
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/du_hoc/german3.jpg"
                            alt=""
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>Điều dưỡng, hộ lý là những ngành nghề “khát nhân lực” tại Đức</figcaption>
                    </figure>
                </ContentItem>

                {/* Item 3 */}
                <ContentItem
                    title="Những yêu cầu cơ bản để tham gia chương trình du học nghề tại Đức"
                    description="Để có thể theo học nghề tại Đức, bạn cần đáp ứng một số tiêu chí nhất định. Cụ thể như sau:"
                >
                    <ul className={cx('condition-list', 'list-normal')}>
                        <li>Độ tuổi phù hợp: Nam hoặc nữ trong độ tuổi từ 18 đến 35</li>
                        <li>
                            Trình độ học vấn: Đã hoàn thành chương trình trung học phổ thông tại Việt Nam, không đặt
                            nặng yêu cầu về điểm số
                        </li>
                        <li>
                            Ngoại ngữ: Có chứng chỉ tiếng Đức tối thiểu trình độ B1; tuy nhiên, bạn vẫn có thể xin visa
                            nếu đạt trình độ A2 và đang học tiếp lên B1
                        </li>
                        <li>Sức khỏe: Đủ điều kiện về thể chất, không mắc các bệnh truyền nhiễm nguy hiểm</li>
                        <li>Hồ sơ cá nhân: Lý lịch rõ ràng, không vi phạm pháp luật hoặc có tiền án</li>
                    </ul>
                </ContentItem>

                {/* Item 4 */}
                <ContentItem
                    title="Lộ trình đăng kí du học nghề Đức"
                    description="Việc tham gia chương trình du học nghề ở Đức thường cần tuân theo một quy trình rõ ràng và có lộ trình cụ thể như sau:"
                >
                    <ul className={cx('process-list', 'list-normal')}>
                        <li>
                            Bắt đầu học tiếng Đức: Đăng ký các khóa học tiếng và học đến khi đạt trình độ B1 – một yêu
                            cầu quan trọng trong việc xin visa và hội nhập.
                        </li>
                        <li>
                            Nâng cao kỹ năng giao tiếp và văn hóa hội nhập: Tập trung cải thiện khả năng nghe – nói,
                            đồng thời tìm hiểu về văn hóa và môi trường sống tại Đức để dễ thích nghi.
                        </li>
                        <li>
                            Tư vấn chọn ngành, chọn trường: Tìm hiểu và lựa chọn ngành nghề phù hợp với năng lực và sở
                            thích, đồng thời tìm kiếm doanh nghiệp hoặc cơ sở đào tạo phù hợp.
                        </li>
                        <li>
                            Chuẩn bị cho vòng phỏng vấn: Hoàn thiện hồ sơ và luyện tập phỏng vấn để tạo ấn tượng tốt với
                            đối tác tuyển dụng từ Đức.
                        </li>
                        <li>
                            Nhận thư mời từ doanh nghiệp: Sau khi vượt qua phỏng vấn, bạn sẽ nhận được thông báo trúng
                            tuyển từ đơn vị đào tạo hoặc doanh nghiệp bên Đức.
                        </li>
                        <li>
                            Tham gia chương trình đào tạo nghề: Bắt đầu khóa học kéo dài từ khoảng 2 đến 3,5 năm, kết
                            hợp giữa lý thuyết và thực hành tại môi trường làm việc thực tế.
                        </li>
                        <li>
                            Tốt nghiệp và nhận bằng nghề chính thức: Sau khi hoàn tất chương trình, bạn sẽ được cấp bằng
                            nghề có giá trị trên toàn quốc và cả châu Âu.
                        </li>
                        <li>
                            Ký hợp đồng làm việc lâu dài: Cơ hội được ký kết hợp đồng chính thức với doanh nghiệp bạn đã
                            học nghề, từ đó ổn định công việc.
                        </li>
                        <li>
                            Định cư và đoàn tụ gia đình: Sau 5 năm làm việc và đóng góp, bạn có thể nộp hồ sơ xin định
                            cư lâu dài và làm thủ tục bảo lãnh người thân sang cùng sinh sống.
                        </li>
                    </ul>
                    <figure className={cx('image-wrapper')}>
                        <img src="/assets/img/du_hoc/woman.jpg" alt="" className={cx('content-image')} loading="lazy" />
                        <figcaption>Có Pion du học nghề Đức là “chuyện nhỏ”</figcaption>
                    </figure>
                </ContentItem>

                {/* Item 5 */}
                <ContentItem
                    title="Du học nghề Đức cần những giấy tờ gì?"
                    description="Để chuẩn bị hồ sơ du học nghề tại Đức, bạn cần chuẩn bị các giấy tờ sau:"
                >
                    <ul className={cx('file-list', 'list-normal')}>
                        <li>Đơn xin nhập học chương trình du học nghề</li>
                        <li>Bằng tốt nghiệp THPT</li>
                        <li>Hộ chiếu bản gốc, CCCD công chứng, Giấy tờ khai sinh bản sao/ Hộ khẩu/ Xác nhận cư trú</li>
                        <li>Bảng điểm kết quả học tập bậc THPT (Có dịch thuật, photo công chứng)</li>
                        <li>Phiếu tư pháp số 2 bản gốc (Do Sở Tư Pháp tỉnh cấp)</li>
                        <li>Chứng chỉ ngoại ngữ trình độ tiếng Đức A1, A2 hoặc B1 của Viện Goethe hoặc Hanu gốc</li>
                        <li>Giấy khám sức khỏe có thời hạn đi du học</li>
                        <li>
                            20 ảnh 4x6 và 4 ảnh 3x4 nền trắng áo màu trong thời hạn 6 tháng gần nhất theo quy định của
                            ĐSQ Đức
                        </li>
                    </ul>
                </ContentItem>

                {/* Item 6 */}
                <ContentItem
                    title="Giải đáp các câu hỏi thường gặp về du học nghề Đức (FAQ)"
                    description="Chúng tôi đã tổng hợp các câu hỏi thường gặp về việc du học nghề tại Đức, cùng những lời giải đáp cho từng câu hỏi."
                >
                    <ul className={cx('faq-list', 'icon-list')}>
                        {faqItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <p>{item.content}</p>
                            </li>
                        ))}
                    </ul>
                </ContentItem>
            </section>

            <RelatedContent />
        </div>
    );
}

export default German;
