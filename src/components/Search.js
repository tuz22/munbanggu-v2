import { useEffect, useRef, useState } from 'react';
import data from '../data/data';
import Thumbnail from './Thumbnail';
import Price from './Price';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResultsContainer = styled.div`
    display: ${(props) => props.display};
    overflow-x: auto;
    width: 100%;
    height: 300px;
    position: absolute;
    left: 0px;
    top: 62px;
    padding: 0px 16px 16px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(18, 18, 18, 0.05) 0px 0px 15px, rgba(18, 18, 18, 0.05) 0px 10px 10px,
        rgba(18, 18, 18, 0.05) 0px 20px 30px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;
const NullResults = styled.div`
    overflow-x: auto;
    width: 100%;
    height: 300px;
    position: absolute;
    left: 0px;
    top: 62px;
    padding: 0px 16px 16px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(18, 18, 18, 0.05) 0px 0px 15px, rgba(18, 18, 18, 0.05) 0px 10px 10px,
        rgba(18, 18, 18, 0.05) 0px 20px 30px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

function Search() {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isNullResults, setIsNullResults] = useState(false);
    const searchBoxRef = useRef(null);
    const navigate = useNavigate();

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
        console.log('filteredResults', filteredResults);
        if (filteredResults.length < 1) {
            setIsNullResults(true);
        } else {
            setIsNullResults(false);
        }

        setSearchResults(filteredResults);
    };

    const handleClick = (id) => {
        navigate('/goods/detail/' + id);
        toggleSearchBox();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
                setIsSearchActive(false);
                setIsNullResults(false);
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
                    <ResultsContainer display={searchResults.length > 0 ? 'flex' : 'none'}>
                        <div style={{ display: '-webkit-inline-box' }}>
                            {searchResults &&
                                searchResults.map((result) => {
                                    console.log(result);
                                    return (
                                        <div className="search-results">
                                            <button onClick={() => handleClick(result.id)}>
                                                <Thumbnail
                                                    thumbnail1={result.thumbnail1}
                                                    thumbnail2={result.thumbnail2}
                                                    width={200}
                                                    height={200}
                                                />
                                                <h5>{result.title}</h5>
                                                <Price price={result.price} discount={result.discount} fontSize={14} />
                                            </button>
                                        </div>
                                    );
                                })}
                        </div>
                    </ResultsContainer>
                    {isNullResults && (
                        <NullResults style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            검색 결과가 없습니다
                        </NullResults>
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
