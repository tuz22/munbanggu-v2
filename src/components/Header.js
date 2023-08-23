import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subChange } from '../store/subSlice';

function Header(props) {
    const { category } = props;
    const dispatch = useDispatch();
    const [bg, setBg] = useState('bgOff');
    const handleScroll = () => {
        window.scrollY === 0 ? setBg('bgOff') : setBg('bgOn');
    };

    useEffect(() => {
        const timer = setInterval(() => {
            window.addEventListener('scroll', handleScroll);
        }, 100);
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <title>배민문방구</title>
            <div className={`${bg} header-container`}>
                <header>
                    <Link to="/">
                        <button className="logo logo-btn">로고</button>
                    </Link>
                    <nav>
                        <ul>
                            {category.map((data, i) => {
                                let link = '/goods/list/' + data.id;
                                return (
                                    <Link to={link} key={data.id}>
                                        <li>{data.category}</li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </nav>
                    <ul>
                        <li>
                            <button className="icon search-btn">검색</button>
                        </li>
                        <li>
                            <Link to="/cart" className="icon cart-btn">
                                장바구니
                            </Link>
                        </li>
                        <li className="login-btn">로그인</li>
                        <li>
                            <button
                                onClick={() => {
                                    dispatch(subChange());
                                }}
                                className="icon menu-btn"
                            >
                                햄버거메뉴
                            </button>
                        </li>
                    </ul>
                </header>
            </div>
        </>
    );
}
export default Header;
