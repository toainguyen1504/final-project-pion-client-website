const routes = {
    home: '/',
    about: '/gioi-thieu',
    contact: '/lien-he',
    registerProgram: '/dang-ky-tham-gia-chuong-trinh',
    search: '/tim-kiem',
    notFound: '/404',
    courseSlug: '/:slug', // course

    // study abroad
    studyAbroadGerman: '/du-hoc-nghe-duc',
    studyAbroadKorean: '/du-hoc-han-quoc',
    studyAbroadChina: '/tin-tuc/dieu-kien-du-hoc-trung-quoc-2025',

    //news
    newsLaborExport: '/xuat-khau-lao-dong',
    newsAvailablePosition: '/tuyen-dung',
    newsList: '/tin-tuc',
    newsDetail: '/tin-tuc/:slug',
    jobDetails: '/tuyen-dung/:slug',
    faq: '/cau-hoi-thuong-gap',
};

export default routes;
