import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import { GiHumanTarget } from 'react-icons/gi';
import { MdAirplaneTicket } from 'react-icons/md';

import { jobs } from '@/data';
import ImageCard from '@/components/ImageCard';
import { BASE_URL, MEDIA_BASE_URL } from '@/constants';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

// const MAX_NEWS = 6;
// new nổi bật -> đổi name
const featuredNews = [
    {
        id: 'news_01',
        title: 'Du Học Trung Quốc - Trải Nghiệm Nền Văn Hóa Độc Đáo',
        desc: 'Lựa chọn du học tại Trung Quốc mang lại cho sinh viên nhiều lợi ích vượt trội. Không chỉ được tiếp cận với hệ thống giáo dục tiên tiến cùng cơ sở vật chất hiện đại, bạn còn có cơ hội khám phá nền văn hóa lâu đời, đa dạng và giàu bản sắc.',
        image: '/assets/img/du_hoc/china_09.jpg',
        link: '/tin-tuc/dieu-kien-du-hoc-trung-quoc-2025',
        slug: 'dieu-kien-du-hoc-trung-quoc-2025',
    },
];

// Thêm data -> lấy từ api thêm 5 tin tức mới nhất -> lấy = created_at -> sau đó tạo thành 1 list LatestNews
const LatestNewsList = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('2');
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const [postsRes, mediaRes] = await Promise.all([
                    axios.get(`${BASE_URL}/client/posts`),
                    axios.get(`${BASE_URL}/media`),
                ]);

                const postsData = postsRes.data.data || postsRes.data;
                const mediaData = mediaRes.data.data || mediaRes.data;

                const mediaMap = {};
                mediaData.forEach((media) => {
                    mediaMap[media.id] = media;
                });

                const now = new Date();
                const filteredPosts = postsData.filter((post) => {
                    if (post.visibility === 'public') return true;
                    if (post.visibility === 'scheduled_public') {
                        const publishTime = new Date(post.published_at || post.schedule_time);
                        return publishTime <= now;
                    }
                    return false;
                });

                const enrichedPosts = filteredPosts.map((post) => {
                    const media = mediaMap[post.featured_media_id];
                    const imagePath = media?.meta?.variants?.thumbnail?.path || media?.url;
                    const imageUrl = imagePath ? `${MEDIA_BASE_URL}/${imagePath}` : '/assets/img/placeholder_img.png';

                    return {
                        id: post.id,
                        title: post.seo_title || post.title,
                        desc: post.seo_description || 'Xem thông tin chi tiết tại đây...',
                        image: imageUrl,
                        link: `/tin-tuc/${post.slug}`,
                        created_at: new Date(post.created_at),
                    };
                });

                // Sắp xếp theo created_at giảm dần và lấy 5 bài mới nhất
                const sortedPosts = enrichedPosts.sort((a, b) => b.created_at - a.created_at).slice(0, 5);

                setLatestNews(sortedPosts);
            } catch (error) {
                console.error('Lỗi khi lấy tin tức mới nhất:', error);
            }
        };

        fetchLatestNews();
    }, []);

    const handleTabChange = (key) => {
        setActiveTab(key);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 280);
    };

    const tabs = [
        {
            key: '1',
            shortLabel: 'Tuyển Dụng',
            fullLabel: 'Vị Trí Tuyển Dụng',
            icon: <GiHumanTarget size={32} />,
            data: jobs,
        },
        {
            key: '2',
            shortLabel: 'Tin Tức',
            fullLabel: 'Tin Tức Mới Nhất',
            icon: <MdAirplaneTicket size={32} />,
            data: [featuredNews[0], ...latestNews], // Ghép bài nổi bật + 5 bài mới nhất
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

    return <Tabs defaultActiveKey="2" className={cx('tabs')} centered onChange={handleTabChange} items={items} />;
};

export default LatestNewsList;
