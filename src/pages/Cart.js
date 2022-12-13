import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import data from '../data';
import { decrease, increase } from '../store';

let Container = styled.div`
width: 1200px;
height: 100%;
margin: 0px auto;
padding: 80px 0px 200px;
font-family: sans-serif;
display: flex;
flex-direction: column;
`

function Cart(){
  
  return (
    <Container className='cart-container'>
      <header>
        <div className='cart-title'>
          <h4 className='active'>장바구니</h4>
        </div>
      </header>
        <section className='cart-box'>
        {/* 선택한 상품 */}
          <article className="cart-content">
            <CartItem />
          </article>
          {/* 총 상품 금액 */}
          <Payment />
        </section>
    </Container>
  )
}

function CartItem(){
  let state = useSelector((state) => state.cartItem);
  let dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const checkItem = [];
  const [checkCount, setCheckCount] = useState(0);
  return (
    <>
      {state.length > 0 
      ? <div>
          <div className='cart-header'>
            <div className='check-box'>
              {/* <input type='checkbox' id='@checkAll' /> */}
              <input type='checkbox' id='@checkAll' onClick={() => {checkCount == 0 ? setCheckCount(-1) : setCheckCount(0) }} checked={checkCount == 0 ? true : false}/>
              <label htmlFor='@checkAll'>전체선택</label>
            </div>
            <button className='select-del-btn'>선택삭제</button>
          </div>
          { state && state.map((a, i) => {
              const cartItemId = state[i].id
              const checkId = '@check' + i
              checkItem.push(i)
              console.log(checkItem)
              console.log(checkCount)
              return (
                <div>
                  <ul className='cart-list' key={i}>
                    <li>
                      <div className='check-box'>
                        <input type='checkbox' id={checkId} onClick={() => {checkCount == 0 ? setCheckCount(-1) : setCheckCount(0)}} checked={checkCount == 0 ? true : false}/>
                        <label htmlFor={checkId} />
                      </div>
                      <div className="list-box">
                        <div className="thumbnail">
                          <a onClick={() => {navigate('/goods/detail/' + state[i].id)}} >
                            <img src={state[i].thumbnail1} alt="" />
                          </a>
                        </div>
                        <div className='list-info'>
                          <p className="list-name">
                          <a onClick={() => {navigate('/goods/detail/' + state[i].id)}} >
                            {state[i].title}
                          </a>
                          </p>
                        </div>
                      </div>
                      <div className="cart-info">
                        <div className="quantity">
                          <input type="text" value={state[i].count}/>
                          <button className='btn-minus' onClick={() => {dispatch(decrease(cartItemId))}}>-</button>
                          <button className='btn-plus' onClick={() => {dispatch(increase(cartItemId))}}>+</button>
                        </div>
                        <div className='price-info'>
                          <div className="price">
                            <span>{state[i].price * state[i].count}원</span>
                          </div>
                          <button className='cart-del-btn'>삭제</button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )
            })
          }
        </div>
      : <>
          <ul>
            <li className='cart-item-none'>
              <h2 className='font'>앗!</h2>
              <span className='text'>장바구니가 텅~</span>
            </li>
          </ul>
        </>
      }
    </>
  )
}

function Payment(){
  let state = useSelector((state) => state.cartItem)

  return (
    <>
      {state.length > 0 
      ? state && state.map((a, i) => {
        const amountPrice = state[i].price * state[i].count;
        const shipping = 3000;
        const tatoalPrice = amountPrice + shipping;
        return (
          <article className='payment-box'>
            <div className='box-sticky'>
              <div className="payment-result">
                <dl className='amount'>
                  <dt className='amount-item'>총 상품금액</dt>
                  <dd className='amount-price'>{amountPrice}원</dd>
                  <dt>배송비</dt>
                  <dd>+{amountPrice == 0 ? 0 : amountPrice >= 30000 ? 0 : shipping}원</dd>
                </dl>
                <dl className='total'>
                  <dt>결제예상금액</dt>
                  <dd>{amountPrice == 0 ? 0 : amountPrice < 30000 ? tatoalPrice : tatoalPrice - shipping}원</dd>
                </dl>
              </div>
              <div className="order-box">
                <button className='order-btn'>
                  <strong></strong>
                  주문하기
                </button>
              </div>
            </div>
          </article>
        )
      }) 
      : <article className='payment-box'>
          <div className='box-sticky'>
            <div className="payment-result">
              <dl className='amount'>
                <dt className='amount-item'>총 상품금액</dt>
                <dd className='amount-price'>0원</dd>
                <dt>배송비</dt>
                <dd>+0원</dd>
              </dl>
              <dl className='total'>
                <dt>결제예상금액</dt>
                <dd>0원</dd>
              </dl>
            </div>
            <div className="order-box">
              <button className='order-btn'>
                <strong></strong>
                주문하기
              </button>
            </div>
          </div>
        </article>
      }
    </>
  )
}
export default Cart