import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import { ImSpinner } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { searchItems } from '@/services';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const inputRef = useRef();
    const navigate = useNavigate();

    const handleClear = () => {
        setSearchValue('');
        setResults([]); // clear result when clear input
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
            setLoading(true);

            setTimeout(() => {
                setResults(searchItems(value));
                setLoading(false);
            }, 800); // set mock time loading
        }
    };

    const handleSearch = () => {
        if (!searchValue.trim()) return;

        navigate(`/tim-kiem?q=${encodeURIComponent(searchValue)}`);
    };

    const menuItems = results.map((item) => ({
        key: item.id,
        label: (
            <Link to={`/${item.slug}`} className={cx('link')}>
                {item.title}
            </Link>
        ),
    }));

    return (
        <div className={cx('search-container')}>
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                open={searchValue.length > 0 && results.length > 0}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm..."
                        spellCheck={false}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <IoClose size={20} />
                        </button>
                    )}
                    {loading && <ImSpinner className={cx('loading')} size={16} />}
                    <button className={cx('search-btn')} onClick={handleSearch} onMouseDown={(e) => e.preventDefault()}>
                        <CiSearch size={24} />
                    </button>
                </div>
            </Dropdown>
        </div>
    );
}

export default Search;
