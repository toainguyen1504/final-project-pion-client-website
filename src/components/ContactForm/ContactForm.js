import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { message } from 'antd';

import HeadingStar from '@/components/HeadingStar';
import styles from './ContactForm.module.scss';

const cx = classNames.bind(styles);

const ContactForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        content: '',
        captchaChecked: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaChange = () => {
        setFormData({ ...formData, captchaChecked: !formData.captchaChecked });
    };

    //     const { fullName, phone, email, captchaChecked } = formData;
    //     if (!fullName || !phone || !email) {
    //         alert('Vui lòng điền đầy đủ thông tin!');
    //         return false;
    //     }
    //     if (!captchaChecked) {
    //         alert('Vui lòng xác nhận CAPTCHA!');
    //         return false;
    //     }
    //     return true;
    // };
    const validateForm = () => {
        let newErrors = {};

        if (
            !formData.fullName.trim() ||
            formData.fullName.length < 2 ||
            !/^[a-zA-ZÀ-Ỹà-ỹ\s]+$/.test(formData.fullName)
        ) {
            newErrors.fullName = 'Tên phải có ít nhất 2 ký tự và không chứa số hoặc ký tự đặc biệt!';
        }

        if (!/^0\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng số 0! (VD: 0912345678)';
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ! VD: abc@gmail.com';
        }

        if (formData.content.length > 200) {
            newErrors.content = 'Nội dung không được quá 200 ký tự!';
        }

        if (!formData.captchaChecked) {
            newErrors.captchaChecked = 'Bạn cần xác nhận CAPTCHA!';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return; // Done allow send if having err
        }

        if (!validateForm()) {
            message.error('Vui lòng kiểm tra lại thông tin!');
            setIsSubmitting(true); //block spam send data
            setTimeout(() => setIsSubmitting(false), 4000);
            return;
        }

        onSubmit?.(formData);
        localStorage.setItem('contactData', JSON.stringify(formData));

        message.success('Thông tin của bạn đã được gửi thành công!');
        setFormData({ fullName: '', phone: '', email: '', content: '', captchaChecked: false });
        setErrors({});
    };

    return (
        <section className={cx('contact')}>
            <HeadingStar title="ĐĂNG KÝ TƯ VẤN" />
            <form onSubmit={handleSubmit} className={cx('form')}>
                <div className={cx('row')}>
                    <div className={cx('input-wrapper')}>
                        <input
                            name="fullName"
                            className={cx('input')}
                            placeholder="Họ và tên (*)"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        {errors.fullName && <p className={cx('error')}>{errors.fullName}</p>}
                    </div>
                    <div className={cx('input-wrapper')}>
                        <input
                            name="phone"
                            className={cx('input')}
                            placeholder="Số điện thoại (*)"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <p className={cx('error')}>{errors.phone}</p>}
                    </div>
                </div>

                <div className={cx('row')}>
                    <div className={cx('input-wrapper', 'custom')}>
                        <input
                            name="email"
                            className={cx('input', 'email')}
                            placeholder="Email (*)"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className={cx('error')}>{errors.email}</p>}
                    </div>
                    <div className={cx('input-wrapper', 'custom')}>
                        <textarea
                            name="content"
                            className={cx('input', 'textarea')}
                            placeholder="Nội dung cần tư vấn"
                            value={formData.content}
                            onChange={handleChange}
                            rows={2}
                            maxLength={250}
                        />
                        {errors.content && <p className={cx('error')}>{errors.content}</p>}
                    </div>
                </div>

                <div className={cx('captcha')}>
                    <div className={cx('captcha-box')}>
                        <div className={cx('captcha-left')}>
                            <label className={cx('checkbox-container')}>
                                <div className={cx('input-wrapper')}>
                                    <input
                                        type="checkbox"
                                        checked={formData.captchaChecked}
                                        onChange={handleCaptchaChange}
                                        className={cx('checkbox-input')}
                                    />

                                    <svg viewBox="0 0 64 64" height="2em" width="2em" className={cx('checkbox-icon')}>
                                        <path
                                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                            pathLength="575.0541381835938"
                                            className={cx('checkbox-path', { checked: formData.captchaChecked })}
                                        />
                                    </svg>
                                    {errors.captchaChecked && <p className={cx('error')}>{errors.captchaChecked}</p>}
                                </div>
                            </label>
                            <p className={cx('captcha-text')}>I'm not a robot</p>
                        </div>
                        <div className={cx('captcha-right')}>
                            <img
                                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                                alt="reCAPTCHA"
                                className={cx('captcha-logo')}
                            />
                            <p className={cx('captcha-terms')}>
                                <a href="https://policies.google.com/privacy?hl=en">Privacy</a>
                                <a href="https://policies.google.com/terms?hl=en">Terms</a>
                            </p>
                        </div>
                    </div>
                </div>

                <button type="submit" className={cx('button')}>
                    <span> GỬI THÔNG TIN </span>
                </button>

                <div className={cx('footer')}>
                    <p> Vui lòng liên hệ Hotline/Zalo để được hỗ trợ tư vấn nhanh chóng và chính xác nhất!</p>
                    <span>0899.363.369</span>
                </div>
            </form>
        </section>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default ContactForm;
