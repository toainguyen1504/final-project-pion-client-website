import { useEffect, useState } from 'react';
import { getMyLearningCourses } from '@/services/myLearningServices';

export default function useMyLearning() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getMyLearningCourses();
                setCourses(res.data);
            } catch (err) {
                console.error('Fetch learning courses failed:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { courses, loading };
}
