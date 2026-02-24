import { MdCheckCircle } from 'react-icons/md';
import { IoMdPlayCircle } from 'react-icons/io';
import { SiGoogledocs } from 'react-icons/si';
import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';
import { eCourseDetails } from '@/data/eCourses';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Sidebar({ isOpen }) {
    const { slug } = useParams();
    const course = eCourseDetails[slug];

    if (!course) return <aside className={cx('sidebar', { closed: !isOpen })}>Khóa học không tồn tại</aside>;

    let lessonIndex = 1;

    return (
        <aside className={cx('sidebar', { closed: !isOpen })}>
            <div className={cx('sidebar-inner')}>
                <h2 className={cx('sidebar-title')}>Nội dung khóa học</h2>

                <ul className={cx('lesson-list')}>
                    {course.lessons.map((lesson) => {
                        const currentIndex = lessonIndex++;
                        return (
                            <li key={currentIndex} className={cx('lesson-wrapper')}>
                                <div className={cx('lesson-info')}>
                                    <h3 className={cx('lesson-title')}>
                                        {currentIndex}. {lesson}
                                    </h3>
                                    <div className={cx('lesson-desc')}>
                                        <div className={cx('lesson-type')}>
                                            {/* mock lesson type */}
                                            {currentIndex % 2 !== 0 ? <IoMdPlayCircle /> : <SiGoogledocs />}
                                        </div>
                                        <span className={cx('lesson-time')}>3:09</span>
                                    </div>
                                </div>
                                <span className={cx('play-icon')}>
                                    <MdCheckCircle />
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
