export const DEFAULT_IMAGE = '/assets/img/default.jpg';
export const DEFAULT_AVATAR_IMAGE = '/assets/img/avatar_default.jpg';

// Cấu hình BASE_URL theo môi trường
export const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_LOCAL_URL + '/api'
        : process.env.REACT_APP_PROD_URL + '/api';

// Cấu hình MEDIA_BASE_URL (trỏ tới thư mục storage)
export const MEDIA_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_LOCAL_URL}/storage`
        : `${process.env.REACT_APP_PROD_URL}/storage`;

//  Fake user data
export const FAKE_USER = {
    name: 'Nguyễn Toại',
    username: '@5140',
    avatarUrl: DEFAULT_AVATAR_IMAGE,
};

// Các role trong hệ thống
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    STAFF: 'staff',
    STAFFADS: 'staffads',
    TEACHER: 'teacher',
    LEARNER: 'learner',
    GUEST: 'guest',
};

// Role được phép vào E-learning
export const LEARNING_ROLES = [ROLES.learner, ROLES.teacher];

// Role không được phép tương tác (comment) posts
export const INTERACT_POST_ROLES = [ROLES.guest];
