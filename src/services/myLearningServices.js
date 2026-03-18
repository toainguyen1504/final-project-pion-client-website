import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getToken } from '@/services/authService';

export const getMyLearningCourses = async () => {
    const token = getToken();

    const res = await axios.get(`${BASE_URL}/client/me/learning-courses`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return res.data;
};

export const getCurrentLearning = async () => {
    const token = getToken();

    const res = await axios.get(`${BASE_URL}/client/me/current-learning`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return res.data.data;
};

export const getLessonProgress = async (lessonId) => {
    const token = getToken();

    const res = await axios.get(`${BASE_URL}/client/lesson-progress/${lessonId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return res.data.data;
};

export const updateLessonProgress = async (data) => {
    const token = getToken();

    const res = await axios.post(`${BASE_URL}/client/lesson-progress`, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return res.data.data;
};
