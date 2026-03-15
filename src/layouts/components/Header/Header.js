import { useState } from 'react';
import { Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import classNames from 'classnames/bind';

import Search from '@/layouts/components/Search';
import config from '@/config';
import useAuth from '@/hooks/useAuth';
import AuthButtons from './components/AuthButtons';
import DesktopAuth from './components/DesktopAuth';
import MobileAuth from './components/MobileAuth';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

// Menu items for Header mobile
const items = [
    {
        type: 'divider',
    },
    {
        key: 'about',
        label: (
            <Link to={config.routes.about} className="menu-uppercase">
                VỀ PION
            </Link>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'courses',
        label: 'Chương trình học ',
        children: [
            {
                key: 'program-english',
                label: 'Tiếng Anh',
                children: [
                    {
                        key: 'en_1',
                        label: (
                            <Link to="/chuong-trinh-hoc/tieng-anh-mam-non" className="menu-normal">
                                Tiếng Anh mầm non
                            </Link>
                        ),
                    },
                    {
                        key: 'en_2',
                        label: (
                            <Link to="/chuong-trinh-hoc/tieng-anh-tieu-hoc" className="menu-normal">
                                Tiếng Anh tiểu học
                            </Link>
                        ),
                    },
                    {
                        key: 'en_3',
                        label: (
                            <Link to="/chuong-trinh-hoc/tieng-anh-giao-tiep" className="menu-normal">
                                Tiếng Anh giao tiếp
                            </Link>
                        ),
                    },
                ],
            },
            {
                key: 'program-chinese',
                label: 'Tiếng Trung',
                children: [
                    {
                        key: 'ch_1',
                        label: (
                            <Link to="/chuong-trinh-hoc/tieng-trung-giao-tiep" className="menu-normal">
                                Tiếng Trung giao tiếp
                            </Link>
                        ),
                    },
                    {
                        key: 'ch_2',
                        label: (
                            <Link to="/chuong-trinh-hoc/tieng-trung-tre-em" className="menu-normal">
                                Tiếng Trung trẻ em
                            </Link>
                        ),
                    },
                    {
                        key: 'ch_3',
                        label: (
                            <Link to="/chuong-trinh-hoc/hskk-tai-pion" className="menu-normal">
                                HSK(K) Tại Pion
                            </Link>
                        ),
                    },
                    {
                        key: 'ch_4',
                        label: (
                            <Link to="/chuong-trinh-hoc/csca-tai-pion" className="menu-normal">
                                CSCA Tại Pion
                            </Link>
                        ),
                    },
                ],
            },
            // {
            //     key: 'program-korean',
            //     label: 'Tiếng Hàn',
            //     children: [
            //         {
            //             key: 'ko_1',
            //             label: (
            //                 <Link to="/tieng-han-so-cap-1" className="menu-normal">
            //                     Tiếng Hàn sơ cấp 1
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ko_2',
            //             label: (
            //                 <Link to="/tieng-han-so-cap-2" className="menu-normal">
            //                     Tiếng Hàn sơ cấp 2
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ko_3',
            //             label: (
            //                 <Link to="/luyen-thi-topik-i" className="menu-normal">
            //                     Luyện thi TOPIK I
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ko_4',
            //             label: (
            //                 <Link to="/luyen-thi-topik-ii" className="menu-normal">
            //                     Luyện thi TOPIK II
            //                 </Link>
            //             ),
            //         },
            //     ],
            // },
            // {
            //     key: 'program-german',
            //     label: 'Tiếng Đức',
            //     children: [
            //         {
            //             key: 'ge_1',
            //             label: (
            //                 <Link to="/tieng-duc-online-1-kem-1" className="menu-normal">
            //                     Tiếng Đức online 1 kèm 1
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ge_2',
            //             label: (
            //                 <Link to="/tieng-duc-a1" className="menu-normal">
            //                     Tiếng Đức A1
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ge_3',
            //             label: (
            //                 <Link to="/tieng-duc-a2" className="menu-normal">
            //                     Tiếng Đức A2
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ge_4',
            //             label: (
            //                 <Link to="/tieng-duc-b1" className="menu-normal">
            //                     Tiếng Đức B1
            //                 </Link>
            //             ),
            //         },
            //         {
            //             key: 'ge_5',
            //             label: (
            //                 <Link to="/tieng-duc-b2" className="menu-normal">
            //                     Tiếng Đức B2
            //                 </Link>
            //             ),
            //         },
            //     ],
            // },
        ],
    },

    {
        type: 'divider',
    },
    {
        key: 'news',
        label: 'Tin tức',
        children: [
            // { key: 'news-germany', label: <Link to="/xuat-khau-lao-dong">Xuất khẩu lao động</Link> },
            { key: 'news-list', label: <Link to={config.routes.newsList}>Tất cả tin tức</Link> },
            { key: 'news-recruitment', label: <Link to={config.routes.newsAvailablePosition}>Tuyển dụng</Link> },
            { key: 'news-question', label: <Link to={config.routes.faq}>Câu hỏi thường gặp</Link> },
            {
                key: 'abroad-china',
                label: <Link to={config.routes.studyAbroadChina}>Điều kiện du học Trung Quốc 2025</Link>,
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'contact',
        label: <Link to={config.routes.contact}>Liên hệ</Link>,
    },
    {
        type: 'divider',
    },
    {
        key: 'learning',
        label: <Link to={config.routes.learning}>Học tập</Link>,
    },
    {
        type: 'divider',
    },
    // {
    //     key: 'abroad-china',
    //     label: (
    //         <Link to="/tin-tuc/dieu-kien-du-hoc-trung-quoc-2025" className="menu-uppercase">
    //             Du học Trung Quốc
    //         </Link>
    //     ),
    // },
];

export default function Header({ visible }) {
    const { isAuth, user, logout } = useAuth(); // hooks useAuth
    const [menuVisible, setMenuVisible] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);

    const onOpenChange = (keys) => {
        const parentKeys = items.map((item) => item.key); // get list menu parent
        const latestOpenKey = keys.find((key) => !openKeys.includes(key)); // find new key`

        if (latestOpenKey) {
            if (parentKeys.includes(latestOpenKey)) {
                setOpenKeys([latestOpenKey]); // 🔹 if menu parent, only open 1
            } else {
                const parentKey = keys.find((key) => parentKeys.includes(key)); // Define menu parent of new key
                setOpenKeys([
                    parentKey, // 🔹 Hold menu
                    latestOpenKey, // 🔹 Only open 1 submenu
                ]);
            }
        } else {
            setOpenKeys([]); // close all when enter on menu parent
        }
    };

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    // Portal content : Mobile and tablet menu
    const mobileMenu = (
        <div className={cx('mobile-menu-wrapper')}>
            {menuVisible && <div className={cx('overlay')} />}
            <div className={cx('mobile-menu', { show: menuVisible })}>
                <div className={cx('mobile-menu-content')}>
                    <button className={cx('close-button')} onClick={handleCloseMenu}>
                        ✖
                    </button>

                    {/* Auth buttons mobile */}
                    {isAuth && user ? <MobileAuth user={user} onLogout={logout} /> : <AuthButtons />}

                    <Menu
                        mode="inline"
                        items={items}
                        openKeys={openKeys}
                        style={{
                            borderRight: 0,
                            backgroundColor: 'transparent',
                            color: 'white',
                            itemSelectedBg: '#ce232d0a',
                            itemHoverBg: '#ce232d0a',
                            itemHoverColor: '#ce232d',
                            itemSelectedColor: '#ce232d',
                        }}
                        onOpenChange={onOpenChange}
                        onClick={handleCloseMenu}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <header className={cx('wrapper', { show: visible, hide: !visible })}>
            <div className={cx('inner')}>
                <div className={cx('logo-wrapper')}>
                    <Link to={config.routes.home}>
                        <figure>
                            <img src="/assets/img/logo.png" alt="Logo" className={cx('logo')} />
                        </figure>
                    </Link>
                </div>
                {/* Button MENU */}
                <div className={cx('menu-toggle')}>
                    <button className={cx('menu-icon')} onClick={handleMenuToggle}>
                        <span>MENU</span> <BiSolidFoodMenu size={22} color="white" />
                    </button>
                </div>

                {/* MENU Desktop */}
                <nav className={cx('nav')}>
                    <NavLink
                        to={config.routes.about}
                        className={({ isActive }) => cx('nav-link', { active: isActive })}
                    >
                        VỀ PION
                    </NavLink>

                    {/* Chương trình học  */}
                    <div className={cx('dropdown')}>
                        <div className={cx('dropdown-toggle')}>
                            <span>Chương trình học</span>
                            <RiArrowDropDownLine size={24} />
                        </div>
                        <div className={cx('dropdown-menu', 'customize')}>
                            <div className={cx('dropdown-column')}>
                                <h4>Tiếng Anh</h4>
                                <ul>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/tieng-anh-mam-non">Tiếng anh mầm non</Link>
                                    </li>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/tieng-anh-tieu-hoc">Tiếng anh tiểu học</Link>
                                    </li>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/tieng-anh-giao-tiep">Tiếng Anh giao tiếp</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('dropdown-column')}>
                                <h4>Tiếng Trung</h4>
                                <ul>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/tieng-trung-giao-tiep">Tiếng Trung giao tiếp</Link>
                                    </li>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/tieng-trung-tre-em">Tiếng Trung trẻ em</Link>
                                    </li>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/hskk-tai-pion">HSK(K) Tại Pion</Link>
                                    </li>
                                    <li>
                                        <Link to="/chuong-trinh-hoc/csca-tai-pion">CSCA Tại Pion</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tin tức */}
                    <div className={cx('dropdown')}>
                        <div className={cx('dropdown-toggle')}>
                            <span>Tin tức</span>
                            <RiArrowDropDownLine size={24} />
                        </div>
                        <div className={cx('dropdown-menu')}>
                            {/* <Link to="/xuat-khau-lao-dong" className={cx('dropdown-item')}>
                                Xuất khẩu lao động
                            </Link> */}
                            <Link to={config.routes.newsList} className={cx('dropdown-item')}>
                                Tất cả tin tức
                            </Link>
                            <Link to={config.routes.newsAvailablePosition} className={cx('dropdown-item')}>
                                Tuyển dụng
                            </Link>
                            <Link to={config.routes.faq} className={cx('dropdown-item')}>
                                Câu hỏi thường gặp
                            </Link>
                            <Link to={config.routes.studyAbroadChina} className={cx('dropdown-item')}>
                                Điều kiện du học Trung Quốc 2025
                            </Link>
                        </div>
                    </div>

                    <NavLink
                        to={config.routes.contact}
                        className={({ isActive }) => cx('nav-link', { active: isActive })}
                    >
                        Liên hệ
                    </NavLink>

                    {/* <NavLink
                        to={config.routes.learning}
                        className={({ isActive }) => cx('nav-link', { active: isActive })}
                    >
                        Học tập
                    </NavLink> */}
                </nav>

                {/* Search form */}
                <div className={cx('search-form')}>
                    <Search />
                </div>

                {/* Auth buttons desktop */}
                <div className={cx('auth-desktop')}>
                    {isAuth && user ? <DesktopAuth user={user} onLogout={logout} /> : <AuthButtons />}
                </div>
            </div>

            {/* Render Menu mobile */}
            {createPortal(mobileMenu, document.getElementById('portal'))}
        </header>
    );
}
