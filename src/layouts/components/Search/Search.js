import { useState, useRef } from 'react';
import { ImSpinner } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
            setLoading(true);
            setTimeout(() => setLoading(false), 800); // Mock loading
        }
    };

    return (
        <div className={cx('search-container')}>
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm..."
                    spellCheck={false}
                    onChange={handleChange}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <IoClose size={20} />
                    </button>
                )}
                {loading && <ImSpinner className={cx('loading')} size={16} />}

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <CiSearch size={24} />
                </button>
            </div>
        </div>
    );
}

export default Search;
