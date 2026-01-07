import { Form, Input, Button } from 'antd';
import styles from './AuthForm.module.scss';

export default function ForgotPasswordPage() {
    const onFinish = (values) => {
        console.log('Forgot Password:', values);
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authBox}>
                <h2 className={styles.title}>Quên mật khẩu</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email / Số điện thoại" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Nhập email hoặc số điện thoại" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Gửi thông tin khôi phục mật khẩu
                    </Button>
                </Form>
                <div className={styles.footer}>
                    <a href="/forgot">Quên mật khẩu?</a>
                    <span> | </span>
                    <a href="/register">Đăng ký ngay</a>
                </div>
            </div>
        </div>
    );
}
