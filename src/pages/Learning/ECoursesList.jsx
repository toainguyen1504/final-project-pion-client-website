import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import ECoursesCard from '@/components/ECoursesCard';
import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

const ECoursesList = ({ courses }) => {
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
                    : courses.map((course, i) => (
                          <div
                              className={cx('course-animate')}
                              style={{ animationDelay: `${i * 0.16}s` }}
                              key={course.link}
                          >
                              <ECoursesCard
                                  title={course.title}
                                  price={course.price}
                                  discount_price={course.discount_price}
                                  image={course.image}
                                  link={course.link} // courses card component handle dùng to={link} để navigate
                                  button={course.button}
                                  participants={course.participants}
                                  total_lessons={course.total_lessons}
                                  duration={course.duration}
                              />
                          </div>
                      ))}
            </div>
        </section>
    );
};

export default ECoursesList;
