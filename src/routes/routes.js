import config from '@/config';

// Layout
import NotFoundPage from '@/components/NotFoundPage';
import { BlogLayout, SidebarRightLayout } from '@/layouts';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import CourseDetail from '@/pages/CourseDetail';
import SearchPage from '@/pages/SearchPage';
// import { StudyAbroadGerman, StudyAbroadChina, StudyAbroadKorean } from '@/pages/StudyAbroad';
import { StudyAbroadChina } from '@/pages/StudyAbroad';
import { NewsAvailablePosition, NewsFAQ, JobDetails } from '@/pages/News';
import { tocDataChina } from '@/data';
// import { tocDataKorean, tocDataGerman, tocDataChina, tocDataLaborExport } from '@/data';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },

    // Courses
    { path: config.routes.courseSlug, component: CourseDetail, layout: SidebarRightLayout },

    // Study Abroad
    // {
    //     path: config.routes.studyAbroadGerman,
    //     component: StudyAbroadGerman,
    //     layout: (props) => <BlogLayout {...props} tocData={tocDataGerman} breadcrumbTitle="Du học nghề Đức" />,
    // },
    // {
    //     path: config.routes.studyAbroadKorean,
    //     component: StudyAbroadKorean,
    //     layout: (props) => <BlogLayout {...props} tocData={tocDataKorean} breadcrumbTitle="Du học Hàn Quốc" />,
    // },
    {
        path: config.routes.studyAbroadChina,
        component: StudyAbroadChina,
        layout: (props) => <BlogLayout {...props} tocData={tocDataChina} breadcrumbTitle="Du học Trung Quốc" />,
    },

    // News
    // {
    //     path: config.routes.newsLaborExport,
    //     component: NewsLaborExport,
    //     layout: (props) => (
    //         <BlogLayout {...props} tocData={tocDataLaborExport} breadcrumbTitle="Thông tin về xuất khẩu lao động" />
    //     ),
    // },
    {
        path: config.routes.newsAvailablePosition,
        component: NewsAvailablePosition,
    },
    {
        path: config.routes.jobDetails,
        component: JobDetails,
    },
    { path: config.routes.faq, component: NewsFAQ },

    // ....
    // { path: config.routes.news, component: News, layout: BlogLayout },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.notFound, component: NotFoundPage },
];
// {note: have layout: null },

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
