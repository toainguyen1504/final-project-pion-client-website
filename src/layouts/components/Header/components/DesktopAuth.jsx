import { Avatar, Badge, Dropdown } from 'antd';
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { getInitial } from '@/utils';
import config from '@/config';
import styles from '../Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function DesktopAuth({ user, onLogout }) {
    return (
        <div className={cx('auth-inner')}>
            {/* Notification */}
            <div className={cx('notification')}>
                <Badge count={99} overflowCount={99}>
                    <IoMdNotifications size={26} />
                </Badge>
            </div>

            {/* User dropdown */}
            <Dropdown
                trigger={['click']}
                placement="bottomRight"
                overlayClassName={cx('auth-dropdown')}
                menu={{
                    items: [
                        {
                            key: 'user-info',
                            label: (
                                <div className={cx('user-info-desktop')}>
                                    <div className={cx('avatar-border')}>
                                        <Avatar size={48} src={user.profile_image} className={cx('avatar')}>
                                            {!user.profile_image && getInitial(user.display_name)}
                                        </Avatar>
                                    </div>

                                    <div className={cx('user-text')}>
                                        <p className={cx('display-name')}>{user.display_name}</p>
                                        <p className={cx('username')}>@{user.username}</p>
                                    </div>
                                </div>
                            ),
                            disabled: true,
                        },
                        { type: 'divider' },
                        {
                            key: 'learning',
                            label: (
                                <Link to={config.routes.learning} className={cx('link', 'highlight')}>
                                    E-Learning
                                </Link>
                            ),
                        },
                        {
                            key: 'my-courses',
                            label: (
                                <Link to={config.routes.myCourses} className={cx('link')}>
                                    Khóa học của tôi
                                </Link>
                            ),
                        },
                        { type: 'divider' },
                        {
                            key: 'profile',
                            label: (
                                <Link to={config.routes.profile} className={cx('link')}>
                                    Cập nhật hồ sơ
                                </Link>
                            ),
                        },
                        { type: 'divider' },
                        {
                            key: 'logout',
                            label: (
                                <span className={cx('logout', 'link')} onClick={onLogout}>
                                    Đăng xuất
                                </span>
                            ),
                        },
                    ],
                }}
            >
                <div className={cx('avatar-border')}>
                    <Avatar size={28} className={cx('trigger-avatar')} src={user.profile_image}>
                        {!user.profile_image && getInitial(user.display_name)}
                    </Avatar>
                </div>
            </Dropdown>
        </div>
    );
}
