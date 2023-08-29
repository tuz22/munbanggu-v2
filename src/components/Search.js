import { useEffect, useRef, useState } from 'react';
import data from '../data/data';
import Thumbnail from './Thumbnail';
import Price from './Price';

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
                        <div className="search-results-container">
                            {searchResults &&
                                searchResults.map((result) => {
                                    // return <CardIndex item={result} />;
                                    console.log(result);
                                    console.log(result.thumbnail1);
                                    return (
                                        <div className="search-results">
                                            {/* <img src={result.thumbnail1} /> */}
                                            <Thumbnail
                                                thumbnail1={result.thumbnail1}
                                                thumbnail2={result.thumbnail2}
                                                width={200}
                                                height={200}
                                            />
                                            <h5>{result.title}</h5>
                                            <Price price={result.price} discount={result.discount} fontSize={14} />
                                        </div>
                                    );
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
