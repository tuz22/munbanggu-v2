import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SHIPPING_COST = 3000;

const CartBtn = styled.button`
    color: ${(props) => props.color};
    background: ${(props) => (props.color === '#CCC' ? '#EEE' : '#2AC1BC')};
    border-color: ${(props) => (props.color === '#CCC' ? '#EEE' : '#2AC1BC')};
`;

function Payment({ cartItem }) {
    const [sumPrice, setSumPrice] = useState(0);

    const calculateSumPrice = () => {
        if (!cartItem) return;

        const totalAmount = cartItem.reduce((sum, item) => {
            if (item.checked) {
                return sum + item.price * item.count;
            }
            return sum;
        }, 0);
        setSumPrice(totalAmount);
    };

    const renderShippingCost = () => {
        if (sumPrice >= 30000) {
            return 0;
        }
        return SHIPPING_COST;
    };

    const estimatedPayment = () => {
        if (sumPrice === 0) {
            return 0;
        }
        const totalPrice = sumPrice + (sumPrice >= 30000 ? 0 : SHIPPING_COST);
        return totalPrice.toLocaleString();
    };

    useEffect(() => {
        calculateSumPrice();
    });

    return (
        <article className="payment-box">
            <div className="box-sticky">
                <div className="payment-result">
                    <dl className="amount">
                        <dt className="amount-item">총 상품금액</dt>
                        <dd className="amount-price">{sumPrice.toLocaleString()}원</dd>
                        <dt>배송비</dt>
                        <dd>+{renderShippingCost()}원</dd>
                    </dl>
                    <dl className="total">
                        <dt>결제예상금액</dt>
                        <dd>{estimatedPayment()}원</dd>
                    </dl>
                </div>
                <div className="order-box">
                    <CartBtn className="order-btn" color={sumPrice !== 0 ? 'white' : '#CCC'}>
                        주문하기
                    </CartBtn>
                </div>
            </div>
        </article>
    );
}

export default Payment;
