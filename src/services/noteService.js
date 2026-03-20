import axiosInstance from '@/utils/axiosInstance';

export const createNote = async (data) => {
    const res = await axiosInstance.post('/api/client/notes', data);
    return res.data.data;
};

export const getNotesByLesson = async (lessonId, order = 'desc') => {
    const res = await axiosInstance.get(`/api/client/lessons/${lessonId}/notes`, {
        params: { order },
    });

    return res.data.data; // trả về object có pagination và data
};

export const updateNote = async (id, data) => {
    const res = await axiosInstance.put(`/api/client/notes/${id}`, data);
    return res.data.data;
};

export const deleteNote = async (id) => {
    const res = await axiosInstance.delete(`/api/client/notes/${id}`);
    return res.data;
};
