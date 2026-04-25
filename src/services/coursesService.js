import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getToken } from '@/services/authService';

// Hàm lấy ảnh course
function resolveCourseImage(course) {
    return course.thumbnail_thumb || course.thumbnail_url || course.thumbnail || '';
}

// Hàm chuẩn hóa 1 course
function normalizeCourse(course) {
    const priceNum = parseFloat(course.price);
    const discountNum = course.discount_price ? parseFloat(course.discount_price) : null;

    const normalized = {
        ...course,

        // Chuẩn hóa giá
        price: isNaN(priceNum) ? 0 : priceNum,
        discount_price: discountNum,

        // Chuẩn hóa thống kê
        participants: Number(course.participants) || 0,
        total_lessons: Number(course.total_lessons) || 0,
        duration: Number(course.duration) || 0,

        // Boolean
        enrolled: !!course.enrolled,
        is_free: !!course.is_free,

        // Thumbnail mới
        image: resolveCourseImage(course),
        thumbnail_url: course.thumbnail_url || '',
        thumbnail_thumb: course.thumbnail_thumb || '',
        thumbnail_og: course.thumbnail_og || '',
        thumbnail_media_id: course.thumbnail_media_id || null,

        // Route
        link: course.enrolled ? `/learning/${course.slug}` : `/e-courses/${course.slug}`,
    };

    return normalized;
}

// Lấy tất cả khóa học cho client (không phân trang)
export async function getAllCourses() {
    try {
        const token = getToken();
        console.log('Token gửi lên:', token);
        const res = await axios.get(`${BASE_URL}/client/courses`, {
            params: { per_page: 9999 },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        console.log('getAllCourses - API response:', res.data);

        const coursesData = res.data.data || res.data;
        return coursesData.map(normalizeCourse);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách khóa học:', error);
        return [];
    }
}

// Lấy danh sách khóa học cho client (có phân trang)
export async function getAllCoursesWithPagination(page = 1, perPage = 12) {
    try {
        const token = getToken();
        const res = await axios.get(`${BASE_URL}/client/courses`, {
            params: { page, per_page: perPage },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const coursesData = res.data.data || [];
        const meta = res.data.meta || {
            current_page: 1,
            last_page: 1,
            per_page: perPage,
            total: coursesData.length,
        };

        return { data: coursesData.map(normalizeCourse), meta };
    } catch (error) {
        console.error('Lỗi khi lấy danh sách khóa học:', error);
        return { data: [], meta: { current_page: 1, last_page: 1, per_page: perPage, total: 0 } };
    }
}

// Lấy chi tiết khóa học theo slug
export async function getCourseBySlug(slug) {
    try {
        const token = getToken();
        const res = await axios.get(`${BASE_URL}/client/courses/${slug}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const course = res.data.data || res.data;
        if (!course) return null;
        return normalizeCourse(course);
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết khóa học slug=${slug}:`, error);
        return null;
    }
}

// Đăng ký khóa học (enroll)
export async function enrollCourse(courseId, slug, navigate) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Bạn cần đăng nhập trước khi đăng ký khóa học.');
        }
        const res = await axios.post(
            `${BASE_URL}/client/courses/${courseId}/enroll`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
        );
        const course = res.data.data;
        // Nếu đăng ký thành công thì điều hướng sang learning mode
        navigate(`/learning/${slug}`);
        return normalizeCourse(course);
    } catch (error) {
        // Nếu lỗi 422 (đã đăng ký rồi) thì cũng điều hướng sang learning mode
        if (error.response?.status === 422) {
            navigate(`/learning/${slug}`);
        }
        throw error;
    }
}

// -------------------------------
// Learning mode - Lấy chi tiết khóa học cho chế độ học tập (có thể có thêm dữ liệu liên quan đến bài học, tiến độ, v.v.)
// -------------------------------
// Chuẩn hóa dữ liệu course cho learning mode
function normalizeLearningCourse(course) {
    return {
        ...course,
        participants: Number(course.participants) || 0,
        enrolled: !!course.enrolled,
        lessons: course.lessons || [],
        continue_lesson_id: course.continue_lesson_id || null,
        link: `/learning/${course.slug}`,
    };
}

// Lấy chi tiết khóa học ở chế độ học
export async function getLearningCourseBySlug(slug) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Bạn cần đăng nhập để vào học.');
        }

        const res = await axios.get(`${BASE_URL}/client/courses/${slug}/learning`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const course = res.data.data || res.data;
        if (!course) return null;

        return normalizeLearningCourse(course);
    } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu học tập slug=${slug}:`, error.response?.data || error.message);
        throw error;
    }
}
