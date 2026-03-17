import { MdCheckCircle } from 'react-icons/md';
import { IoMdPlayCircle } from 'react-icons/io';
import { SiGoogledocs } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import classNames from 'classnames/bind';

import { formatDuration } from '@/utils/formatDuration';
import styles from './ELearningLayout.module.scss';

const cx = classNames.bind(styles);

export default function Sidebar({ lessons, currentLessonId, courseSlug, isOpen, loading }) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <aside className={cx('sidebar')}>
                <Skeleton.Input active style={{ width: '70%', margin: 16 }} />

                <Skeleton active paragraph={{ rows: 10 }} />
            </aside>
        );
    }

    return (
        <aside className={cx('sidebar', { closed: !isOpen })}>
            <div className={cx('sidebar-inner')}>
                <h2 className={cx('sidebar-title')}>Nội dung khóa học</h2>

                <ul className={cx('lesson-list')}>
                    {lessons.map((lesson) => (
                        <li
                            key={lesson.id}
                            className={cx('lesson-wrapper', { active: currentLessonId === lesson.id.toString() })}
                            onClick={() => navigate(`/learning/${courseSlug}?id=${lesson.id}`)}
                        >
                            <div className={cx('lesson-info')}>
                                <h3 className={cx('lesson-title')}>
                                    {lesson.order}. {lesson.title}
                                </h3>
                                <div className={cx('lesson-desc')}>
                                    <div
                                        className={cx('lesson-type', {
                                            video: !lesson.is_quiz, // nếu không phải quiz thì là video
                                            quiz: lesson.is_quiz,
                                        })}
                                    >
                                        {lesson.is_quiz ? <SiGoogledocs /> : <IoMdPlayCircle />}
                                    </div>

                                    <span className={cx('lesson-time')}>
                                        {lesson.duration ? formatDuration(lesson.duration, 'lesson') : '------'}
                                    </span>
                                </div>
                            </div>
                            <span className={cx('play-icon')}>
                                <MdCheckCircle />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
