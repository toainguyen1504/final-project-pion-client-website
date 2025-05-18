import classNames from 'classnames/bind';
import { useSearchParams, Link } from 'react-router-dom';
import { RiQuillPenFill } from 'react-icons/ri';

import { searchItems } from '@/services';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './SearchPage.module.scss';

const cx = classNames.bind(styles);

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const results = searchItems(query || '');

    return (
        <div className={cx('search')}>
            <div className={cx('breadcrumb-wrapper')}>
                <Breadcrumb title={`Tìm kiếm: ${query}`} />
            </div>
            <h1> Kết quả tìm kiếm</h1>
            <p>
                Có <span className={cx('highlight')}>{results.length}</span> kết quả tìm kiếm phù hợp với từ khóa của
                bạn
            </p>

            <div className={cx('search-body')}>
                {results.length > 0 && (
                    <ul className={cx('desc', 'icon-list')}>
                        {results.map((item) => (
                            <li key={item.id} className={cx('item')}>
                                <div className={cx('text-wrapper')}>
                                    <RiQuillPenFill className={cx('icon')} />
                                    <Link to={`/${item.slug}`} className={cx('link')}>
                                        {item.title}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchPage;

// export { default } from './SearchPage';
