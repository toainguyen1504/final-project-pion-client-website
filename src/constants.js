export const DEFAULT_IMAGE = '/assets/img/default.jpg';
export const DEFAULT_AVATAR_IMAGE = '/assets/img/avatar_default.jpg';

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
