import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import classNames from 'classnames/bind';
import styles from './TableOfContents.module.scss';

const cx = classNames.bind(styles);

const TableOfContents = ({ items }) => {
    const [activeId, setActiveId] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '0px 0px -60% 0px',
        });

        const headingElements = document.querySelectorAll('h1, h2, h3');
        headingElements.forEach((el) => observer.observe(el));

        return () => {
            headingElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const renderItems = (items, level = 0) => (
        <ul className={cx('list', { [`level-${level}`]: true })}>
            {items.map((item, index) => (
                <li key={index} className={cx('item')}>
                    <a
                        href={item.href}
                        className={cx('link', {
                            active: activeId === item.href.replace('#', ''),
                        })}
                    >
                        {item.text}
                    </a>
                    {item.children && renderItems(item.children, level + 1)}
                </li>
            ))}
        </ul>
    );

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                MỤC LỤC
                <button
                    className={cx('toggle-btn')}
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label={isOpen ? 'Đóng mục lục' : 'Mở mục lục'}
                >
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
            </h3>

            <div className={cx('content', { 'content-closed': !isOpen })}>{renderItems(items)}</div>
        </div>
    );
};

TableOfContents.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            children: PropTypes.array, // đệ quy cho sub-items
        }),
    ).isRequired,
};

export default TableOfContents;
