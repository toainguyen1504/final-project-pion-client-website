import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import ImageCard from '@/components/ImageCard';
import { jobs } from '@/data';
import styles from './AvailablePosition.module.scss';

const cx = classNames.bind(styles);

function AvailablePosition() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={cx('wrapper')}>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb title={'Tin tuyển dụng'} />
            </div>

            <HeadingStar title="Vị trí tuyển dụng" color="var(--primary)" />

            <div className={cx('jobs-list')}>
                {jobs.map((job, index) => (
                    <ImageCard
                        key={index}
                        title={job.title}
                        desc={job.desc}
                        link={job.slug}
                        image={job.image || '/assets/img/default.jpg'}
                        button="Xem chi tiết"
                        loading={loading}
                    />
                ))}
            </div>
        </section>
    );
}

export default AvailablePosition;
