import classNames from 'classnames/bind';

import { Tabs } from 'antd';
import { useParams, Navigate } from 'react-router-dom';
import { RiQuillPenFill } from 'react-icons/ri';
import { SiTicktick } from 'react-icons/si';

import { DEFAULT_IMAGE } from '@/constants';
import { courses } from '@/data';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './CourseDetail.module.scss';

const cx = classNames.bind(styles);

function CourseDetail() {
    const { slug } = useParams();
    let course = null;

    for (const courseList of Object.values(courses)) {
        const found = courseList.find((c) => c.slug === slug);
        if (found) {
            course = found;
            break;
        }
    }

    const getTabItems = (course) => [
        {
            key: '1',
            label: <span className={cx('tab-label')}>Nội dung</span>,
            children: (
                <ul className={cx('content-list')}>
                    {course.content.map((item, index) => (
                        <li key={index}>
                            <div className={cx('content-item')}>
                                <RiQuillPenFill size={24} className={cx('icon')} />
                                <p className={cx('text')}>{item}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            key: '2',
            label: <span className={cx('tab-label')}>Mục tiêu</span>,
            children: (
                <ul className={cx('content-list')}>
                    {course.goals.map((item, index) => (
                        <li key={index}>
                            <div className={cx('content-item')}>
                                <SiTicktick size={24} className={cx('icon')} />
                                <p className={cx('text')}>{item}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    if (!course) return <Navigate to="/404" replace />;

    return (
        <div>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb title={`Khóa Học - ${course?.title ?? 'Đang cập nhật...'}`} />
            </div>

            <section className={cx('course')}>
                <div className={cx('content')}>
                    <div className={cx('image')}>
                        <img
                            src={course.image || DEFAULT_IMAGE}
                            alt={course?.title ?? 'Đang cập nhật...'}
                            loading="lazy"
                        />
                    </div>
                    <div className={cx('info')}>
                        <h2 className={cx('title')}>
                            <span>Khóa học: </span> {course?.title ?? 'Đang cập nhật...'}
                        </h2>
                        <p className={cx('sub-title')}>{course?.subTitle ?? 'Đang cập nhật...'}</p>

                        <p className={cx('description')}>
                            <span className={cx('highlight')}>Điểm đặc biệt của khoá học: </span>
                            {course?.descDetail ?? 'Đang cập nhật...'}
                        </p>
                    </div>
                </div>

                <Tabs className={cx('tabs')} defaultActiveKey="2" items={getTabItems(course)} centered />
            </section>
        </div>
    );
}

export default CourseDetail;
