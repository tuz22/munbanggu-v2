import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { subChange } from '../store/subSlice';
import styled from 'styled-components';
import Search from './Search';

const CartBadge = styled.div`
    background: ${(props) => props.bg};
    width: 15px;
    height: 15px;
    margin-left: -14px;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    z-index: 1;
    opacity: 0.8;
`;
const CartBadgeCount = styled.span`
    opacity: 2;
    color: black;
    font-family: hannaPro;
`;

function Header(props) {
    const { category } = props;
    const cartItemLength = useSelector((state) => state.cartItem.length);
    const dispatch = useDispatch();
    const [bg, setBg] = useState('bgOff');
    const handleScroll = () => {
        window.scrollY === 0 ? setBg('bgOff') : setBg('bgOn');
    };

    const handleCartCount = () => {
        if (cartItemLength > 0) {
            return cartItemLength;
        }
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
                        <li className="search-btn-wrap">
                            <Search />
                        </li>
                        <Link to="/cart">
                            <li className="cart-btn-wrap">
                                <div className="icon cart-btn">장바구니 배지</div>
                                <CartBadge bg={cartItemLength > 0 ? '#2ac1bc' : ''}>
                                    <CartBadgeCount>{handleCartCount()}</CartBadgeCount>
                                </CartBadge>
                            </li>
                        </Link>
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
