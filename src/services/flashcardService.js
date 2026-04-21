import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getToken } from '@/services/authService';

export async function getFlashcardsByLesson(lessonId) {
    try {
        const token = getToken();

        const response = await axios.get(`${BASE_URL}/client/lessons/${lessonId}/flashcards`, {
            headers: token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : {},
        });

        return response?.data?.data || [];
    } catch (error) {
        console.error('Error fetching flashcards by lesson:', error);
        return [];
    }
}
