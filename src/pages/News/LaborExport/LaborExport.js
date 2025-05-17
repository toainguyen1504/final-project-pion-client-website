import classNames from 'classnames/bind';
import { RiQuillPenFill } from 'react-icons/ri';
import { slugify } from '@/utils';
import styles from './LaborExport.module.scss'; // Css

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

const germanItems = [
    {
        title: 'Nhu cầu nhân lực lớn trong các lĩnh vực trọng điểm',
        content:
            'Quốc gia này đang đối mặt với tình trạng thiếu hụt lao động nghiêm trọng trong các ngành kỹ thuật và dịch vụ. Những lĩnh vực như chăm sóc sức khỏe, kỹ thuật cơ khí, CNTT hay ngành du lịch – nhà hàng luôn rộng cửa chào đón lao động có kỹ năng và tay nghề cao từ Việt Nam.',
    },
    {
        title: 'Tiêu chuẩn rõ ràng về chuyên môn và ngôn ngữ',
        content:
            'Để có thể làm việc tại Đức, người lao động cần đạt trình độ tiếng Đức tối thiểu từ B1 đến B2, đồng thời phải có bằng cấp chuyên môn phù hợp với vị trí ứng tuyển. Những yêu cầu này không chỉ là điều kiện cần thiết mà còn giúp ứng viên hòa nhập nhanh chóng vào môi trường làm việc chuyên nghiệp tại châu Âu.',
    },
    {
        title: 'Mức thu nhập hấp dẫn và cơ hội định cư lâu dài',
        content:
            'Người lao động có thể nhận mức lương trung bình từ 2.500 đến 3.500 EUR/tháng. Bên cạnh thu nhập ổn định, Đức còn có các chính sách visa thông thoáng và hỗ trợ người lao động nước ngoài trong việc xin định cư nếu có nhu cầu gắn bó lâu dài.',
    },
];

const hungaryItems = [
    {
        title: 'Cơ hội việc làm trong các ngành thiết yếu',
        content:
            'Với nền công nghiệp đang trên đà phát triển, Hungary mở ra nhiều vị trí việc làm cho lao động phổ thông, nhất là trong lĩnh vực chế biến thực phẩm, xây dựng và các ngành sản xuất cơ bản. Đây là cơ hội tốt cho những ai đang tìm kiếm môi trường làm việc ổn định tại châu Âu.',
    },
    {
        title: 'Yêu cầu không quá khắt khe, chú trọng thái độ làm việc',
        content:
            'Khác với nhiều quốc gia khác, Hungary không đòi hỏi bằng cấp quá cao mà ưu tiên người lao động có kỹ năng cơ bản và tinh thần làm việc nghiêm túc, chăm chỉ. Đây là lợi thế lớn cho những ứng viên chưa có nhiều kinh nghiệm hoặc không sở hữu trình độ học vấn cao.',
    },
    {
        title: 'Thu nhập ổn định, thủ tục đơn giản',
        content:
            'Mức lương tại Hungary dao động từ 1.200 đến 1.800 EUR/tháng, đủ để người lao động trang trải cuộc sống và tích lũy. Thêm vào đó, quy trình đăng ký đi làm việc tại Hungary khá nhanh chóng, chi phí hợp lý, giúp giảm bớt gánh nặng tài chính ban đầu cho người lao động.',
    },
];

const bulgariaItems = [
    {
        title: 'Cơ hội việc làm rộng mở ở nhiều lĩnh vực',
        content:
            'Các ngành như trồng trọt, chế biến, sản xuất và dịch vụ du lịch tại Bulgaria đang thiếu hụt lao động, mở ra nhiều cơ hội cho người Việt muốn làm việc tại môi trường châu Âu ổn định nhưng không quá khắt khe.',
    },
    {
        title: 'Không đòi hỏi cao về kinh nghiệm, được đào tạo tại chỗ',
        content:
            'Phần lớn các vị trí không yêu cầu trình độ chuyên môn cao. Người lao động chỉ cần có thái độ tích cực, chăm chỉ và tuân thủ kỷ luật là có thể được nhận và được đào tạo ngay tại nơi làm việc.',
    },
    {
        title: 'Chi phí thấp, thủ tục nhanh chóng',
        content:
            'Với mức lương trung bình từ 800 đến 1.200 EUR/tháng, Bulgaria mang lại nguồn thu nhập ổn định cho người lao động phổ thông. Bên cạnh đó, quy trình hồ sơ và xin visa khá đơn giản, cùng với môi trường làm việc thân thiện, giúp người lao động nhanh chóng thích nghi và ổn định cuộc sống.',
    },
];

const slovakiaItems = [
    {
        title: 'Nhu cầu cao trong các ngành công nghiệp và dịch vụ',
        content:
            'Các lĩnh vực như công nghiệp chế tạo, logistics và dịch vụ chăm sóc khách hàng đang thiếu hụt nhân lực trầm trọng. Đây là cơ hội lớn cho người lao động Việt Nam tiếp cận với các công việc có tính ổn định và mức đãi ngộ tốt.',
    },
    {
        title: 'Yêu cầu không quá khắt khe',
        content:
            'Người lao động chỉ cần có kỹ năng cơ bản và thái độ làm việc nghiêm túc. Biết tiếng Anh hoặc tiếng Slovakia sẽ là một lợi thế giúp nhanh chóng hòa nhập và nắm bắt công việc hiệu quả.',
    },
    {
        title: 'Mức lương tốt, nhiều chính sách hỗ trợ',
        content:
            'Thu nhập trung bình dao động từ 1.000 – 1.500 EUR/tháng, đủ để đảm bảo cuộc sống và tích lũy. Ngoài ra, Slovakia còn có các chính sách phúc lợi xã hội tương đối tốt và mở ra cơ hội định cư lâu dài cho người lao động nước ngoài.',
    },
];

const baLanItems = [
    {
        title: 'Đa dạng ngành nghề, nhu cầu tuyển dụng cao',
        content:
            'Các ngành như chế biến thực phẩm, lắp ráp linh kiện, dệt may, kho vận và sản xuất công nghiệp liên tục tìm kiếm nhân lực mới. Với nhu cầu tuyển dụng không ngừng tăng, người lao động có nhiều lựa chọn phù hợp với kỹ năng và kinh nghiệm của mình.',
    },
    {
        title: 'Điều kiện tuyển dụng đơn giản, dễ tiếp cận',
        content:
            'Ba Lan không yêu cầu trình độ học vấn cao, chỉ cần sức khỏe tốt, tác phong làm việc nghiêm túc và sẵn sàng tuân thủ quy trình. Người lao động thường được đào tạo ngắn hạn trước khi bắt đầu công việc, giúp họ hòa nhập và làm quen với môi trường nhanh chóng.',
    },
    {
        title: 'Mức lương ổn định, cơ hội phát triển dài hạn',
        content:
            'Thu nhập trung bình từ 1.000 – 1.500 EUR/tháng, tùy thuộc vào ngành nghề và vị trí làm việc. Chi phí sinh hoạt hợp lý giúp người lao động có thể tiết kiệm và tích lũy sau một thời gian làm việc. Đặc biệt, nếu làm việc hiệu quả, người lao động có thể được gia hạn hợp đồng hoặc chuyển đổi sang visa dài hạn để tiếp tục gắn bó với công việc tại Ba Lan.',
    },
    {
        title: 'Lợi thế cho lao động Việt Nam',
        content:
            'Ba Lan có nhiều chính sách hỗ trợ dành cho lao động nước ngoài, từ chỗ ở, bảo hiểm đến quyền lợi lao động. Ngoài ra, yêu cầu về ngôn ngữ không quá khắt khe, phù hợp với lao động phổ thông. Nếu biết tiếng Anh hoặc tiếng Ba Lan, người lao động sẽ có cơ hội thăng tiến và mở rộng phạm vi công việc.',
    },
];

function LaborExport() {
    const currentYear = new Date().getFullYear();

    return (
        <div className={cx('wrapper')}>
            <section className={cx('heading')}>
                <h1>Xuất khẩu lao động {currentYear}: Nên chọn quốc gia nào?</h1>
                <p>
                    Năm {currentYear}, châu Âu tiếp tục khẳng định vị thế là điểm đến hấp dẫn đối với lao động Việt Nam
                    nhờ cơ hội việc làm dồi dào, mức thu nhập cao cùng với chất lượng cuộc sống vượt trội. Tuy nhiên, để
                    lựa chọn được quốc gia phù hợp, người lao động cần cân nhắc kỹ lưỡng nhiều yếu tố như đặc thù ngành
                    nghề, khả năng ngôn ngữ và chính sách nhập cư của từng nước. Trong bài viết này, Pion sẽ cùng bạn
                    khám phá những quốc gia châu Âu triển vọng nhất cho hành trình xuất khẩu lao động năm {currentYear}.
                </p>
            </section>
            <section className={cx('content')}>
                {/* Item 1 */}
                <ContentItem
                    title="Đức – Điểm đến lý tưởng cho nhiều ngành nghề"
                    description="Là một trong những quốc gia phát triển bậc nhất châu Âu, Đức mở ra nhiều cơ hội việc làm nổi bật trong các ngành như điều dưỡng, cơ khí, công nghệ thông tin và dịch vụ khách sạn – nhà hàng. Với nền kinh tế ổn định và chính sách thu hút nhân lực quốc tế, Đức đang trở thành lựa chọn ưu tiên của nhiều lao động Việt Nam."
                >
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/du_hoc/german2.jpg"
                            alt="Đức"
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>Đức – Điểm đến lý tưởng cho nhiều ngành nghề</figcaption>
                    </figure>
                    <ul className={cx('german-list', 'icon-list')}>
                        {germanItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 2 */}
                <ContentItem
                    title="Hungary – Thị trường mới nổi cho lao động Việt Nam"
                    description="Hungary đang dần khẳng định vị thế là một thị trường mới nổi tại châu Âu dành cho người lao động Việt Nam, đặc biệt trong các ngành nghề có nhu cầu tuyển dụng cao như sản xuất, chế biến thực phẩm và xây dựng."
                >
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/xkld/hungary_02.jpg"
                            alt="Hungary"
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>Hungary – Thị trường mới nổi cho lao động Việt Nam</figcaption>
                    </figure>
                    <ul className={cx('hungary-list', 'icon-list')}>
                        {hungaryItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 3 */}
                <ContentItem
                    title="Bulgaria – Điểm đến hấp dẫn cho lao động phổ thông tại châu Âu"
                    description="Trong những năm gần đây, Bulgaria nổi lên như một lựa chọn sáng giá cho người lao động Việt Nam nhờ vào nhu cầu tuyển dụng lớn trong nhiều lĩnh vực thiết yếu như nông nghiệp, sản xuất công nghiệp và dịch vụ du lịch."
                >
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/xkld/bulgaria_02.jpg"
                            alt="Bulgaria"
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>Bulgaria – Điểm đến hấp dẫn cho lao động phổ thông tại châu Âu</figcaption>
                    </figure>
                    <ul className={cx('bulgaria-list', 'icon-list')}>
                        {bulgariaItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 4 */}
                <ContentItem
                    title="Slovakia – Môi trường làm việc hấp dẫn cho người lao động Việt Nam"
                    description="Slovakia ngày càng được nhiều người lao động lựa chọn nhờ môi trường làm việc thân thiện, ổn định và nhiều chính sách thu hút nhân lực quốc tế."
                >
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/xkld/slovakia_02.jpg"
                            alt="Slovakia"
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>Slovakia – Môi trường làm việc hấp dẫn cho người lao động Việt Nam</figcaption>
                    </figure>
                    <ul className={cx('slovakia-list', 'icon-list')}>
                        {slovakiaItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 5 */}
                <ContentItem
                    title="Ba Lan – Điểm đến ổn định cho lao động phổ thông Việt Nam"
                    description="Ba Lan đang trở thành điểm đến hấp dẫn cho lao động Việt Nam nhờ chính sách tuyển dụng linh hoạt và nhu cầu nhân lực tăng cao trong nhiều lĩnh vực. Đặc biệt, lao động phổ thông có thể tiếp cận thị trường này với mức đãi ngộ tốt và cơ hội phát triển lâu dài."
                >
                    <figure className={cx('image-wrapper')}>
                        <img
                            src="/assets/img/xkld/balan_02.jpg"
                            alt="Ba Lan"
                            className={cx('content-image')}
                            loading="lazy"
                        />
                        <figcaption>Ba Lan – Điểm đến ổn định cho lao động phổ thông Việt Nam</figcaption>
                    </figure>
                    <ul className={cx('baLan-list', 'icon-list')}>
                        {baLanItems.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('icon-title')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <h3 id={slugify(item.title)} className={cx('sub-title')}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div>{item.content}</div>
                            </li>
                        ))}
                    </ul>
                </ContentItem>

                {/* Item 6 */}
                <ContentItem
                    title="Vì sao nên chọn PION đồng hành?"
                    description="PION tự hào là đơn vị tư vấn hàng đầu trong lĩnh vực xuất nhập khẩu lao động Châu Âu, mang đến giải pháp toàn diện giúp người lao động Việt Nam tiếp cận cơ hội việc làm quốc tế một cách dễ dàng và hiệu quả."
                >
                    <ul className={cx('pion-list', 'list-normal')}>
                        <li>
                            <span>Tư vấn chuyên nghiệp: </span>Định hướng quốc gia và ngành nghề phù hợp với nhu cầu,
                            giúp bạn chọn lựa lộ trình tốt nhất.
                        </li>
                        <li>
                            <span>Hỗ trợ học ngôn ngữ: </span>Các khóa học tiếng Đức, tiếng Anh đạt chuẩn quốc tế, giúp
                            bạn tự tin hội nhập.
                        </li>
                        <li>
                            <span>Xử lý hồ sơ trọn gói: </span>Từ dịch thuật, chuẩn bị giấy tờ đến xin Visa, đảm bảo thủ
                            tục suôn sẻ, nhanh chóng.
                        </li>
                        <li>
                            <span>Đồng hành tại nước ngoài: </span>Luôn sát cánh cùng người lao động, hỗ trợ ổn định
                            cuộc sống và hòa nhập môi trường mới.
                        </li>
                    </ul>

                    <p>
                        Với PION, bạn không chỉ tìm kiếm một công việc mà còn mở ra cánh cửa sự nghiệp vững chắc tại
                        Châu Âu!
                    </p>
                </ContentItem>
            </section>
        </div>
    );
}

export default LaborExport;
