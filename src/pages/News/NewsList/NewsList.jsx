import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';
import { Empty, Pagination } from 'antd';

import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import ImageCard from '@/components/ImageCard';
import { getNewsWithPagination } from '@/services';

import styles from './NewsList.module.scss';

const cx = classNames.bind(styles);

function NewsList() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [meta, setMeta] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data, meta } = await getNewsWithPagination(currentPage);
                setPosts(data);
                setMeta(meta);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage]);

    return (
        <>
            <Helmet>
                <title>Tin tức mới nhất | PION</title>
            </Helmet>
            <section className={cx('wrapper')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title="Tất cả tin tức" />
                </div>

                <HeadingStar title="Tin tức mới nhất" color="var(--primary)" />

                <div className={cx('news-list')}>
                    {(loading ? Array.from({ length: meta.per_page || 6 }) : posts).map((post, index) => (
                        <ImageCard
                            key={index}
                            title={post?.seo_title || post?.title}
                            desc={post?.description || 'Xem thông tin chi tiết tại đây...'}
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

                {!loading && meta.total > meta.per_page && (
                    <div className={cx('pagination-wrapper')}>
                        <Pagination
                            current={meta.current_page}
                            total={meta.total}
                            responsive
                            pageSize={meta.per_page}
                            onChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' }); // cuộn lên top
                            }}
                        />
                    </div>
                )}
            </section>
        </>
    );
}

export default NewsList;
