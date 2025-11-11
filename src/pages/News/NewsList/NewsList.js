import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import { Empty } from 'antd';
import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import ImageCard from '@/components/ImageCard';
import styles from './NewsList.module.scss';

const cx = classNames.bind(styles);

// 🔹 Cấu hình BASE_URL theo môi trường
const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_LOCAL_URL}/api`
        : `${process.env.REACT_APP_PROD_URL}/api`;

// 🔹 Cấu hình MEDIA_BASE_URL (trỏ tới thư mục storage)
const MEDIA_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_LOCAL_URL}/storage`
        : `${process.env.REACT_APP_PROD_URL}/storage`;

function NewsList() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, mediaRes] = await Promise.all([
                    axios.get(`${BASE_URL}/posts`),
                    axios.get(`${BASE_URL}/media`),
                ]);

                const postsData = postsRes.data.data || postsRes.data;
                // console.log(postsRes.data.data);
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
                    const imageUrl = imagePath ? `${MEDIA_BASE_URL}/${imagePath}` : '/assets/img/placeholder_img.png';

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
                    // cần tạo biến để lấy 200 kí tự đầu của nội dung bài viết để làm fallback cho desc
                    <ImageCard
                        key={index}
                        title={post?.seo_title || post?.title}
                        desc={post?.seo_description || 'Xem thông tin chi tiết tại đây...'}
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
