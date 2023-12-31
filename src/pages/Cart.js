import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAllItem, checkItem } from './../store/cartSlice';
import CartItem from '../components/CartItem';
import Payment from '../components/Payment';

const Container = styled.div`
    margin: 0px auto;
    padding: 80px 0px 200px;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
`;

function Cart() {
    const cartItem = useSelector((state) => state.cartItem);
    const dispatch = useDispatch();
    const [checkAll, setCheckAll] = useState('');
    const checkArr = [];

    useEffect(() => {
        const allChecked = cartItem.length > 0 && cartItem.every((item) => item.checked);
        setCheckAll(allChecked);
    }, [cartItem]);

    const handleCheckAll = () => {
        dispatch(checkAllItem());
    };

    const handleCheckItem = (itemId) => {
        dispatch(checkItem(itemId));
    };

    return (
        <Container className="cart-container">
            <header>
                <div className="cart-title">
                    <h4 className="active">장바구니</h4>
                </div>
            </header>
            <section className="cart-box">
                {/* 선택한 상품 */}
                <article className="cart-content">
                    {cartItem.length > 0 ? (
                        <div>
                            <div className="cart-header">
                                <div className="check-box">
                                    <input
                                        type="checkbox"
                                        id="@checkAll"
                                        onClick={handleCheckAll}
                                        checked={checkAll}
                                        readOnly
                                    />
                                    <label htmlFor="@checkAll">전체선택</label>
                                </div>
                                <button className="select-del-btn">선택삭제</button>
                            </div>
                            {cartItem &&
                                cartItem.map((item, index) => (
                                    <CartItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        checkArr={checkArr}
                                        dispatch={dispatch}
                                        checkItem={handleCheckItem}
                                    />
                                ))}
                        </div>
                    ) : (
                        <ul>
                            <li className="cart-item-none">
                                <h2 className="font">앗!</h2>
                                <span className="text">장바구니가 텅~</span>
                            </li>
                        </ul>
                    )}
                </article>
                {/* 총 상품 금액 */}
                <Payment cartItem={cartItem} />
            </section>
        </Container>
    );
}

export default Cart;
