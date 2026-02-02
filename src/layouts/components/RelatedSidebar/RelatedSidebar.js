import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { courses } from '@/data';
// jobs
import ImageCard from '@/components/ImageCard';
import HeadingSection from '@/components/HeadingSection';
import styles from './RelatedSidebar.module.scss';

const cx = classNames.bind(styles);

function RelatedSidebar() {
    const { slug } = useParams();

    // check: key course or news -> detail -> get data
    let currentCourse = null;
    let currentLanguage = null;

    // Find the current course and its language
    for (const [lang, courseList] of Object.entries(courses)) {
        const found = courseList.find((c) => c.slug === slug);
        if (found) {
            currentCourse = found;
            currentLanguage = lang;
            break;
        }
    }

    // If the current course or language isn't found, don't render the sidebar
    if (!currentCourse || !currentLanguage) return null;

    // Filter out the current course from the list of courses in the same language
    const relatedCourses = courses[currentLanguage].filter((c) => c.slug !== slug);

    return (
        <aside className={cx('wrapper')}>
            <HeadingSection title="Gợi ý" />

            <div className={cx('inner')}>
                {relatedCourses.map((course) => (
                    <ImageCard
                        key={course.id}
                        title={course.title}
                        desc={course.desc}
                        image={course.image || '/assets/img/default.jpg'}
                        link={course.link}
                        button="Xem chi tiết"
                        className={cx('card-item')}
                    />
                ))}
            </div>
        </aside>
    );
}

export default RelatedSidebar;
