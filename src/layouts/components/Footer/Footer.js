import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookSquare } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            {/* class 'top' and 'top-row-second' */}
            <div className={cx('top-row-second')}>
                <div className={cx('column')}>
                    <h4>PION</h4>
                    <ul>
                        <li>
                            <Link to="/gioi-thieu" className={cx('link')}>
                                Về chúng tôi
                            </Link>
                        </li>
                        <li>
                            <Link to="/cau-hoi-thuong-gap" className={cx('link')}>
                                Câu hỏi thường gặp
                            </Link>
                        </li>
                        <li>
                            <Link to="/lien-he" className={cx('link')}>
                                Liên hệ nhận ưu đãi
                            </Link>
                        </li>
                    </ul>
                    <p className={cx('highlight')}>
                        PION được đánh giá là công ty uy tín về lĩnh vực đào tạo ngoại ngữ và du học quốc tế.
                    </p>
                </div>
                <div className={cx('column')}>
                    <h4>Khóa học Tiếng Anh</h4>
                    <ul>
                        <li>
                            <Link to="/tieng-anh-mam-non" className={cx('link')}>
                                Tiếng anh mầm non
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-anh-tieu-hoc" className={cx('link')}>
                                Tiếng anh tiểu học
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-anh-giao-tiep" className={cx('link')}>
                                Tiếng Anh giao tiếp
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('column')}>
                    <h4>Khóa học Tiếng Trung</h4>
                    <ul>
                        <li>
                            <Link to="/tieng-trung-giao-tiep" className={cx('link')}>
                                Tiếng Trung giao tiếp
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-trung-tre-em" className={cx('link')}>
                                Tiếng Trung trẻ em
                            </Link>
                        </li>

                        <li>
                            <Link to="/hskk-tai-pion" className={cx('link')}>
                                HSK(K) Tại Pion
                            </Link>
                        </li>
                        <li>
                            <Link to="/csca-tai-pion" className={cx('link')}>
                                CSCA Tại Pion
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div className={cx('column')}>
                    <h4>Thông tin khóa học</h4>
                    <ul>
                        <li>
                            <Link to="#!" className={cx('link')}>
                                Lịch khai giảng
                            </Link>
                        </li>
                        <li>
                            <Link to="#!" className={cx('link')}>
                                Học phí
                            </Link>
                        </li>

                        <li>
                            <Link to="#!" className={cx('link')}>
                                Ưu đãi
                            </Link>
                        </li>
                        <li>
                            <Link to="#!" className={cx('link')}>
                                Phương pháp học
                            </Link>
                        </li>
                    </ul>
                </div> */}
                {/* <div className={cx('column')}>
                    <h4>Thông tin du học</h4>
                    <ul>
                        <li>
                            <Link to="/du-hoc-nghe-duc" className={cx('link')}>
                                Du học nghề Đức
                            </Link>
                        </li>
                        <li>
                            <Link to="/du-hoc-han-quoc" className={cx('link')}>
                                Du học Hàn Quốc
                            </Link>
                        </li>

                        <li>
                            <Link to="/tin-tuc/dieu-kien-du-hoc-trung-quoc-2025" className={cx('link')}>
                                Du học Trung Quốc
                            </Link>
                        </li>
                    </ul>
                </div> */}
                <div className={cx('column')}>
                    <h4>Tin tức</h4>
                    <ul>
                        {/* <li>
                            <Link to="/xuat-khau-lao-dong" className={cx('link')}>
                                Xuất khẩu lao động
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/tin-tuc/dieu-kien-du-hoc-trung-quoc-2025" className={cx('link')}>
                                Du học Trung Quốc
                            </Link>
                        </li>
                        <li>
                            <Link to="/tuyen-dung" className={cx('link')}>
                                Vị trí tuyển dụng
                            </Link>
                        </li>
                        <li>
                            <Link to="#!" className={cx('link')}>
                                Lịch khai giảng
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="#!" className={cx('link')}>
                                Học phí
                            </Link>
                        </li>

                        <li>
                            <Link to="#!" className={cx('link')}>
                                Ưu đãi
                            </Link>
                        </li> */}
                        <li>
                            <Link to="#!" className={cx('link')}>
                                Phương pháp học
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* 
            <div className={cx('top-row-second')}>
                <div className={cx('column')}>
                    <h4>Khóa học Tiếng Anh</h4>
                    <ul>
                        <li>
                            <Link to="/tieng-anh-mam-non" className={cx('link')}>
                                Tiếng anh mầm non
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-anh-tieu-hoc" className={cx('link')}>
                                Tiếng anh tiểu học
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-anh-giao-tiep" className={cx('link')}>
                                Tiếng Anh giao tiếp
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('column')}>
                    <h4>Khóa học Tiếng Trung</h4>
                    <ul>
                        <li>
                            <Link to="/tieng-trung-giao-tiep" className={cx('link')}>
                               Tiếng Trung giao tiếp
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-trung-tre-em" className={cx('link')}>
                                Tiếng Trung trẻ em
                            </Link>
                        </li>

                        <li>
                            <Link to="/hskk-tai-pion" className={cx('link')}>
                               HSK(K) Tại Pion
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('column')}>
                    <h4>Khóa học Tiếng Đức</h4>
                    <ul>
                        <li>
                            <Link to="/tieng-duc-online-1-kem-1" className={cx('link')}>
                                Tiếng Đức Online 1 kèm 1
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-duc-a1" className={cx('link')}>
                                Tiếng Đức A1
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-duc-a2" className={cx('link')}>
                                Tiếng Đức A2
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-duc-b1" className={cx('link')}>
                                Tiếng Đức B1
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-duc-b2" className={cx('link')}>
                                Tiếng Đức B2
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('column')}>
                    <h4>Khóa học Tiếng Hàn</h4>
                    <ul>
                        <li>
                            <Link to="/tieng-han-so-cap-1" className={cx('link')}>
                                Tiếng Hàn sơ cấp 1
                            </Link>
                        </li>
                        <li>
                            <Link to="/tieng-han-so-cap-2" className={cx('link')}>
                                Tiếng Hàn sơ cấp 2
                            </Link>
                        </li>
                        <li>
                            <Link to="/luyen-thi-topik-i" className={cx('link')}>
                                Luyện thi TOPIK I
                            </Link>
                        </li>
                        <li>
                            <Link to="/luyen-thi-topik-ii" className={cx('link')}>
                                Luyện thi TOPIK II
                            </Link>
                        </li>
                    </ul>
                </div>
            </div> */}

            <div className={cx('contact')}>
                <div>
                    <FaMapMarkerAlt size={28} className={cx('icon')} />
                    <p>
                        Trụ sở chính: <br />
                        125 Lê Lợi, P. Bồng Sơn, Tỉnh Gia Lai
                    </p>
                </div>
                <div>
                    <FaPhoneAlt size={28} className={cx('icon')} />
                    <p>
                        Hotline Pion English: 0899.363.369 <br />
                        Hotline Pion Chinese: 0899.108.678 <br />
                        Hotline du học: 0901.900.677
                    </p>
                </div>
                <div>
                    <FaEnvelope size={28} className={cx('icon')} />
                    <p>
                        Email: <br />
                        info@pion.edu.vn
                    </p>
                </div>
                <div className={cx('socials')}>
                    <FaFacebookSquare size={28} className={cx('icon')} />
                    <div className={cx('inner')}>
                        <a
                            href="https://www.facebook.com/tienganhpionhoainhon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cx('link')}
                        >
                            Tiếng Anh Pion
                        </a>
                        <a
                            href="https://www.facebook.com/duhocpion"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cx('link')}
                        >
                            Pion Global Bình Định
                        </a>

                        <a
                            href="https://www.facebook.com/duhocpionhcm/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cx('link')}
                        >
                            Pion Global HCM
                        </a>
                    </div>
                </div>
            </div>

            <div className={cx('bottom')}>
                <p>
                    Giấy phép hoạt động: 538/QĐ-SGDĐT & 628/QĐ-SGDĐT <br />
                    Made by Pion
                </p>
            </div>
        </footer>
    );
}

export default Footer;
