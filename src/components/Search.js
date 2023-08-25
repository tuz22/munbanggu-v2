import { useEffect, useRef, useState } from 'react';
import data from '../data/data';

function Search() {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchBoxRef = useRef(null);

    const openSearchBox = () => {
        setSearchResults([]);
        setIsSearchActive(true);
    };

    const closeSearchBox = () => {
        setSearchValue('');
        setSearchResults([]);
        setIsSearchActive(false);
    };

    const getSearch = () => {
        if (searchValue.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filteredResults = data.filter((item) => {
            return item.title.includes(searchValue);
        });

        setSearchResults(filteredResults);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
                closeSearchBox();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [isSearchActive]);

    return (
        <div className="serach-box" ref={searchBoxRef}>
            {isSearchActive ? (
                <div className="">
                    <input
                        type="text"
                        placeholder="검색어를 입력해주세요"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button onClick={getSearch} className="icon search-btn">
                        검색
                    </button>
                </div>
            ) : (
                <button onClick={openSearchBox} className="icon search-btn">
                    검색창열기
                </button>
            )}
            <div className="search-results">
                {searchResults &&
                    searchResults.map((result) => {
                        return <div key={result.id}>{result.title}</div>;
                    })}
            </div>
        </div>
    );
}

export default Search;
