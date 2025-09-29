import { Row, Col, Image } from 'antd';
import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const CeoInfo = () => {
    return (
        <section className={cx('ceo')}>
            <div className={cx('ceo-inner')}>
                <Row gutter={16} align="middle">
                    <Col
                        xs={24}
                        md={16}
                        lg={14}
                        className={cx('content-col')}
                        data-aos="fade-left"
                        data-aos-delay="400"
                    >
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>CEO ThS.</span>
                                <p>NGUYỄN THỊ KIM DANH</p>
                            </div>
                        </div>

                        <div className={cx('content')}>
                            <ul className={cx('content-list')}>
                                <li className={cx('content-item')}>
                                    <span>Học vấn:</span>
                                    <ul className={cx('sub-list')}>
                                        <li>Cử nhân giáo dục Hán ngữ quốc tế, Đại học Tô Châu, Trung Quốc.</li>
                                        {/* <li>Thạc sĩ giáo dục Hán Ngữ - Trường đại học sư phạm Quảng Tây</li> */}
                                        <li>Thạc sĩ Quản trị Kinh doanh (MBA), Đại học UBIS, Thụy Sĩ.</li>
                                    </ul>
                                </li>
                                <li className={cx('content-item')}>
                                    <span>Thành tích:</span>
                                    <ul className={cx('sub-list')}>
                                        <li>Chứng chỉ HSK cấp 6.</li>
                                        <li>Chứng chỉ IELTS 7.5.</li>
                                        <li>Chứng chỉ nghiệp vụ sư phạm cao đẳng/đại học.</li>
                                    </ul>
                                </li>
                                <li className={cx('content-item')}>
                                    <span>Kinh nghiệm:</span>
                                    <ul className={cx('sub-list')}>
                                        <li>Giảng viên tại nhiều trường cao đẳng/đại học tại TP.HCM.</li>
                                        <li>Kinh nghiệm học tập và làm việc tại Trung Quốc và Thụy Sĩ.</li>
                                        <li>
                                            Giám đốc điều hành Công ty Cổ phần Pion - với lĩnh vực đào tạo tiếng Anh,
                                            tiếng Trung & Du học Trung Quốc
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} md={8} lg={10} className={cx('img-col')} data-aos="fade-right" data-aos-delay="400">
                        <figure className={cx('ceo-figure')}>
                            <Image
                                src="/assets/img/about/ceo2.jpg"
                                alt="Nguyễn Thị Kim Danh"
                                preview={false}
                                className={cx('ceo-image')}
                            />
                        </figure>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default CeoInfo;
