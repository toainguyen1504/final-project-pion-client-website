import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import { GiHumanTarget } from 'react-icons/gi';
import { MdAirplaneTicket } from 'react-icons/md';

import { jobs } from '@/data';
import ImageCard from '@/components/ImageCard';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const newsData = [
    // {
    //     id: 'news_01',
    //     title: 'Xuất khẩu lao động: Nên chọn quốc gia nào?',
    //     desc: 'Gần đây, Châu Âu tiếp tục khẳng định vị thế là điểm đến hấp dẫn đối với lao động Việt Nam nhờ cơ hội việc làm dồi dào, mức thu nhập cao cùng với chất lượng cuộc sống vượt trội. ',
    //     image: '/assets/img/xkld/plane.jpg',
    //     link: '/xuat-khau-lao-dong',
    //     slug: 'xuat-khau-lao-dong',
    // },
    // {
    //     id: 'news_02',
    //     title: 'Du Học Đức - Cơ Hội Mở Rộng Tương Lai',
    //     desc: 'Trong những năm gần đây, việc sang Đức học nghề đã thu hút sự quan tâm mạnh mẽ từ giới trẻ Việt Nam. Lý do không chỉ nằm ở cơ hội tiếp cận nền giáo dục chất lượng cao mà còn ở trải nghiệm cuộc sống tại một quốc gia hiện đại và giàu bản sắc văn hóa.',
    //     image: '/assets/img/du_hoc/german2.jpg',
    //     link: '/du-hoc-nghe-duc',
    //     slug: 'du-hoc-nghe-duc',
    // },
    // {
    //     id: 'news_03',
    //     title: 'Du Học Hàn Quốc - Cánh Cửa Hội Nhập Quốc Tế',
    //     desc: 'Hiện nay, Hàn Quốc vẫn là một trong những lựa chọn ưu tiên của nhiều học sinh, sinh viên Việt Nam khi quyết định du học. Không chỉ nổi bật với nền giáo dục tiên tiến, xứ sở Kim Chi còn mang đến nhiều triển vọng nghề nghiệp và thu nhập ổn định sau khi hoàn thành chương trình học.',
    //     image: '/assets/img/du_hoc/korean2.jpg',
    //     link: '/du-hoc-han-quoc',
    //     slug: 'du-hoc-han-quoc',
    // },
    {
        id: 'news_04',
        title: 'Du Học Trung Quốc - Trải Nghiệm Nền Văn Hóa Độc Đáo',
        desc: 'Lựa chọn du học tại Trung Quốc mang lại cho sinh viên nhiều lợi ích vượt trội. Không chỉ được tiếp cận với hệ thống giáo dục tiên tiến cùng cơ sở vật chất hiện đại, bạn còn có cơ hội khám phá nền văn hóa lâu đời, đa dạng và giàu bản sắc.',
        image: '/assets/img/du_hoc/china_09.jpg',
        link: '/du-hoc-trung-quoc',
        slug: 'du-hoc-trung-quoc',
    },
];

const NewsList = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const handleTabChange = (key) => {
        setActiveTab(key);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 280);
    };

    const tabs = [
        {
            key: 'tab_1',
            shortLabel: 'Tuyển Dụng',
            fullLabel: 'Vị Trí Tuyển Dụng',
            icon: <GiHumanTarget size={32} />,
            data: jobs,
        },
        {
            key: 'tab_2',
            shortLabel: 'Du Học',
            fullLabel: 'Thông Tin Du Học',
            icon: <MdAirplaneTicket size={32} />,
            data: newsData,
        },
    ];

    const items = tabs.map((tab) => ({
        key: tab.key,
        label: (
            <div className={cx('tab-inner')}>
                <span className={cx('tab-icon')}>{tab.icon}</span>
                <p className={cx('short-label')}>{tab.shortLabel}</p>
                <p className={cx('full-label')}>{tab.fullLabel}</p>
            </div>
        ),
        children: loading ? (
            <div className={cx('news-loading')}>
                {[...Array(3)].map((_, index) => (
                    <ImageCard key={index} loading />
                ))}
            </div>
        ) : (
            <div className={cx('news-inner')}>
                {tab.data.map((newsItem, index) => (
                    <div
                        className={cx({ 'news-animate': tab.key === activeTab })}
                        style={{ animationDelay: `${index * 0.16}s` }}
                        key={newsItem.id ?? `news-${index}`}
                    >
                        <ImageCard
                            title={newsItem.title}
                            desc={newsItem.desc}
                            image={newsItem.image || '/assets/img/default.jpg'}
                            link={newsItem.link}
                            button="Xem chi tiết"
                        />
                    </div>
                ))}
            </div>
        ),
    }));

    return <Tabs defaultActiveKey="1" className={cx('tabs')} centered onChange={handleTabChange} items={items} />;
};

NewsList.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    link: PropTypes.string,
};

export default NewsList;
