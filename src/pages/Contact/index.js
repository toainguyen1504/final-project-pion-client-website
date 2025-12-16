import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import ContactForm from '@/components/ContactForm';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <>
            <Helmet>
                <title>Liên hệ | PION</title>
                <meta name="description" content="Thông tin liên hệ PION" />
            </Helmet>
            <div className={cx('contact')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title={'Thông tin liên hệ'} />
                </div>
                <h2> Liên hệ</h2>
                <p>Hãy kết nối với chúng tôi qua các kênh liên lạc bên dưới.</p>

                <div className={cx('contact-body')}>
                    <article className={cx('contact-info')}>
                        <h3>Thông tin liên hệ</h3>
                        <p>
                            <span>Hotline đào tạo: </span>
                            <a href="tel:0899363369" className={cx('link')}>
                                0899.363.369
                            </a>
                        </p>
                        <p>
                            <span>Hotline du học: </span>
                            <a href="tel:0901900677" className={cx('link')}>
                                0901.900.677
                            </a>
                        </p>
                        <p>
                            <span>Website: </span>
                            <a
                                href="https://www.pion.edu.vn/"
                                className={cx('link')}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                pion.edu.vn
                            </a>
                        </p>
                        <p>
                            <span>Email: </span> <a href="mailto:info@pion.edu.vn">info@pion.edu.vn</a>
                        </p>
                        <p>
                            <span>Trụ sở chính: </span> 125 Lê Lợi, P. Bồng Sơn, Tỉnh Gia Lai
                        </p>
                        <p>
                            <span>Văn phòng HCM: </span> Tòa BS9 Vinhomes Grand Park, Thủ Đức, TP.HCM
                        </p>
                    </article>

                    <article className={cx('contact-social')}>
                        <h3>Theo dõi Fanpage</h3>
                        <ul>
                            <li>
                                <a
                                    href="https://www.facebook.com/duhocpion"
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Trung tâm tiếng Trung
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/tienganhpionhoainhon/"
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Trung tâm tiếng Anh
                                </a>
                            </li>
                        </ul>
                    </article>

                    {/* Google Maps */}
                    <article className={cx('contact-map')}>
                        <iframe
                            title="Bản đồ văn phòng PION"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.428890318472!2d109.0051376!3d14.4298349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3168c5e42e236ba9%3A0x605e3ebcd4f7688!2sTrung%20T%C3%A2m%20Ngo%E1%BA%A1i%20Ng%E1%BB%AF%20v%C3%A0%20Du%20H%E1%BB%8Dc%20Pion!5e0!3m2!1svi!2s!4v1715635281234"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </article>

                    <ContactForm />
                </div>
            </div>
        </>
    );
}

export default Contact;
