const routes = {
    // Auth
    register: '/dang-ky',
    login: '/dang-nhap',
    logout: '/dang-xuat',
    forgotPassword: '/quen-mat-khau',
    changePassword: '/doi-mat-khau',
    profile: '/thong-tin-ca-nhan',
    verifyEmail: '/xac-thuc-email',
    verifyPhone: '/xac-thuc-so-dien-thoai',

    // Page
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

    // learning
    learning: '/learning',
    myCourses: '/my-courses',
};

export default routes;
