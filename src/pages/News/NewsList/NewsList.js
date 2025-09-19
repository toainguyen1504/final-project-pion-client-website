import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import { Empty } from 'antd';
import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import ImageCard from '@/components/ImageCard';
// import { posts } from '@/data';
import styles from './NewsList.module.scss';

const cx = classNames.bind(styles);

function NewsList() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, mediaRes] = await Promise.all([
                    axios.get(`https://admin.pion.edu.vn/api/posts`),
                    axios.get(`https://admin.pion.edu.vn/api/media`),
                    // axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts`),
                    // axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/media`),
                ]);

                const postsData = postsRes.data.data || postsRes.data;
                const mediaData = mediaRes.data.data || mediaRes.data;

                const mediaMap = {};
                mediaData.forEach((media) => {
                    mediaMap[media.id] = media;
                });

                const filteredPosts = postsData.filter(
                    (post) => post.visibility === 'public' || post.visibility === 'scheduled_public',
                );

                const enrichedPosts = filteredPosts.map((post) => {
                    const media = mediaMap[post.featured_media_id];
                    const imagePath = media?.meta?.variants?.thumbnail?.path || media?.url;
                    const imageUrl = imagePath
                        ? `https://admin.pion.edu.vn/storage/${imagePath}`
                        : '/assets/img/default.jpg';
                    // ? `${process.env.REACT_APP_API_BASE_URL}/storage/${imagePath}`

                    return {
                        ...post,
                        image: imageUrl,
                        link: post.slug,
                    };
                });

                setPosts(enrichedPosts);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className={cx('wrapper')}>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb title={'Tất cả tin tức'} />
            </div>

            <HeadingStar title="Tin tức mới nhất" color="var(--primary)" />

            <div className={cx('news-list')}>
                {(loading ? Array.from({ length: 6 }) : posts).map((post, index) => (
                    <ImageCard
                        key={index}
                        title={post?.title}
                        desc={post?.sapo_text}
                        link={post?.link}
                        image={post?.image}
                        button="Xem chi tiết"
                        loading={loading}
                    />
                ))}
            </div>

            {!loading && posts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
                    <Empty description="Hiện tại chưa có tin tức nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </section>
    );
}

export default NewsList;
