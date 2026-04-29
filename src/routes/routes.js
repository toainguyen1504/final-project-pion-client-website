import config from '@/config';

// Layout
import NotFoundPage from '@/components/NotFoundPage';
import { BlogLayout, SidebarRightLayout, ELearningLayout } from '@/layouts';

import Home from '@/pages/Home';
import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ProfilePage,
    EmailVerifyPage,
    PhoneVerifyPage,
    ChangePasswordPage,
} from '@/pages/Auth';

import About from '@/pages/About';
import Contact from '@/pages/Contact';
import CourseDetail from '@/pages/CourseDetail';
import RegisterProgram from '@/pages/RegisterProgram';
import SearchPage from '@/pages/SearchPage';
// import { StudyAbroadGerman, StudyAbroadChina, StudyAbroadKorean } from '@/pages/StudyAbroad';
import { StudyAbroadChina } from '@/pages/StudyAbroad';
import { NewsList, NewsDetail, NewsAvailablePosition, NewsFAQ, JobDetails } from '@/pages/News';
import Learning from '@/pages/Learning'; // E-LEARNING
import ECourseDetail from '@/pages/Learning/ECourseDetail'; // E-LEARNING
import LearningMode from '@/pages/Learning/LearningMode'; // E-LEARNING
import MyLearning from '@/pages/MyLearning'; // My Learning

import PaymentMomoQr from '@/pages/PaymentMomoQr';
import PaymentMomoResult from '@/pages/PaymentMomoResult';

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
    { path: config.routes.changePassword, component: ChangePasswordPage, layout: null },

    // E-learning
    { path: config.routes.learning, component: Learning }, // lấy default layout

    //E-courses detail - dùng layout default
    {
        path: config.routes.eCourseDetail,
        component: ECourseDetail,
    },

    // Payment Momo
    {
        path: config.routes.paymentMomoQr,
        component: PaymentMomoQr,
        layout: null,
    },
    {
        path: config.routes.paymentMomoResult,
        component: PaymentMomoResult,
        layout: null,
    },

    // E-LEARNING MODE
    {
        path: config.routes.learningMode,
        component: LearningMode,
        layout: ELearningLayout, // tạo layout riêng
    },

    // My Learning (danh sách các khóa học đang học)
    {
        path: config.routes.myCourses,
        component: MyLearning,
    },

    // Info Pages
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.registerProgram, component: RegisterProgram, layout: null },

    // Courses
    { path: config.routes.programSlug, component: CourseDetail, layout: SidebarRightLayout },

    {
        path: config.routes.studyAbroadChina,
        component: StudyAbroadChina,
        layout: (props) => <BlogLayout {...props} tocData={tocDataChina} breadcrumbTitle="Du học Trung Quốc" />,
    },

    // Tuyển dụng
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

    // Câu hỏi thường gặp
    { path: config.routes.faq, component: NewsFAQ },

    // other pages
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.notFound, component: NotFoundPage },
];
// {note: have layout: null },

// ....
// { path: config.routes.news, component: News, layout: BlogLayout },

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

// News
// {
//     path: config.routes.newsLaborExport,
//     component: NewsLaborExport,
//     layout: (props) => (
//         <BlogLayout {...props} tocData={tocDataLaborExport} breadcrumbTitle="Thông tin về xuất khẩu lao động" />
//     ),
// },

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
