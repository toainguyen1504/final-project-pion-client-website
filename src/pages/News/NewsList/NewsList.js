import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import { Empty } from 'antd';
import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import ImageCard from '@/components/ImageCard';
import { getAllNews } from '@/services/newsService';

import styles from './NewsList.module.scss';

const cx = classNames.bind(styles);

function NewsList() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const news = await getAllNews();
                setPosts(news);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Tin tức mới nhất | PION</title>
            </Helmet>
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
        </>
    );
}

export default NewsList;
