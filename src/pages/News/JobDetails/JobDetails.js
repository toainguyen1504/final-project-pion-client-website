import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { RiQuillPenFill } from 'react-icons/ri';

import HeadingStar from '@/components/HeadingStar';
import Breadcrumb from '@/components/Breadcrumb';
import { jobs } from '@/data';
import styles from './JobDetails.module.scss';

const cx = classNames.bind(styles);

const JobDetails = () => {
    const { slug } = useParams();
    const job = jobs.find((item) => item.slug === slug);

    return job ? (
        <div className={cx('job-wrapper')}>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb parentPath="/tuyen-dung" parentLabel="Tin tuyển dụng" title={job.title} />
            </div>

            <HeadingStar title={`Tin tuyển dụng - ${job.title}`} color="var(--primary)" />

            {/* Info job basic */}
            <div className={cx('job-info')}>
                <h2 className={cx('job-title')}>PION CORPORATION</h2>
                <p className={cx('job-position')}>
                    <span>Vị trí: </span>
                    {job?.position || 'Đang cập nhật...'}
                </p>
                <p className={cx('job-quantity')}>
                    <span>Số lượng cần tuyển: </span>
                    {job?.quantity || 'Đang cập nhật...'}
                </p>
                <p className={cx('job-location')}>
                    <span>Địa điểm làm việc: </span> {job?.location || 'Đang cập nhật...'}
                </p>
                <p className={cx('job-salary')}>
                    <span>Mức lương:</span> {job?.salary || 'Đang cập nhật...'}
                </p>
                <p className={cx('job-experience')}>
                    <span>Kinh nghiệm: </span>
                    {job?.experience || 'Đang cập nhật...'}
                </p>
                <p className={cx('job-deadline')}>
                    <span>Hạn nộp hồ sơ: </span>
                    {job?.deadline || 'Đang cập nhật...'}
                </p>
            </div>

            <div className={cx('job-detail')}>
                {/* Mô tả công việc */}
                <div className={cx('job-description')}>
                    <h3>Mô tả công việc</h3>
                    <ul className={cx('desc', 'icon-list')}>
                        {job.description_list.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('text-wrapper')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <p className={cx('text')}>{item}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Yêu cầu công việc */}
                <div className={cx('job-requirements')}>
                    <h3>Yêu cầu</h3>
                    <ul className={cx('desc', 'icon-list')}>
                        {job.requirements.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('text-wrapper')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <p className={cx('text')}>{item}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quyền lợi*/}
                <div className={cx('job-benefits')}>
                    <h3>Quyền lợi</h3>
                    <ul className={cx('desc', 'icon-list')}>
                        {job.benefits.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('text-wrapper')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <p className={cx('text')}>{item}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Thời gian làm việc */}
                <div className={cx('job-hours')}>
                    <h3>Thời gian làm việc</h3>
                    <ul className={cx('desc', 'icon-list')}>
                        {job.working_hours.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('text-wrapper')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <p className={cx('text')}>{item}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cách ứng tuyển: */}
                <div className={cx('job-apply')}>
                    <h3>Cách ứng tuyển:</h3>
                    <ul className={cx('desc', 'icon-list')}>
                        {job.application_process.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <div className={cx('text-wrapper')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <p className={cx('text')}>{item}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    ) : (
        <p>Không tìm thấy công việc này!</p>
    );
};

export default JobDetails;
