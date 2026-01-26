import { Collapse } from 'antd';
import { MdCheckCircle } from 'react-icons/md';
import { IoMdPlayCircle } from 'react-icons/io';
import { SiGoogledocs } from 'react-icons/si';
import classNames from 'classnames/bind';
import styles from './ELearningLayout.module.scss';
import { eCourseDetails } from '@/data/eCourses';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

export default function Sidebar({ isOpen }) {
    const { slug } = useParams();
    const course = eCourseDetails[slug];

    if (!course) return <aside className={cx('sidebar', { closed: !isOpen })}>Khóa học không tồn tại</aside>;

    let lessonIndex = 1;

    return (
        <aside className={cx('sidebar', { closed: !isOpen })}>
            <div className={cx('chapters')}>
                <h2 className={cx('sidebar-title')}>Nội dung khóa học</h2>
                <Collapse accordion expandIconPosition="end">
                    {course.chapters.map((chapter, index) => {
                        const completedCount = chapter.lessons.length; // mock completed lessons
                        const totalCount = chapter.lessons.length;
                        const duration = chapter.duration || '00:00';

                        return (
                            <Panel
                                key={index}
                                header={
                                    <div className={cx('chapter-header')}>
                                        <span className={cx('chapter-title')}>
                                            {index + 1}. {chapter.title}
                                        </span>
                                        <span className={cx('chapter-desc')}>
                                            {completedCount}/{totalCount} | {duration}
                                        </span>
                                    </div>
                                }
                            >
                                <ul className={cx('lesson-list')}>
                                    {chapter.lessons.map((lesson, i) => {
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
                                                            {currentIndex % 2 !== 0 ? (
                                                                <IoMdPlayCircle />
                                                            ) : (
                                                                <SiGoogledocs />
                                                            )}
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
                            </Panel>
                        );
                    })}
                </Collapse>
            </div>
        </aside>
    );
}
