import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames/bind';
import { Empty, Spin } from 'antd';
import { getNewsBySlug } from '@/services';
import BlogLayout from '@/layouts/BlogLayout';

import styles from './NewsDetail.module.scss';

const cx = classNames.bind(styles);

const NewsDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const result = await getNewsBySlug(slug);
            setPost(result);
            setLoading(false);
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <BlogLayout tocData={[]} breadcrumbTitle="Đang tải bài viết..." parentPath="/tin-tuc" parentLabel="Tin tức">
                <div
                    className={cx('post-spin')}
                    style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Spin size="large" />
                </div>
            </BlogLayout>
        );
    }

    if (!post) {
        return (
            <section className="flex flex-col items-center justify-center py-20 min-h-[500px]">
                <Empty description="Không tìm thấy bài viết!" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </section>
        );
    }

    return (
        <>
            {post.ogImageUrl && (
                <Helmet>
                    <title>{post?.seo_title || post?.title} | PION</title>
                    <meta name="description" content={post?.seo_description || post?.seo_title} />
                    <meta property="og:title" content={post?.seo_title || post?.title} />
                    <meta property="og:description" content={post?.seo_description || post?.seo_title} />
                    <meta property="og:image" content={post?.ogImageUrl} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={window?.location.href} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content={post?.ogImageUrl} />
                </Helmet>
            )}
            <BlogLayout
                tocData={post.tocData}
                breadcrumbTitle={post?.title}
                parentPath="/tin-tuc"
                parentLabel="Tin tức"
            >
                <div className={cx('post-wrapper')}>
                    <div className={cx('post-content')}>
                        <h1 className={cx('post-title')}>{post.title}</h1>

                        {post.content?.content_html && (
                            <div
                                className={cx('post-body')}
                                dangerouslySetInnerHTML={{ __html: post.content.content_html }}
                            />
                        )}
                    </div>
                </div>
            </BlogLayout>
        </>
    );
};

export default NewsDetail;
