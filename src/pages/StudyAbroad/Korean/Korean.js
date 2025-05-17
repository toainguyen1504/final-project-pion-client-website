import classNames from 'classnames/bind';
import { RiQuillPenFill } from 'react-icons/ri';

import RelatedContent from '@/components/RelatedContent';
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
        title: 'Chất lượng giáo dục xuất sắc',
        content:
            'Các trường đại học tại Hàn Quốc, đặc biệt là những trường như Seoul National University, KAIST, và POSTECH, luôn nằm trong top các trường hàng đầu thế giới. Chương trình học tại đây không chỉ cung cấp kiến thức chuyên môn vững vàng mà còn giúp sinh viên phát triển kỹ năng nghiên cứu, sáng tạo, và giải quyết vấn đề.',
    },
    {
        title: 'Chi phí hợp lý',
        content:
            'Hàn Quốc không chỉ nổi bật với chất lượng giáo dục xuất sắc mà còn là điểm đến du học với chi phí hợp lý. Với mức học phí chỉ từ khoảng 150 triệu đồng, bạn có thể theo học tại các trường đại học hàng đầu của Hàn Quốc, nơi cung cấp các chương trình học tập đa dạng và tiên tiến. Đây là một cơ hội tuyệt vời cho các sinh viên quốc tế muốn có một nền giáo dục chất lượng với chi phí phải chăng, đồng thời trải nghiệm môi trường sống và học tập hiện đại tại xứ sở Kim Chi.',
    },
    {
        title: 'Du học Hàn Quốc vừa học vừa làm',
        content: (
            <>
                <p>
                    Đầu tiên, bạn cần biết tỷ giá tiền Hàn Quốc: 1.000 Won tương đương khoảng 20.000 VNĐ (Won là đơn vị
                    tiền tệ của Hàn Quốc).
                </p>
                <p>
                    Hiện nay, mức thu nhập tối thiểu cho một giờ làm thêm của du học sinh tại Hàn Quốc vào năm 2025 là
                    khoảng 8.590 Won, tương đương khoảng 172.000 VNĐ mỗi giờ, cao gấp 10 lần so với mức thu nhập từ công
                    việc làm thêm tại Việt Nam. Các công việc làm thêm phổ biến cho du học sinh tại Hàn Quốc:
                </p>
                <ul className={cx('list-normal')}>
                    <li>Các công việc liên quan trực tiếp đến chuyên ngành học của du học sinh.</li>
                    <li>Công việc tại các quán ăn, siêu thị, tiệm café.</li>
                    <li>
                        Công việc trong trường học như quản lý thư viện, trợ giảng, tham gia các dự án nghiên cứu, thí
                        nghiệm.
                    </li>
                    <li>Công việc phiên dịch, hỗ trợ kinh doanh, phát báo, hoặc làm hướng dẫn viên du lịch.</li>
                </ul>
                <p>
                    Với sinh viên đại học làm việc khoảng 28 giờ mỗi tuần (4 giờ mỗi ngày), mức lương tối thiểu 172.000
                    VNĐ mỗi giờ, bạn có thể kiếm được khoảng 20 triệu VNĐ mỗi tháng, tương đương khoảng 240 triệu VNĐ
                    mỗi năm.
                </p>
            </>
        ),
        image: {
            src: '/assets/img/du_hoc/korean2.jpg',
            alt: 'Ảnh minh họa một số công việc làm thêm phổ biến của du học sinh',
            caption: 'Ảnh minh họa một số công việc làm thêm phổ biến của du học sinh',
        },
    },
];

const factorItems = [
    {
        title: 'Sức khỏe là yếu tố quyết định',
        content: (
            <>
                <p>
                    Sức khỏe là một trong ba yếu tố quan trọng để du học Hàn Quốc thành công. Nếu bạn mắc phải một trong
                    những bệnh dưới đây, bạn sẽ không thể xin được visa du học Hàn Quốc:
                </p>
                <ul className={cx('list-normal')}>
                    <li>
                        <span>Bệnh lao hoặc lao phổi</span>: Lao và lao phổi là những bệnh truyền nhiễm rất dễ lây qua
                        đường hô hấp. Nếu mắc phải bệnh này, bạn sẽ không được cấp visa nhập cảnh vào Hàn Quốc để ngăn
                        ngừa sự lây lan của bệnh. Tuy nhiên, đừng lo lắng quá vì với sự phát triển của y học hiện nay,
                        việc chữa trị bệnh này hoàn toàn khả thi. Sau khi điều trị, bạn có thể phục hồi và tiếp tục thực
                        hiện ước mơ du học.
                    </li>
                    <li>
                        <span>Bệnh cúm gia cầm H5N1, H7N9 và các bệnh truyền nhiễm nguy hiểm</span>: Các bệnh như cúm
                        gia cầm H5N1 và H7N9 đã gây ra hậu quả nghiêm trọng với tỷ lệ tử vong cao ở nhiều quốc gia. Vì
                        lý do này, người mắc bệnh sẽ không được phép nhập cảnh vào Hàn Quốc nhằm ngăn ngừa dịch bệnh lây
                        lan và đảm bảo sức khỏe cộng đồng. Các quốc gia khác cũng áp dụng chính sách tương tự để bảo vệ
                        người dân.
                    </li>
                    <li>
                        <span>Viêm gan B và các bệnh truyền nhiễm khác</span>: Viêm gan B là một bệnh có nguy cơ lây
                        lan, nhưng mức độ nguy hiểm không quá cao. Do đó, nếu bạn mắc bệnh viêm gan B, bạn vẫn có thể đi
                        du học Hàn Quốc. Tương tự, một số bệnh truyền nhiễm khác như giang mai, lậu… cũng không ảnh
                        hưởng đến khả năng nhập cảnh vào Hàn Quốc. Tuy nhiên, một số trường đại học tại Hàn Quốc có yêu
                        cầu sức khỏe rất nghiêm ngặt, vì vậy bạn nên kiểm tra sức khỏe thường xuyên và tìm hiểu kỹ các
                        yêu cầu sức khỏe của trường mình định học.
                    </li>
                </ul>
                <p>
                    Để tránh bị đánh trượt visa, hãy chắc chắn rằng bạn đã kiểm tra sức khỏe đầy đủ và kịp thời điều trị
                    nếu mắc các bệnh truyền nhiễm. Việc chuẩn bị kỹ lưỡng sẽ giúp bạn thuận lợi hơn trong quá trình xin
                    visa và du học Hàn Quốc.
                </p>
            </>
        ),
    },
    {
        title: 'Điều kiện về tiền án, tiền sự',
        content:
            'Để xin visa du học Hàn Quốc, bạn cần phải đảm bảo rằng trong hồ sơ cá nhân không có bất kỳ tiền án, tiền sự nào liên quan đến hành vi vi phạm pháp luật khi sống và làm việc tại Việt Nam. Đây là một yêu cầu ngày càng trở nên nghiêm ngặt tại Hàn Quốc, nhằm đảm bảo an ninh và sự tuân thủ pháp luật của du học sinh trong suốt thời gian học tập tại quốc gia này.',
    },
    {
        title: 'Điều kiện về xuất nhập cảnh và nhân thân',
        content:
            'Để đủ điều kiện du học tại Hàn Quốc, bạn không được nằm trong diện bị cấm xuất cảnh tại Việt Nam hay bị cấm nhập cảnh vào Hàn Quốc. Bên cạnh đó, bạn cũng không được có người thân (theo sổ hộ khẩu) đã và đang sinh sống trái phép tại Hàn Quốc, điều này là một trong những yêu cầu quan trọng để đảm bảo bạn không gặp trở ngại trong quá trình làm thủ tục visa du học.',
    },
    {
        title: 'Điều kiện chứng minh tài chính và thu nhập của người bảo lãnh',
        content: (
            <>
                <p>
                    Để có thể chứng minh đủ điều kiện tài chính cho việc du học, bạn cần chuẩn bị ba loại giấy tờ quan
                    trọng: sổ tiết kiệm, giấy tờ chứng minh thu nhập và giấy cam kết bảo lãnh tài chính. Nếu có các tài
                    sản giá trị như ô tô hoặc bất động sản, bạn cũng có thể bổ sung thêm giấy tờ liên quan để gia tăng
                    cơ hội đạt visa du học Hàn Quốc.
                </p>
                <ul className={cx('list-normal')}>
                    <li>
                        <span>Sổ tiết kiệm</span>: Sổ tiết kiệm phải đứng tên bạn, bố mẹ hoặc người giám hộ (nếu bố mẹ
                        không còn). Số tiền trong sổ tiết kiệm cần đạt ít nhất 10.000 USD và được gửi tại ngân hàng ít
                        nhất từ 3-6 tháng tính từ ngày nộp hồ sơ xin visa. Để biết thêm chi tiết, bạn có thể liên hệ để
                        nhận tư vấn miễn phí.
                    </li>
                    <li>
                        <span>Giấy tờ chứng minh thu nhập hàng tháng</span>: Người bảo lãnh du học phải chứng minh thu
                        nhập hàng tháng từ 30 triệu đồng trở lên, với nguồn thu rõ ràng, minh bạch thông qua các giấy tờ
                        chứng minh thu nhập hợp lệ. Nếu cần hỗ trợ thêm, bạn có thể liên hệ để được tư vấn miễn phí.
                    </li>
                    <li>
                        <span>Giấy cam kết bảo lãnh tài chính</span>: Giấy cam kết bảo lãnh tài chính là bắt buộc đối
                        với người đi du học, và người bảo lãnh thường là bố mẹ. Nếu bố mẹ không còn, người thân ruột
                        thịt (như ông bà, anh chị em, cô dì chú bác…) trong sổ hộ khẩu sẽ đảm nhận vai trò bảo lãnh. Lưu
                        ý rằng giấy cam kết này cần được xác thực bởi địa phương để có giá trị pháp lý.
                    </li>
                </ul>
                <p>
                    Như vậy, việc chuẩn bị đầy đủ các giấy tờ chứng minh tài chính là yếu tố quan trọng giúp bạn nâng
                    cao khả năng được cấp visa du học Hàn Quốc.
                </p>
            </>
        ),
    },
    {
        title: 'Điều kiện phỏng vấn Visa với Đại sứ quán',
        content: (
            <>
                <p>
                    Để tham gia phỏng vấn visa du học Hàn Quốc, bạn cần lưu ý rằng trong vòng 6 tháng gần nhất, bạn
                    không được trượt phỏng vấn visa với Đại sứ Quán. Sau khi bị trượt visa, bạn phải đợi ít nhất 6 tháng
                    mới có thể nộp lại hồ sơ xin visa.
                </p>
                <p>
                    Nếu bạn chưa rõ quy trình và cách thức phỏng vấn xin visa du học Hàn Quốc, đừng ngần ngại liên hệ
                    hoặc đăng ký với Pion. Chúng tôi sẽ cung cấp cho bạn sự hỗ trợ chi tiết và kịp thời nhất để giúp bạn
                    chuẩn bị tốt nhất cho cuộc phỏng vấn visa!
                </p>
            </>
        ),
        image: {
            src: '/assets/img/du_hoc/korean3.jpg',
            alt: 'Chuẩn bị kỹ càng trước khi phỏng vấn Visa du học Hàn Quốc',
            caption: 'Chuẩn bị kỹ càng trước khi phỏng vấn Visa du học Hàn Quốc',
        },
    },
];

function Korean() {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('heading')}>
                <h1>Hàn Quốc – điểm đến du học hấp dẫn với nhiều cơ hội nghề nghiệp</h1>
                <p>
                    Hiện nay, Hàn Quốc vẫn là một trong những lựa chọn ưu tiên của nhiều học sinh, sinh viên Việt Nam
                    khi quyết định du học. Không chỉ nổi bật với nền giáo dục tiên tiến, xứ sở Kim Chi còn mang đến
                    nhiều triển vọng nghề nghiệp và thu nhập ổn định sau khi hoàn thành chương trình học. Đây là lý do
                    ngày càng có nhiều bạn trẻ chọn Hàn Quốc làm nơi xây dựng tương lai.
                </p>
            </section>
            <section className={cx('content')}>
                {/* Item 1 */}
                <ContentItem
                    title="Ba lý do nên chọn du học tại Hàn Quốc"
                    description="Hàn Quốc không chỉ nổi bật với nền giáo dục chất lượng mà còn là một điểm đến lý tưởng cho những ai muốn khám phá nền văn hóa độc đáo và cơ hội nghề nghiệp hấp dẫn. Dưới đây là ba lý do chính tại sao bạn nên chọn Hàn Quốc làm nơi du học:"
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
                    title="Điều kiện du học Hàn Quốc 2025 cần những gì?"
                    description="Để có thể du học tại Hàn Quốc, bạn cần đáp ứng một số điều kiện cơ bản, trong đó sức khỏe là một yếu tố quan trọng. Dưới đây là những điều kiện cần lưu ý:"
                >
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
            </section>

            <RelatedContent />
        </div>
    );
}

export default Korean;
