import axios from 'axios';
import { BASE_URL, MEDIA_BASE_URL } from '@/constants';

// 🔹 Service lấy tất cả bài viết công khai kèm media
export async function getAllNews() {
    try {
        const [postsRes, mediaRes] = await Promise.all([
            axios.get(`${BASE_URL}/posts`),
            axios.get(`${BASE_URL}/media`),
        ]);

        const postsData = postsRes.data.data || postsRes.data;
        const mediaData = mediaRes.data.data || mediaRes.data;

        // Tạo map media để dễ truy cập
        const mediaMap = {};
        mediaData.forEach((media) => {
            mediaMap[media.id] = media;
        });

        // Lọc bài viết công khai
        const now = new Date();
        const filteredPosts = postsData.filter((post) => {
            if (post.visibility === 'public') return true;
            if (post.visibility === 'scheduled_public') {
                const publishTime = new Date(post.published_at || post.schedule_time);
                return publishTime <= now;
            }
            return false;
        });

        // Ghép media vào post tương ứng
        const enrichedPosts = filteredPosts.map((post) => {
            const media = mediaMap[post.featured_media_id];
            const imagePath = media?.meta?.variants?.thumbnail?.path || media?.url;
            const imageUrl = imagePath ? `${MEDIA_BASE_URL}/${imagePath}` : '/assets/img/placeholder_img.png';

            return {
                ...post,
                image: imageUrl,
                link: post.slug,
                // fallback cho description: lấy 200 ký tự đầu từ content nếu seo_description không có
                // description:
                //     post.seo_description ||
                //     (post.content ? post.content.slice(0, 200) + '...' : 'Xem thông tin chi tiết tại đây...'),
            };
        });

        return enrichedPosts;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu tin tức:', error);
        throw error;
    }
}
