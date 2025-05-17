import { useMemo } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { studyAbroad } from '@/data';
import styles from './RelatedContent.module.scss';
import ImageCard from '@/components/ImageCard';

const cx = classNames.bind(styles);

const RelatedContent = () => {
    const currentPath = window.location.pathname;

    const relatedStudyAbroads = useMemo(() => {
        return studyAbroad.filter((item) => item.link !== currentPath) || [];
    }, [currentPath]);

    return (
        <aside className={cx('related-content')}>
            <div className={cx('heading-section')}>
                <h2 id="noi-dung-lien-quan" className={cx('title-section', 'uppercase')}>
                    Nội dung liên quan
                </h2>
            </div>

            {relatedStudyAbroads.length > 0 ? (
                <div className={cx('card-grid')}>
                    {relatedStudyAbroads.map((card, index) => (
                        <ImageCard
                            key={card.id || `card-${index}`}
                            title={card.title}
                            desc={card.desc}
                            image={card.image}
                            link={card.link}
                            button="Xem chi tiết"
                        />
                    ))}
                </div>
            ) : (
                <p className={cx('no-content')}>Không có nội dung liên quan.</p>
            )}
        </aside>
    );
};

export default RelatedContent;
