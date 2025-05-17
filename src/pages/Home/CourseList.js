import classNames from 'classnames/bind';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { courses } from '@/data';
import ImageCard from '@/components/ImageCard';
import styles from './Home.module.scss';

const enFlag = '/assets/icons/flags/en.svg';
const zhFlag = '/assets/icons/flags/zh-CN.svg';
const gerFlag = '/assets/icons/flags/ger.svg';
const koFlag = '/assets/icons/flags/ko.svg';

const cx = classNames.bind(styles);

const CourseList = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const handleTabChange = (key) => {
        setActiveTab(key);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 280);
    };

    const tabs = [
        { key: '1', shortLabel: 'Anh', fullLabel: 'Tiếng Anh', icon: enFlag, data: courses.english },
        { key: '2', shortLabel: 'Trung', fullLabel: 'Tiếng Trung', icon: zhFlag, data: courses.chinese },
        { key: '3', shortLabel: 'Đức', fullLabel: 'Tiếng Đức', icon: gerFlag, data: courses.german },
        { key: '4', shortLabel: 'Hàn', fullLabel: 'Tiếng Hàn', icon: koFlag, data: courses.korean },
    ];

    const items = tabs.map((tab) => ({
        key: tab.key,
        label: (
            <div className={cx('tab-inner')}>
                <img src={tab.icon} alt="" className={cx('tab-icon')} />
                <span className={cx('short-label')}>{tab.shortLabel}</span>
                <span className={cx('full-label')}>{tab.fullLabel}</span>
            </div>
        ),
        children: loading ? (
            <div className={cx('courses-loading')}>
                {[...Array(6)].map((_, index) => (
                    <ImageCard key={index} loading />
                ))}
            </div>
        ) : (
            <div className={cx('courses-inner')}>
                {tab.data.map((course, index) => (
                    <div
                        className={cx({ 'course-animate': tab.key === activeTab })}
                        style={{ animationDelay: `${index * 0.16}s` }}
                        key={course.link}
                    >
                        <ImageCard
                            title={course.title}
                            desc={course.desc}
                            image={course.image || '/assets/img/default.jpg'}
                            link={course.link}
                            button="Xem chi tiết"
                        />
                    </div>
                ))}
            </div>
        ),
    }));

    return <Tabs defaultActiveKey="1" className={cx('tabs')} centered onChange={handleTabChange} items={items} />;
};

// CourseList.propTypes = {
//     title: PropTypes.string,
//     desc: PropTypes.string,
//     link: PropTypes.string,
// };

export default CourseList;
