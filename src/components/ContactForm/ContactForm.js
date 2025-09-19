import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import ReCAPTCHA from 'react-google-recaptcha';
import { message, Button } from 'antd';
import HeadingStar from '@/components/HeadingStar';
import styles from './ContactForm.module.scss';

const cx = classNames.bind(styles);

// 100 bad word in VietNam
const badWords = [
    'địt',
    'cặc',
    'lồn',
    'buồi',
    'đụ',
    'đéo',
    'đcm',
    'đmm',
    'loz',
    'clgt',
    'đm',
    'clm',
    'vl',
    'địt mẹ',
    'cặc mẹ',
    'lồn mẹ',
    'buồi mẹ',
    'đụ mẹ',
    'địt con',
    'địt cái',
    'đéo mẹ',
    'địt mày',
    'cặc cụ',
    'lồn cụ',
    'đm mẹ',
    'đcm mẹ',
    'địt bố',
    'địt bố mày',
    'địt ông',
    'địt cha',
    'đéo con',
    'đéo cái',
    'lồn lợn',
    'địt lợn',
    'cặc lợn',
    'buồi lợn',
    'đụ lợn',
    'đm con',
    'đm cái',
    'đéo bố',
    'đéo cha',
    'đéo ông',
    'đm ông',
    'đéo mợ',
    'đéo dì',
    'đéo dượng',
    'địt dượng',
    'cặc dượng',
    'buồi dượng',
    'đm dượng',
    'đéo thằng',
    'đéo con chó',
    'địt con chó',
    'địt con đĩ',
    'đéo con đĩ',
    'địt mẹ mày',
    'địt con mẹ',
    'địt mẹ con',
    'địt con mày',
    'cặc chó',
    'lồn chó',
    'buồi chó',
    'đụ chó',
    'đéo chó',
    'địt chó',
    'đm chó',
    'clgt mẹ',
    'đm mày',
    'đm tao',
    'đm chúng mày',
    'đm chúng tao',
    'đéo chúng mày',
    'đéo chúng tao',
    'địt lồn',
    'địt mẹ lồn',
    'địt mẹ lồn mày',
    'cặc mẹ lồn',
    'đm mẹ lồn',
    'đm con lồn',
    'đm con cặc',
    'đm con buồi',
    'đm con đĩ',
    'đm con đực',
    'đéo con đực',
    'đéo con đĩ',
    'đéo con buồi',
    'đéo con cặc',
    'địt đực',
    'cặc đực',
    'lồn đực',
    'buồi đực',
    'đụ đực',
    'đéo đực',
    'đm đực',
    'clgt đực',
    'đéo clgt',
    'đéo clgm',
    'clgm',
    'đéo clgm',
    'đéo clgt mẹ',
    'địt clgt',
    'địt clgm',
    'đéo mẹ mày',
    'địt mẹ mày',
    'địt con mẹ mày',
    'địt mẹ con mày',
];

// Check bad word
function containsBadWords(text) {
    const lowerText = text.toLowerCase();
    return badWords.some((bw) => lowerText.includes(bw));
}

// convert code html to avoid XSS at FE
// function sanitizeInput(input) {
//     return input
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;')
//         .replace(/'/g, '&#039;');
// }

const ContactForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        requestContent: '',
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

    const validateForm = () => {
        let newErrors = {};

        if (
            !formData.guestName.trim() ||
            formData.guestName.length < 2 ||
            formData.guestName.length > 100 ||
            !/^[a-zA-ZÀ-Ỹà-ỹ\s]+$/.test(formData.guestName)
        ) {
            newErrors.guestName = 'Tên phải từ 2-100 ký tự và không chứa số hoặc ký tự đặc biệt!';
        } else if (containsBadWords(formData.guestName)) {
            newErrors.guestName = 'Tên không được chứa từ ngữ không phù hợp!';
        }

        if (!/^0\d{9}$/.test(formData.guestPhone)) {
            newErrors.guestPhone = 'Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng số 0! (VD: 0912345678)';
        }

        if (!formData.guestEmail) {
            newErrors.guestEmail = 'Vui lòng nhập email!';
        } else if (formData.guestEmail.length > 254) {
            newErrors.guestEmail = 'Email không được vượt quá 255 ký tự';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.guestEmail)) {
            newErrors.guestEmail = 'Email không hợp lệ! VD: abc@gmail.com';
        }

        if (formData.requestContent.length < 10 || formData.requestContent.length > 500) {
            newErrors.requestContent = 'Nội dung tư vấn phải từ 10-500 ký tự!';
        } else if (containsBadWords(formData.requestContent)) {
            newErrors.requestContent = 'Nội dung tư vấn không được chứa từ ngữ không phù hợp!';
        }

        if (!formData.captchaChecked) {
            newErrors.captchaChecked = 'Bạn cần xác nhận CAPTCHA!';
        }
        // if (!formData.recaptchaToken) {
        //     newErrors.recaptchaToken = 'Bạn cần xác nhận CAPTCHA!';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!validateForm()) {
            message.error('Vui lòng kiểm tra lại thông tin!');
            setIsSubmitting(true);
            setTimeout(() => setIsSubmitting(false), 2000);
            return;
        }

        const payload = {
            guest_name: formData.guestName,
            guest_email: formData.guestEmail,
            guest_phone: formData.guestPhone,
            request_content: formData.requestContent,
        };
        // request_content: sanitizeInput(formData.requestContent),
        // recaptcha_token: formData.recaptchaToken,

        try {
            setIsSubmitting(true);
            // `${process.env.REACT_APP_API_BASE_URL}/api/consultations`
            const response = await axios.post('https://admin.pion.edu.vn/api/consultations', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    // Use this if you're working with Sanctum or Passport
                    //'Authorization': 'Bearer your_token',
                },
            });

            message.success('Thông tin của bạn đã được gửi thành công!');

            // Reset form
            setFormData({
                guestName: '',
                guestEmail: '',
                guestPhone: '',
                requestContent: '',
                captchaChecked: false,
            });
            setErrors({});
        } catch (error) {
            // Basic error handling for now — can be improved later
            if (error.response && error.response.status === 429) {
                message.error('Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau!');
            } else {
                message.error(error.message || 'Gửi thất bại, vui lòng thử lại!');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={cx('contact')}>
            <HeadingStar title="ĐĂNG KÝ TƯ VẤN" />
            <form onSubmit={handleSubmit} className={cx('form')}>
                <div className={cx('row')}>
                    <div className={cx('input-wrapper')}>
                        <input
                            name="guestName"
                            className={cx('input')}
                            placeholder="Họ và tên (*)"
                            value={formData.guestName}
                            onChange={handleChange}
                            required
                        />
                        {errors.guestName && <p className={cx('error')}>{errors.guestName}</p>}
                    </div>
                    <div className={cx('input-wrapper')}>
                        <input
                            name="guestPhone"
                            className={cx('input')}
                            placeholder="Số điện thoại (*)"
                            value={formData.guestPhone}
                            onChange={handleChange}
                            required
                        />
                        {errors.guestPhone && <p className={cx('error')}>{errors.guestPhone}</p>}
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('input-wrapper', 'custom')}>
                        <input
                            name="guestEmail"
                            className={cx('input', 'email')}
                            placeholder="Email (*)"
                            value={formData.guestEmail}
                            onChange={handleChange}
                            required
                        />
                        {errors.guestEmail && <p className={cx('error')}>{errors.guestEmail}</p>}
                    </div>
                    <div className={cx('input-wrapper', 'custom')}>
                        <textarea
                            name="requestContent"
                            className={cx('input', 'textarea')}
                            placeholder="Nội dung cần tư vấn"
                            value={formData.requestContent}
                            onChange={handleChange}
                            rows={2}
                            maxLength={500}
                        />
                        {errors.requestContent && <p className={cx('error')}>{errors.requestContent}</p>}
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

                {/* <div className={cx('captcha')}>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setFormData({ ...formData, recaptchaToken: token })}
                    />
                    {errors.recaptchaToken && <p className={cx('error')}>{errors.recaptchaToken}</p>}
                </div> */}
                {/* 
                <button type="submit" className={cx('button', 'btn-form')}>
                    GỬI THÔNG TIN
                </button> */}
                <Button
                    type="default"
                    htmlType="submit"
                    loading={isSubmitting}
                    className={cx('button', 'btn-form')}
                    disabled={isSubmitting}
                >
                    GỬI THÔNG TIN
                </Button>
                <div className={cx('footer')}>
                    <p>Nhớ kiểm tra lại thông tin trước khi gửi nhé!</p>
                    <p>
                        Cần&nbsp;gấp? Gọi&nbsp;ngay&nbsp; <span className={cx('highlight')}>0899.363.369</span>
                        (Hotline/Zalo) để được tư&nbsp;vấn nhanh!
                    </p>
                </div>
            </form>
        </section>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default ContactForm;
