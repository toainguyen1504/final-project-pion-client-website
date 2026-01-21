import { Collapse, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getInitial } from '@/utils';
import config from '@/config';
import styles from '../Header.module.scss';

const cx = classNames.bind(styles);

const { Panel } = Collapse;

export default function MobileAuth({ user, onLogout }) {
    return (
        <Collapse bordered={false} expandIconPosition="end" className={cx('user-collapse')}>
            <Panel
                header={
                    <div className={cx('user-info-mobile')}>
                        <div className={cx('avatar-border')}>
                            <Avatar src={user.profile_image} className={cx('avatar')}>
                                {!user.profile_image && getInitial(user.display_name)}
                            </Avatar>
                        </div>
                        <p className={cx('user-name')}>{user.display_name}</p>
                    </div>
                }
                key="1"
            >
                <ul className={cx('user-menu')}>
                    <li>
                        <Link to={config.routes.learning}>Vào học</Link>
                    </li>
                    <li>
                        <Link to={config.routes.profile}>Cập nhật hồ sơ</Link>
                    </li>
                    <li>
                        <Link onClick={onLogout}>Đăng xuất</Link>
                    </li>
                </ul>
            </Panel>
        </Collapse>
    );
}
