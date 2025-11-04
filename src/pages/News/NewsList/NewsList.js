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

// 🔹 Cấu hình BASE_URL theo môi trường
const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_LOCAL_URL}/api`
        : `${process.env.REACT_APP_PROD_URL}/api`;

// const TOKEN = process.env.REACT_APP_API_TOKEN;

function NewsList() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, mediaRes] = await Promise.all([
                    // axios.get(`https://admin.pion.edu.vn/api/posts`),
                    // axios.get(`https://admin.pion.edu.vn/api/media`),
                    // axios.get(`${process.env.REACT_APP_PROD_URL}/api/posts`),
                    // axios.get(`${process.env.REACT_APP_PROD_URL}/api/media`),
                    // axios.get(`${BASE_URL}/posts`, {
                    //     headers: { Authorization: `Bearer ${TOKEN}` },
                    // }),
                    // axios.get(`${BASE_URL}/media`, {
                    //     headers: { Authorization: `Bearer ${TOKEN}` },
                    // }),
                    axios.get(`${BASE_URL}/posts`),
                    axios.get(`${BASE_URL}/media`),
                ]);

                const postsData = postsRes.data.data || postsRes.data;
                const mediaData = mediaRes.data.data || mediaRes.data;

                // 🔹 Tạo map media để dễ truy cập
                const mediaMap = {};
                mediaData.forEach((media) => {
                    mediaMap[media.id] = media;
                });

                // 🔹 Lọc bài viết công khai
                // const filteredPosts = postsData.filter(
                //     (post) => post.visibility === 'public' || post.visibility === 'scheduled_public',
                // );
                // 🔹 Lọc bài viết: chỉ hiển thị public + scheduled_public đã đến giờ
                const now = new Date(); // thời gian hiện tại

                const filteredPosts = postsData.filter((post) => {
                    if (post.visibility === 'public') return true;

                    if (post.visibility === 'scheduled_public') {
                        const publishTime = new Date(post.published_at || post.schedule_time);
                        return publishTime <= now; // chỉ render nếu đã đến thời gian công khai
                    }

                    return false;
                });

                // 🔹 Ghép media vào post tương ứng
                const enrichedPosts = filteredPosts.map((post) => {
                    const media = mediaMap[post.featured_media_id];
                    const imagePath = media?.meta?.variants?.thumbnail?.path || media?.url;

                    // Lấy đường dẫn ảnh từ storage
                    const imageUrl = imagePath
                        ? `${BASE_URL.replace('/api', '/storage')}/${imagePath}`
                        : '/assets/img/default.jpg';
                    // const imageUrl = imagePath
                    // ? `https://admin.pion.edu.vn/storage/${imagePath}`
                    // : '/assets/img/default.jpg';

                    // ? `${process.env.REACT_APP_PROD_URL}/storage/${imagePath}`

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
