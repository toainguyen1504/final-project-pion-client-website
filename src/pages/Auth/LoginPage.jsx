import { Form, Input, Button, Checkbox } from 'antd';
import styles from './AuthForm.module.scss';

export default function LoginPage() {
    const onFinish = (values) => {
        console.log('Login:', values);
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authBox}>
                <h2 className={styles.title}>Đăng nhập</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email / Số điện thoại" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Nhập email hoặc số điện thoại" />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form>
                <div className={styles.footer}>
                    <a href="/quen-mat-khau">Quên mật khẩu?</a>
                    <span> | </span>
                    <a href="/dang-ky">Đăng ký ngay</a>
                </div>
            </div>
        </div>
    );
}
