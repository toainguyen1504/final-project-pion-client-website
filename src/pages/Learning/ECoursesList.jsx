import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import ECoursesCard from '@/components/ECoursesCard';
import eCourses from '@/data/eCourses'; // import trực tiếp mảng eCourses (mock data)
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

const ECoursesList = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={cx('courses')}>
            <div className={cx('courses-inner')}>
                {loading
                    ? [...Array(6)].map((_, i) => <ECoursesCard key={i} loading title="Loading..." link="#" />)
                    : eCourses.map((course, i) => (
                          <div
                              className={cx('course-animate')}
                              style={{ animationDelay: `${i * 0.16}s` }}
                              key={course.link}
                          >
                              <ECoursesCard
                                  title={course.title}
                                  price={course.price}
                                  image={course.image}
                                  link={course.link}
                                  button={course.button}
                                  stats={course.stats}
                              />
                          </div>
                      ))}
            </div>
        </section>
    );
};

export default ECoursesList;
