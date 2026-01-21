// Gộp thêm tin tức api- làm sau, nên viết api xử lý search ở backend
const searchData = [
    // Khóa học mặc định - thông tin
    { id: 1, slug: 'tieng-anh-mam-non', title: 'Tiếng Anh mầm non' },
    { id: 2, slug: 'tieng-anh-tieu-hoc', title: 'Tiếng Anh tiểu học' },
    { id: 3, slug: 'tieng-anh-giao-tiep', title: 'Tiếng Anh giao tiếp' },
    { id: 4, slug: 'tieng-trung-giao-tiep', title: 'Tiếng Trung giao tiếp' },
    { id: 5, slug: 'tieng-trung-tre-em', title: 'Tiếng Trung trẻ em' },
    { id: 6, slug: 'hskk-tai-pion', title: 'HSK(K) Tại Pion' },
    { id: 7, slug: 'csca-tai-pion', title: 'CSCA Tại Pion' },
    { id: 10, slug: 'tin-tuc/dieu-kien-du-hoc-trung-quoc-2025', title: 'Điều kiện du học Trung Quốc năm 2025' }, // tin tức mặc định

    // Tin tức
    // { id: 11, slug: 'xuat-khau-lao-dong', title: 'Xuất khẩu lao động' },
    { id: 12, slug: 'tuyen-dung', title: 'Vị trí tuyển dụng' },
];

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// search result
export const searchItems = (query) => {
    if (!query.trim()) return [];

    const formattedQuery = removeAccents(query.trim().toLowerCase());

    return searchData.filter((item) => removeAccents(item.title.toLowerCase()).includes(formattedQuery));
};
