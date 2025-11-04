import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Empty, Spin } from 'antd';

import { slugify } from '@/utils';
import BlogLayout from '@/layouts/BlogLayout';
// import Breadcrumb from '@/components/Breadcrumb';
import styles from './NewsDetail.module.scss';

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

// Hàm xử lý nội dung HTML và sinh TOC
const processContentAndGenerateToc = async (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // handle img
    const imgTags = doc.querySelectorAll('img');
    if (imgTags.length > 0) {
        // `${process.env.REACT_APP_PROD_URL}/api/media`
        // const mediaRes = await axios.get('https://admin.pion.edu.vn/api/media');
        const mediaRes = await axios.get(`${BASE_URL}/media`);
        const mediaList = mediaRes.data.data || mediaRes.data;

        const mediaMap = {};
        mediaList.forEach((media) => {
            const filename = media.meta?.filename;
            if (filename) mediaMap[filename] = media;
        });

        imgTags.forEach((img) => {
            const src = img.getAttribute('src');
            const filename = src?.split('/').pop();
            const matchedMedia = mediaMap[filename];
            const mediumPath = matchedMedia?.meta?.variants?.medium?.path;

            if (!matchedMedia) {
                // console.warn('Không tìm thấy media cho ảnh:', filename);
                return;
            }

            if (mediumPath) {
                const fullUrl = `${MEDIA_BASE_URL}/${mediumPath}`;
                img.setAttribute('src', fullUrl);
            }
        });
    }

    // assign id and create tocData
    const headings = Array.from(doc.querySelectorAll('h2, h3'));
    const toc = [];

    let currentH2 = null;
    let sectionCount = 1;
    let subsectionCount = 1;

    headings.forEach((el) => {
        const text = el.textContent.trim();
        const id = slugify(text, {
            lower: true,
            locale: 'vi',
            remove: /[*+~.()'"!:@]/g,
        });

        el.setAttribute('id', id);

        if (el.tagName === 'H2') {
            currentH2 = {
                text: `${sectionCount}. ${text}`,
                href: `#${id}`,
                children: [],
            };
            toc.push(currentH2);
            sectionCount++;
            subsectionCount = 1;
        } else if (el.tagName === 'H3' && currentH2) {
            currentH2.children.push({
                text: `${sectionCount - 1}.${subsectionCount}. ${text}`,
                href: `#${id}`,
            });
            subsectionCount++;
        }
    });

    return {
        processedHtml: doc.body.innerHTML,
        tocData: toc,
    };
};

const NewsDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostBySlug = async () => {
            try {
                // const res = await axios.get('https://admin.pion.edu.vn/api/posts');
                // const res = await axios.get(`${BASE_URL}/posts`, {
                //     headers: { Authorization: `Bearer ${TOKEN}` },
                // });
                const res = await axios.get(`${BASE_URL}/posts`);

                const posts = res.data.data || res.data;
                const found = posts.find((item) => item.slug === slug);

                if (!found) {
                    setPost(null);
                    setLoading(false);
                    return;
                }

                // const detailRes = await axios.get(`https://admin.pion.edu.vn/api/posts/${found.id}`);
                // Lấy chi tiết bài viết
                const detailRes = await axios.get(`${BASE_URL}/posts/${found.id}`);
                // const detailRes = await axios.get(`${BASE_URL}/posts/${found.id}`, {
                //     headers: { Authorization: `Bearer ${TOKEN}` },
                // });
                const rawPost = detailRes.data.data || detailRes.data;
                const rawHtml = rawPost.content?.content_html || '';

                const { processedHtml, tocData } = await processContentAndGenerateToc(rawHtml);

                // let ogImageUrl = null;

                // Xử lý ảnh đại diện og:image
                let ogImageUrl = '/assets/img/default.jpg';

                // Lấy media từ featured_media_id
                if (rawPost.featured_media_id) {
                    // const mediaRes = await axios.get('https://admin.pion.edu.vn/api/media');
                    // const mediaRes = await axios.get(`${BASE_URL}/media`, {
                    //     headers: { Authorization: `Bearer ${TOKEN}` },
                    // });
                    const mediaRes = await axios.get(`${BASE_URL}/media`);
                    const mediaList = mediaRes.data.data || mediaRes.data;

                    const mediaMap = {};
                    mediaList.forEach((media) => {
                        if (media.id) mediaMap[media.id] = media;
                    });

                    const media = mediaMap[rawPost.featured_media_id];
                    const ogPath = media?.meta?.variants?.og?.path;

                    // ogImageUrl = ogPath
                    //     ? `${process.env.REACT_APP_PROD_URL}/storage/${ogPath}`
                    //     : '/assets/img/default.jpg';
                    // ogImageUrl = ogPath ? `https://admin.pion.edu.vn/storage/${ogPath}` : '/assets/img/default.jpg';
                    if (ogPath) {
                        ogImageUrl = `${BASE_URL.replace('/api', '/storage')}/${ogPath}`;
                    }
                }

                setPost({
                    ...rawPost,
                    content: {
                        ...rawPost.content,
                        content_html: processedHtml,
                    },
                    tocData,
                    ogImageUrl,
                });
            } catch (err) {
                // console.error('Lỗi khi lấy bài viết:', err);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPostBySlug();
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
                    <meta property="og:title" content={post.title} />
                    <meta property="og:description" content={post.sapo_text || post.title} />
                    <meta property="og:image" content={post.ogImageUrl} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={window.location.href} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content={post.ogImageUrl} />
                </Helmet>
            )}
            <BlogLayout tocData={post.tocData} breadcrumbTitle={post.title} parentPath="/tin-tuc" parentLabel="Tin tức">
                <div className={cx('post-wrapper')}>
                    <div className={cx('post-content')}>
                        <h1 className={cx('post-title')}>{post.title}</h1>

                        {post.sapo_text && (
                            <div className={cx('post-sapo')}>
                                <p>{post.sapo_text}</p>
                            </div>
                        )}

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
