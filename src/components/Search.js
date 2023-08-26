import { useEffect, useRef, useState } from 'react';
import data from '../data/data';
import styled from 'styled-components';
import CardIndex from './CardIndex';

const SearchBox = styled.div``;

function Search() {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchBoxRef = useRef(null);

    const toggleSearchBox = () => {
        setSearchValue('');
        setSearchResults([]);
        setIsSearchActive(!isSearchActive);
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
                setIsSearchActive(false);
            }
        };
        document.addEventListener('mouseup', handleClickOutside);
    }, []);

    return (
        // <>
        <div ref={searchBoxRef}>
            {isSearchActive && (
                <div className="search-container">
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="검색어를 입력해주세요"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {console.log(isSearchActive)}
                        <button onClick={getSearch} className="icon search-btn">
                            검색
                        </button>
                    </div>
                    {searchResults && (
                        <div className="search-results">
                            {searchResults &&
                                searchResults.map((result) => {
                                    return <CardIndex item={result} />;
                                })}
                        </div>
                    )}
                </div>
            )}
            <button onClick={toggleSearchBox} className="icon search-btn">
                검색창열기
            </button>
        </div>
        // </>
    );
}

export default Search;
