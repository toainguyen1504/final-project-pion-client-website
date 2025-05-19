import { useState } from 'react';
import { Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import classNames from 'classnames/bind';

import Search from '@/layouts/components/Search';
import config from '@/config';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const items = [
    {
        type: 'divider',
    },
    {
        key: 'about',
        label: (
            <Link to="/gioi-thieu" className="menu-uppercase">
                VỀ PION CORPORATION
            </Link>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'courses',
        label: 'Khóa học',
        children: [
            {
                key: 'courses-english',
                label: 'Tiếng Anh',
                children: [
                    {
                        key: 'en_1',
                        label: (
                            <Link to="/tieng-anh-mam-non" className="menu-normal">
                                Tiếng Anh mầm non
                            </Link>
                        ),
                    },
                    {
                        key: 'en_2',
                        label: (
                            <Link to="/tieng-anh-tieu-hoc" className="menu-normal">
                                Tiếng Anh tiểu học
                            </Link>
                        ),
                    },
                    {
                        key: 'en_3',
                        label: (
                            <Link to="/tieng-anh-thcs" className="menu-normal">
                                Tiếng Anh trung học cơ sở
                            </Link>
                        ),
                    },
                ],
            },
            {
                key: 'courses-chinese',
                label: 'Tiếng Trung',
                children: [
                    {
                        key: 'ch_1',
                        label: (
                            <Link to="/tieng-trung-giao-tiep-ung-dung" className="menu-normal">
                                Giao tiếp ứng dụng
                            </Link>
                        ),
                    },
                    {
                        key: 'ch_2',
                        label: (
                            <Link to="/tieng-trung-tre-em" className="menu-normal">
                                Tiếng Trung trẻ em
                            </Link>
                        ),
                    },
                    {
                        key: 'ch_3',
                        label: (
                            <Link to="/luyen-thi-hsk" className="menu-normal">
                                Luyện thi HSK
                            </Link>
                        ),
                    },
                ],
            },
            {
                key: 'courses-korean',
                label: 'Tiếng Hàn',
                children: [
                    {
                        key: 'ko_1',
                        label: (
                            <Link to="/tieng-han-so-cap-1" className="menu-normal">
                                Tiếng Hàn sơ cấp 1
                            </Link>
                        ),
                    },
                    {
                        key: 'ko_2',
                        label: (
                            <Link to="/tieng-han-so-cap-2" className="menu-normal">
                                Tiếng Hàn sơ cấp 2
                            </Link>
                        ),
                    },
                    {
                        key: 'ko_3',
                        label: (
                            <Link to="/luyen-thi-topik-i" className="menu-normal">
                                Luyện thi TOPIK I
                            </Link>
                        ),
                    },
                    {
                        key: 'ko_4',
                        label: (
                            <Link to="/luyen-thi-topik-ii" className="menu-normal">
                                Luyện thi TOPIK II
                            </Link>
                        ),
                    },
                ],
            },
            {
                key: 'courses-german',
                label: 'Tiếng Đức',
                children: [
                    {
                        key: 'ge_1',
                        label: (
                            <Link to="/tieng-duc-online-1-kem-1" className="menu-normal">
                                Tiếng Đức online 1 kèm 1
                            </Link>
                        ),
                    },
                    {
                        key: 'ge_2',
                        label: (
                            <Link to="/tieng-duc-a1" className="menu-normal">
                                Tiếng Đức A1
                            </Link>
                        ),
                    },
                    {
                        key: 'ge_3',
                        label: (
                            <Link to="/tieng-duc-a2" className="menu-normal">
                                Tiếng Đức A2
                            </Link>
                        ),
                    },
                    {
                        key: 'ge_4',
                        label: (
                            <Link to="/tieng-duc-b1" className="menu-normal">
                                Tiếng Đức B1
                            </Link>
                        ),
                    },
                    {
                        key: 'ge_5',
                        label: (
                            <Link to="/tieng-duc-b2" className="menu-normal">
                                Tiếng Đức B2
                            </Link>
                        ),
                    },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'study-abroad',
        label: 'Du học',
        children: [
            { key: 'abroad-germany', label: <Link to="/du-hoc-nghe-duc">Du học nghề Đức</Link> },
            { key: 'abroad-korea', label: <Link to="/du-hoc-han-quoc">Du học Hàn Quốc</Link> },
            { key: 'abroad-china', label: <Link to="/du-hoc-trung-quoc">Du học Trung Quốc</Link> },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'news',
        label: 'Tin tức',
        children: [
            { key: 'news-germany', label: <Link to="/xuat-khau-lao-dong">Xuất khẩu lao động</Link> },
            { key: 'news-recruitment', label: <Link to="/tuyen-dung">Tuyển dụng</Link> },
            { key: 'news-question', label: <Link to="/cau-hoi-thuong-gap">Câu hỏi thường gặp</Link> },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'contact',
        label: <Link to="/lien-he">Liên hệ</Link>,
    },
];

export default function Header({ visible }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);

    const onOpenChange = (keys) => {
        const parentKeys = items.map((item) => item.key); // get list menu parent
        const latestOpenKey = keys.find((key) => !openKeys.includes(key)); // find new key

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
                        VỀ PION CORPORATION
                    </NavLink>

                    {/* Khóa học */}
                    <div className={cx('dropdown')}>
                        <div className={cx('dropdown-toggle')}>
                            <span>Khóa học</span>
                            <RiArrowDropDownLine size={24} />
                        </div>
                        <div className={cx('dropdown-menu', 'customize')}>
                            <div className={cx('dropdown-column')}>
                                <h4>Khóa học Tiếng Anh</h4>
                                <ul>
                                    <li>
                                        <Link to="/tieng-anh-mam-non">Tiếng anh mầm non</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-anh-tieu-hoc">Tiếng anh tiểu học</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-anh-thcs">Tiếng Anh trung học cơ sở</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('dropdown-column')}>
                                <h4>Khóa học Tiếng Trung</h4>
                                <ul>
                                    <li>
                                        <Link to="/tieng-trung-giao-tiep-ung-dung">Giao tiếp ứng dụng</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-trung-tre-em">Tiếng Trung trẻ em</Link>
                                    </li>

                                    <li>
                                        <Link to="/luyen-thi-hsk">Luyện thi HSK</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('dropdown-column')}>
                                <h4>Khóa học Tiếng Đức</h4>
                                <ul>
                                    <li>
                                        <Link to="/tieng-duc-online-1-kem-1">Tiếng Đức Online 1 kèm 1</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-duc-a1">Tiếng Đức A1</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-duc-a2">Tiếng Đức A2</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-duc-b1">Tiếng Đức B1</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-duc-b2">Tiếng Đức B2</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('dropdown-column')}>
                                <h4>Khóa học Tiếng Hàn</h4>
                                <ul>
                                    <li>
                                        <Link to="/tieng-han-so-cap-1">Tiếng Hàn sơ cấp 1</Link>
                                    </li>
                                    <li>
                                        <Link to="/tieng-han-so-cap-2">Tiếng Hàn sơ cấp 2</Link>
                                    </li>
                                    <li>
                                        <Link to="/luyen-thi-topik-i">Luyện thi TOPIK I</Link>
                                    </li>
                                    <li>
                                        <Link to="/luyen-thi-topik-ii">Luyện thi TOPIK II</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Du học */}
                    <div className={cx('dropdown')}>
                        <div className={cx('dropdown-toggle')}>
                            <span>Du học</span>
                            <RiArrowDropDownLine size={24} />
                        </div>
                        <div className={cx('dropdown-menu')}>
                            <Link to="/du-hoc-nghe-duc" className={cx('dropdown-item')}>
                                Du học nghề Đức
                            </Link>
                            <Link to="/du-hoc-han-quoc" className={cx('dropdown-item')}>
                                Du học Hàn Quốc
                            </Link>
                            <Link to="/du-hoc-trung-quoc" className={cx('dropdown-item')}>
                                Du học Trung Quốc
                            </Link>
                        </div>
                    </div>

                    {/* Tin tức */}
                    <div className={cx('dropdown')}>
                        <div className={cx('dropdown-toggle')}>
                            <span>Tin tức</span>
                            <RiArrowDropDownLine size={24} />
                        </div>
                        <div className={cx('dropdown-menu')}>
                            <Link to="/xuat-khau-lao-dong" className={cx('dropdown-item')}>
                                Xuất khẩu lao động
                            </Link>
                            <Link to="/tuyen-dung" className={cx('dropdown-item')}>
                                Tuyển dụng
                            </Link>
                            <Link to="/cau-hoi-thuong-gap" className={cx('dropdown-item')}>
                                Câu hỏi thường gặp
                            </Link>
                        </div>
                    </div>

                    <NavLink to="/lien-he" className={({ isActive }) => cx('nav-link', { active: isActive })}>
                        Liên hệ
                    </NavLink>
                </nav>
                {/* Search form */}
                <div className={cx('search-form')}>
                    <Search />
                </div>
                {/* Hero */}
            </div>

            {/* Render Menu mobile */}
            {createPortal(mobileMenu, document.getElementById('portal'))}
        </header>
    );
}
