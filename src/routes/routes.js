import config from '@/config';

// Layout
import NotFoundPage from '@/components/NotFoundPage';
import { BlogLayout, SidebarRightLayout } from '@/layouts';

import Home from '@/pages/Home';
import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ProfilePage,
    EmailVerifyPage,
    PhoneVerifyPage,
} from '@/pages/Auth';

import About from '@/pages/About';
import Contact from '@/pages/Contact';
import CourseDetail from '@/pages/CourseDetail';
import RegisterProgram from '@/pages/RegisterProgram';
import SearchPage from '@/pages/SearchPage';
// import { StudyAbroadGerman, StudyAbroadChina, StudyAbroadKorean } from '@/pages/StudyAbroad';
import { StudyAbroadChina } from '@/pages/StudyAbroad';
import { NewsList, NewsDetail, NewsAvailablePosition, NewsFAQ, JobDetails } from '@/pages/News';
import { tocDataChina } from '@/data';
// import { tocDataKorean, tocDataGerman, tocDataChina, tocDataLaborExport } from '@/data';

const publicRoutes = [
    // Auth
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPasswordPage, layout: null },
    { path: config.routes.profile, component: ProfilePage, layout: null },
    { path: config.routes.verifyEmail, component: EmailVerifyPage, layout: null },
    { path: config.routes.verifyPhone, component: PhoneVerifyPage, layout: null },

    // Info Pages
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.registerProgram, component: RegisterProgram, layout: null },

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
    {
        path: config.routes.newsList,
        component: NewsList,
    },
    {
        path: config.routes.newsDetail,
        component: NewsDetail,
        layout: null,
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
