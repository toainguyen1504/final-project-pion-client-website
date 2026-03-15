import { getAllNews } from '@/services';

// Dữ liệu mặc định (chương trình học, trang tĩnh…)
const defaultSearchData = [
    { id: 1, slug: 'chuong-trinh-hoc/tieng-anh-mam-non', title: 'Tiếng Anh mầm non' },
    { id: 2, slug: 'chuong-trinh-hoc/tieng-anh-tieu-hoc', title: 'Tiếng Anh tiểu học' },
    { id: 3, slug: 'chuong-trinh-hoc/tieng-anh-giao-tiep', title: 'Tiếng Anh giao tiếp' },
    { id: 4, slug: 'chuong-trinh-hoc/tieng-trung-giao-tiep', title: 'Tiếng Trung giao tiếp' },
    { id: 5, slug: 'chuong-trinh-hoc/tieng-trung-tre-em', title: 'Tiếng Trung trẻ em' },
    { id: 6, slug: 'chuong-trinh-hoc/hskk-tai-pion', title: 'HSK(K) Tại Pion' },
    { id: 7, slug: 'chuong-trinh-hoc/csca-tai-pion', title: 'CSCA Tại Pion' },
    {
        id: 10,
        slug: 'tin-tuc/dieu-kien-du-hoc-trung-quoc-2025',
        title: 'Điều kiện du học Trung Quốc năm 2025',
    },
    { id: 12, slug: 'tuyen-dung', title: 'Vị trí tuyển dụng' },
];

// Hàm remove dấu tiếng Việt
const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// === Hàm search: kết hợp defaultSearchData + news từ API ===
export async function searchItems(query) {
    if (!query.trim()) return [];

    const formattedQuery = removeAccents(query.trim().toLowerCase());

    // Lấy tin tức từ API
    let newsData = [];
    try {
        const news = await getAllNews();
        newsData = news.map((post) => ({
            id: post.id,
            slug: `tin-tuc/${post.slug}`,
            title: post.title,
        }));
    } catch (error) {
        console.error('Lỗi khi lấy tin tức cho search:', error);
    }

    // Gộp dữ liệu mặc định + tin tức
    const combinedData = [...defaultSearchData, ...newsData];

    // Lọc theo query
    return combinedData.filter((item) => removeAccents(item.title.toLowerCase()).includes(formattedQuery));
}
