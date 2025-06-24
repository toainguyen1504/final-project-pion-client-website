// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NavTop.module.scss'; // Import CSS module
import { FaPhoneSquareAlt, FaEnvelope } from 'react-icons/fa';
const cx = classNames.bind(styles);

export default function NavTop({ hidden }) {
    return (
        <nav className={cx('wrapper', { hidden })}>
            <div className={cx('inner')}>
                {/* Navigation Links */}
                <ul className={cx('nav-links')}>
                    {/* <li>
                        <Link to="/du-hoc-nghe-duc">Du học nghề Đức</Link>
                    </li> */}
                    <li>
                        <Link to="/du-hoc-trung-quoc">Du học Trung Quốc</Link>
                    </li>
                    {/* <li>
                        <Link to="/du-hoc-han-quoc">Du học Hàn Quốc</Link>
                    </li> */}
                </ul>

                {/* Contact Info */}
                <div className={cx('contact')}>
                    <div className={cx('contact-email')}>
                        <FaEnvelope size={20} /> <span>info@pion.edu.vn</span>
                    </div>
                    <div className={cx('contact-phone')}>
                        <FaPhoneSquareAlt size={20} /> <span>0899 363 369</span>
                    </div>
                    {/* Should optimize = Button component */}
                    {/* <div className={cx('contact-fanpage')}>
                        <a
                            href="https://www.facebook.com/duhocpionglobal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                    </div> */}
                </div>
            </div>
        </nav>
    );
}
