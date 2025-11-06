import classNames from 'classnames/bind';
import { RiQuillPenFill } from 'react-icons/ri';
import { Steps } from 'antd';

import { FiUser, FiSearch, FiMail, FiCalendar, FiSmile } from 'react-icons/fi';
import { HiOutlineClipboardList } from 'react-icons/hi';

// import RelatedContent from '@/components/RelatedContent';
import { slugify } from '@/utils';
import { Helmet } from 'react-helmet-async';

import ContactForm from '@/components/ContactForm';
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
        title: 'Chất lượng giáo dục đẳng cấp quốc tế',
        content:
            'Nhiều trường đại học của Trung Quốc đã và đang vươn lên top đầu các bảng xếp hạng uy tín trên thế giới. Với chính sách đầu tư mạnh mẽ vào giáo dục, các trường học tại đây sở hữu cơ sở vật chất hiện đại, đội ngũ giáo sư giàu kinh nghiệm và chương trình đào tạo chuyên sâu. Đặc biệt, các ngành như trí tuệ nhân tạo (AI), công nghệ thông tin, kỹ thuật, y học và kinh doanh... được chú trọng phát triển, mang lại cho sinh viên kiến thức và kỹ năng đáp ứng nhu cầu thị trường lao động toàn cầu.',
        image: {
            src: '/assets/img/du_hoc/du-hoc-trung-quoc-mo-ra-co-hoi-nghe-nghiep.jpg',
            alt: 'Du học Trung Quốc mở ra nhiều cơ hội mới',
            caption: 'Du học Trung Quốc mở ra nhiều cơ hội mới',
        },
    },
    {
        title: 'Chi phí hợp lý và cơ hội học bổng dồi dào',
        content: (
            <>
                So với các quốc gia phương Tây, chi phí du học Trung Quốc rất phải chăng. Học phí và sinh hoạt phí thấp
                hơn đáng kể, giúp giảm gánh nặng tài chính cho gia đình. Hơn thế nữa, Chính phủ Trung Quốc có rất nhiều
                chính sách ưu đãi dành cho sinh viên quốc tế thông qua các chương trình học bổng "khủng" như
                <span> Học bổng Chính phủ Trung Quốc (CSC)</span>,<span> Học bổng Viện Khổng Tử (CIS)</span>, học bổng
                tỉnh, và học bổng trường. Những suất học bổng này có thể bao gồm toàn bộ học phí, chi phí ký túc xá, bảo
                hiểm y tế và sinh hoạt phí, biến giấc mơ du học thành hiện thực với chi phí gần như bằng không.
            </>
        ),
    },
    {
        title: 'Mở rộng cơ hội nghề nghiệp',
        content:
            'Với tốc độ phát triển kinh tế mạnh mẽ, Trung Quốc đã trở thành đối tác thương mại quan trọng của nhiều quốc gia, trong đó có Việt Nam. Việc thành thạo tiếng Trung và có bằng cấp từ một trường đại học danh tiếng tại Trung Quốc sẽ là một lợi thế cạnh tranh rất lớn trên thị trường lao động. Bạn không chỉ có cơ hội làm việc cho các tập đoàn đa quốc gia của Trung Quốc mà còn có thể làm việc tại Việt Nam trong các công ty có vốn đầu tư từ Trung Quốc.',
        image: {
            src: '/assets/img/du_hoc/du-hoc-trung-quoc-da-dang-van-hoa.jpg',
            alt: 'Du học 2025 là sự hòa nhập văn hóa từ nhiều quốc gia',
            caption: 'Du học 2025 là sự hòa nhập văn hóa từ nhiều quốc gia',
        },
    },
    {
        title: 'Khám phá nền văn hóa đa dạng và phong phú',
        content:
            'Du học Trung Quốc là một trải nghiệm sống. Tại Trung Quốc, bạn không chỉ học mà còn được đắm mình vào một nền văn hóa lâu đời, độc đáo và đầy màu sắc. Từ những công trình kiến trúc cổ kính như Tử Cấm Thành, Vạn Lý Trường Thành cho đến những thành phố hiện đại như Thượng Hải, Bắc Kinh, hay những vùng đất văn hóa đặc sắc như Tây Tạng, Côn Minh, bạn sẽ có cơ hội mở rộng tầm nhìn và trải nghiệm những điều mới lạ.',
    },
];

const factorItems = [
    {
        title: 'Điều kiện chung',
        content: null,
        sublist: [
            {
                title: 'Quốc tịch',
                content: 'Là công dân Việt Nam, có hộ chiếu hợp lệ.',
            },
            {
                title: 'Sức khỏe',
                content:
                    'Có sức khỏe tốt, không mắc các bệnh truyền nhiễm hoặc các bệnh lý khác theo quy định của chính phủ Trung Quốc.',
            },
            {
                title: 'Lý lịch',
                content: 'Không có tiền án, tiền sự.',
            },
            {
                title: 'Độ tuổi',
                content:
                    'Tuổi tối thiểu 18 tuổi, một số trường có thể có yêu cầu về độ tuổi tối đa tùy theo chương trình học (ví dụ: hệ đại học thường yêu cầu dưới 25 tuổi, thạc sĩ dưới 35 tuổi, tiến sĩ dưới 40 tuổi).',
            },
        ],
        image: {
            src: '/assets/img/du_hoc/dieu-kien-du-hoc-trung-quoc-2025.jpg',
            alt: 'Điều kiện du học Trung Quốc 2025',
            caption: 'Điều kiện du học Trung Quốc 2025',
        },
    },
    {
        title: 'Điều kiện về học vấn và điểm số',
        content: 'Đây là một trong những yếu tố quan trọng nhất quyết định bạn có được nhận vào trường hay không.',
        sublist: [
            {
                title: 'Hệ Đại học',
                content:
                    'Tốt nghiệp THPT với điểm trung bình (GPA) từ 7.0 trở lên. Các trường top đầu có thể yêu cầu GPA từ 8.0 trở lên.',
            },
            {
                title: 'Hệ Thạc sĩ',
                content:
                    'Tốt nghiệp đại học với GPA từ 7.5 trở lên. Một số trường yêu cầu bằng đại học thuộc các ngành liên quan đến ngành học thạc sĩ đăng ký.',
            },
            {
                title: 'Hệ Tiến sĩ',
                content:
                    'Tốt nghiệp thạc sĩ với GPA từ 8.0 trở lên, có kinh nghiệm nghiên cứu và một đề tài nghiên cứu cụ thể.',
            },
        ],
    },
    {
        title: 'Điều kiện về ngôn ngữ',
        content:
            'Tùy vào chương trình học của ngành Du học Trung Quốc, bạn có thể chọn học bằng tiếng Trung hoặc tiếng Anh.',
        sublist: [
            {
                title: 'Học bằng tiếng Trung',
                content:
                    'Bắt buộc có chứng chỉ HSK. Hầu hết yêu cầu HSK 4 trở lên cho hệ đại học và HSK 5–6 cho hệ thạc sĩ, tiến sĩ. Một số ngành đặc thù như Y học cổ truyền, Ngôn ngữ Hán có thể yêu cầu thêm HSKK. (Một số trường cao đẳng/đại học có thể không yêu cầu HSK).',
            },
            {
                title: 'Học bằng tiếng Anh',
                content:
                    'Yêu cầu chứng chỉ IELTS tối thiểu 6.0 hoặc TOEFL từ 80 trở lên. Các trường top đầu có thể yêu cầu điểm số cao hơn.',
            },
        ],
        image: {
            src: '/assets/img/du_hoc/dieu-kien-du-hoc-trung-quoc-de-dang.jpg',
            alt: 'Điều kiện du học Trung Quốc dễ dàng',
            caption: 'Điều kiện du học Trung Quốc dễ dàng',
        },
    },
    {
        title: 'Điều kiện tài chính',
        content:
            'Một điều kiện không thể thiếu khi du học Trung Quốc là chứng minh tài chính. Bạn cần có đủ năng lực chi trả học phí và chi phí sinh hoạt trong suốt quá trình học, trừ khi đã nhận được học bổng toàn phần. Việc có sổ tiết kiệm với số dư hợp lý, nguồn thu nhập ổn định từ người bảo trợ sẽ giúp tăng khả năng đậu visa và chứng minh được sự nghiêm túc trong kế hoạch học tập.',
    },
];

const prepItems2025 = [
    {
        title: '',
        content: 'Để đảm bảo hồ sơ của bạn nổi bật và có cơ hội cao nhận được học bổng, hãy chuẩn bị các giấy tờ sau:',
        sublist: [
            {
                title: 'Hộ chiếu',
                content: 'Còn thời hạn ít nhất 6 tháng.',
            },
            {
                title: 'Bằng cấp và bảng điểm',
                content: 'Dịch thuật và công chứng sang tiếng Anh hoặc tiếng Trung.',
            },
            {
                title: 'Chứng chỉ ngoại ngữ',
                content: 'HSK/HSKK hoặc IELTS/TOEFL.',
            },
            {
                title: 'Thư giới thiệu',
                content: 'Thường yêu cầu từ 1–2 thư giới thiệu từ giáo sư/giảng viên đối với hệ thạc sĩ và tiến sĩ.',
            },
            {
                title: 'Giấy khám sức khỏe',
                content: 'Theo mẫu quy định.',
            },
            {
                title: 'Ảnh thẻ và giấy tờ tùy thân khác',
                content: null,
            },
        ],
    },
];

const { Step } = Steps;

function China() {
    const handleImageError = (e) => {
        e.target.onerror = null; // tránh vòng lặp vô hạn nếu placeholder lỗi
        e.target.src = '/assets/img/placeholder_img.png';
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Điều kiện du học Trung Quốc năm 2025 cho sinh viên Việt Nam | PION</title>
                <meta
                    name="description"
                    content="Tìm hiểu chi tiết du học Trung Quốc 2025: điều kiện, học bổng, chi phí, hồ sơ và kinh nghiệm thực tế giúp bạn dễ dàng chinh phục ước mơ du học."
                />
            </Helmet>

            <section className={cx('heading')}>
                <h1>Điều kiện du học Trung Quốc năm 2025 cho sinh viên Việt Nam</h1>
                <p>
                    Du học Trung Quốc đang trở thành xu hướng mới năm 2025 bởi học phí du học còn rẻ hơn học Đại học tại
                    Việt Nam, với đa dạng ngành học thuộc nhóm top đầu khu vực.
                </p>

                <p>
                    Bạn đang tìm kiếm một bệ phóng vững chắc cho tương lai với chi phí hợp lý và chất lượng giáo dục
                    hàng đầu? <strong>Du học Trung Quốc</strong> chính là đáp án hoàn hảo. Với sự phát triển vượt bậc về
                    kinh tế và khoa học công nghệ, Trung Quốc không chỉ là "công xưởng của thế giới" mà còn là một trung
                    tâm giáo dục quốc tế đầy tiềm năng. Bài viết này sẽ cung cấp cho bạn những thông tin chi tiết và cập
                    nhật nhất về điều kiện du học Trung Quốc, giúp bạn có sự chuẩn bị tốt nhất cho hành trình sắp tới.
                </p>
                {/* <figure className={cx('image-wrapper')}>
                    <img src="/assets/img/du_hoc/china_05.jpg" alt="" className={cx('content-image')} loading="lazy" />
                    <figcaption>
                        Sinh viên quốc tế tại Trung Quốc – Hành trình học tập và khám phá văn hóa phương Đông
                    </figcaption>
                </figure> */}
            </section>

            <section className={cx('content')}>
                {/* Item 1 - why */}
                <ContentItem
                    title="Du học Trung Quốc mở ra cơ hội nghề nghiệp triển vọng"
                    description="Trước khi đi sâu vào các điều kiện, hãy cùng điểm qua những ưu điểm nổi bật khiến Trung Quốc trở thành điểm đến lý tưởng cho sinh viên Việt Nam:"
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
                                            onError={handleImageError}
                                        />
                                        <figcaption>{item.image.caption}</figcaption>
                                    </figure>
                                )}
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 2 - factor */}
                <ContentItem
                    title="Điều kiện du học Trung Quốc 2025 cho sinh viên Việt Nam"
                    description="Để thành công trong việc nộp hồ sơ du học Trung Quốc, bạn cần đáp ứng các điều kiện cơ bản về học vấn, ngôn ngữ và tài chính. Dưới đây là những yêu cầu chi tiết nhất:"
                >
                    {/* <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/du_hoc/china_06.jpg"
                            alt=""
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>
                            Guilin University of Technology (桂林理工大学) – Trường Đại học Công nghệ Quế Lâm, Trung
                            Quốc
                        </figcaption>
                    </figure> */}
                    <ul className={cx('factors-list', 'icon-list')}>
                        {factorItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>
                                    {item.content && <p>{item.content}</p>}

                                    {item.sublist && (
                                        <ul className={cx('sub-list')}>
                                            {item.sublist.map((sub, index) => (
                                                <li key={index}>
                                                    <p>
                                                        <span>{sub.title}: </span>
                                                        {sub.content}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {item.image && (
                                    <figure className={cx('image-wrapper')}>
                                        <img
                                            src={item.image.src}
                                            alt={item.image.alt}
                                            className={cx('content-image')}
                                            loading="lazy"
                                            onError={handleImageError}
                                        />
                                        <figcaption>{item.image.caption}</figcaption>
                                    </figure>
                                )}
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 3 */}
                <ContentItem
                    title="Những điều cần chuẩn bị cho hồ sơ du học 2025"
                    description="Để đảm bảo hồ sơ của bạn nổi bật và có cơ hội cao nhận được học bổng, hãy chuẩn bị các giấy tờ sau:"
                >
                    <ul className={cx('factors-list', 'icon-list')}>
                        {prepItems2025.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div>
                                    {item.sublist && (
                                        <ul className={cx('sub-list')}>
                                            {item.sublist.map((sub, index) => (
                                                <li key={index}>
                                                    <p>
                                                        <span>
                                                            {sub.title}
                                                            {sub.content ? ': ' : ''}
                                                        </span>
                                                        {sub.content}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 4 */}
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

                {/* Item 5 - conclusion*/}
                <ContentItem title="Kết luận" description="">
                    <div>
                        <p>
                            <strong>Du học Trung Quốc</strong> đang mở ra một cánh cửa lớn cho những ai muốn đầu tư vào
                            tương lai. Với chất lượng giáo dục vượt trội, chi phí hợp lý, và vô vàn cơ hội học bổng, đây
                            thực sự là một lựa chọn đáng cân nhắc. Hy vọng những thông tin về
                            <strong> điều kiện du học Trung Quốc 2025</strong> này sẽ giúp bạn có cái nhìn tổng quan và
                            chuẩn bị hành trang một cách tốt nhất.
                        </p>

                        <p>
                            Đừng chần chừ, hãy bắt đầu chuẩn bị hồ sơ ngay hôm nay để biến giấc mơ du học Trung Quốc
                            thành hiện thực!
                        </p>
                    </div>
                </ContentItem>
            </section>
            {/* <RelatedContent /> */}
            <ContactForm />
        </div>
    );
}

export default China;
