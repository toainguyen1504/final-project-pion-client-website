const routes = {
    home: '/',
    about: '/gioi-thieu',
    contact: '/lien-he',
    search: '/tim-kiem',
    notFound: '/404',
    courseSlug: '/:slug', // course

    // study abroad
    studyAbroadGerman: '/du-hoc-nghe-duc',
    studyAbroadKorean: '/du-hoc-han-quoc',
    studyAbroadChina: '/du-hoc-trung-quoc',

    //news
    newsLaborExport: '/xuat-khau-lao-dong',
    newsAvailablePosition: '/tuyen-dung',
    jobDetails: '/tuyen-dung/:slug',
    faq: '/cau-hoi-thuong-gap',
};

export default routes;
