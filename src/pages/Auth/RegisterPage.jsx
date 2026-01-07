import { Form, Input, Button } from 'antd';
import styles from './AuthForm.module.scss';

export default function RegisterPage() {
    const onFinish = (values) => {
        console.log('Register:', values);
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authBox}>
                <h2 className={styles.title}>Đăng ký</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email / Số điện thoại" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Nhập email hoặc số điện thoại" />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form>
                <div className={styles.footer}>
                    <a href="/quen-mat-khau">Quên mật khẩu?</a>
                    <span> | </span>
                    <a href="/dang-nhap">Đăng nhập</a>
                </div>
            </div>
        </div>
    );
}
