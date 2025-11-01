// Merge data - later
const searchData = [
    // Khóa học
    { id: 1, slug: 'tieng-anh-mam-non', title: 'Tiếng Anh mầm non' },
    { id: 2, slug: 'tieng-anh-tieu-hoc', title: 'Tiếng Anh tiểu học' },
    { id: 3, slug: 'tieng-anh-giao-tiep', title: 'Tiếng Anh giao tiếp' },
    { id: 4, slug: 'tieng-trung-giao-tiep', title: 'Tiếng Trung giao tiếp' },
    { id: 5, slug: 'tieng-trung-tre-em', title: 'Tiếng Trung trẻ em' },
    { id: 6, slug: 'hskk-tai-pion', title: 'HSK(K) Tại Pion' },
    { id: 7, slug: 'csca-tai-pion', title: 'CSCA Tại Pion' },
    // { id: 4, slug: 'tieng-duc-a1', title: 'Tiếng Đức A1' },
    // { id: 5, slug: 'tieng-duc-b1', title: 'Tiếng Đức B1' },
    // { id: 6, slug: 'tieng-han-so-cap-1', title: 'Tiếng Hàn sơ cấp 1' },
    // { id: 7, slug: 'tieng-han-so-cap-2', title: 'Tiếng Hàn sơ cấp 2' },

    // Du học
    // { id: 8, slug: 'du-hoc-nghe-duc', title: 'Du học nghề Đức' },
    // { id: 9, slug: 'du-hoc-han-quoc', title: 'Du học Hàn Quốc' },
    { id: 10, slug: 'dieu-kien-du-hoc-trung-quoc-2025', title: 'Điều kiện du học Trung Quốc năm 2025' },

    // Tin tức
    // { id: 11, slug: 'xuat-khau-lao-dong', title: 'Xuất khẩu lao động' },
    { id: 12, slug: 'tuyen-dung', title: 'Vị trí tuyển dụng' },
];

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const searchItems = (query) => {
    if (!query.trim()) return [];

    const formattedQuery = removeAccents(query.trim().toLowerCase());

    return searchData.filter((item) => removeAccents(item.title.toLowerCase()).includes(formattedQuery));
};
