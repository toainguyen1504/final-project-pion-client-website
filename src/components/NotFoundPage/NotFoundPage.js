import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="Không tồn tại!"
            subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại!"
            extra={
                <Link to="/">
                    <Button color="default" variant="solid" size="large">
                        Quay về trang chủ
                    </Button>
                </Link>
            }
        />
    );
};

export default NotFoundPage;
