import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAllItem } from './../store/cartSlice';
import CartItem from '../components/CartItem';
import Payment from '../components/Payment';

const Container = styled.div`
    width: 1200px;
    height: 100%;
    margin: 0px auto;
    padding: 80px 0px 200px;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
`;

function Cart() {
    const state = useSelector((state) => state.cartItem);
    const dispatch = useDispatch();
    const [checkAll, setCheckAll] = useState('');
    const checkArr = [];

    useEffect(() => {
        const checkTimer = setTimeout(() => {
            const checkLength = checkArr.length;
            const cartLength = state.length;
            setCheckAll(checkLength === cartLength ? 'checked' : '');
        }, 100);

        return () => {
            clearTimeout(checkTimer);
        };
    });

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
                    {state.length > 0 ? (
                        <div>
                            <div className="cart-header">
                                <div className="check-box">
                                    <input
                                        type="checkbox"
                                        id="@checkAll"
                                        onClick={() => {
                                            dispatch(checkAllItem(checkArr.length));
                                        }}
                                        checked={checkAll}
                                        readOnly
                                    />
                                    <label htmlFor="@checkAll">전체선택</label>
                                </div>
                                <button className="select-del-btn">선택삭제</button>
                            </div>
                            {state.map((item, index) => (
                                <CartItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    checkArr={checkArr}
                                    dispatch={dispatch}
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
                <Payment />
            </section>
        </Container>
    );
}

export default Cart;
