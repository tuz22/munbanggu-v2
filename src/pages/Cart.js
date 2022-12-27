import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { decrease, increase, dropItem, checkItem, checkAllItem } from './../store/cartSlice';

const Container = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 80px 0px 200px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`
const CartBtn = styled.button`
  color : ${props => props.color};
  background : ${props => props.color === '#CCC' ? '#EEE' : '#2AC1BC'};
  border-color : ${props => props.color === '#CCC' ? '#EEE' : '#2AC1BC'};
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let checkArr = [];
  const [checkAll, setCheckAll] = useState('')

  useEffect(() => {
    let checkTimer = setTimeout(() => { 
    let checkLength = checkArr.length;
    let cartLength = state.length;

      { checkLength === cartLength 
        ? setCheckAll('checked') 
        : setCheckAll('')
      } 

    }, 100);
    
    return () => {
      clearTimeout(checkTimer)
    }
  })
  return (
    <>
      {state.length > 0 
      ? <div>
          <div className='cart-header'>
            <div className='check-box'>
              <input type='checkbox' id='@checkAll' onClick={() => {dispatch(checkAllItem(checkArr.length))}} checked={checkAll}/>
              <label htmlFor='@checkAll'>전체선택</label>
            </div>
            <button className='select-del-btn'>선택삭제</button>
          </div>
          { state && state.map((a, i) => {
              const cartItemId = state[i].id
              const checkId = '@check' + i
              return (
                <div>
                  <ul className='cart-list' key={i}>
                    <li>
                      <div className='check-box'>
                        <input type='checkbox' id={checkId} onClick={() => {dispatch(checkItem(cartItemId))}} 
                          checked={state[i].checked ? true && checkArr.push(cartItemId) : false && checkArr.drop(cartItemId)}
                        />
                        <label htmlFor={checkId} />
                      </div>
                      <div className="list-box">
                        <div className="thumbnail">
                          <button onClick={() => {navigate('/goods/detail/' + state[i].id)}} >
                            <img src={state[i].thumbnail1} alt="" />
                          </button>
                        </div>
                        <div className='list-info'>
                          <p className="list-name">
                          <button onClick={() => {navigate('/goods/detail/' + state[i].id)}} >
                            {state[i].title}
                          </button>
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
                            <span>{(state[i].price * state[i].count).toLocaleString()}원</span>
                          </div>
                          <button className='cart-del-btn' onClick={() => dispatch(dropItem())}>삭제</button>
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
  const state = useSelector((state) => state.cartItem)
  const shipping = 3000;
  const SHIPPING = shipping.toLocaleString()
  let [sumPrice, setSumPrice] = useState(0);
  let priceArr = [];

  if (state.length > 0) {
    state && state.map((a, i) => {
      let amountPrice;
      if (state[i].checked) {
        amountPrice = (state[i].price * state[i].count)
      } else {
        amountPrice = 0
      }
      return priceArr.push(amountPrice)
    })
  } else {
    sumPrice = 0
  }

  useEffect(() => {
    setTimeout(() => {

      if (priceArr.length > 0 ){
        let a = priceArr.reduce((sum, itemPrice) => sum + itemPrice)
        setSumPrice(a)
      }
    }, 100);
  })
  
  return (
    <article className='payment-box'>
      <div className='box-sticky'>
        <div className="payment-result">
          <dl className='amount'>
            <dt className='amount-item'>총 상품금액</dt>
            <dd className='amount-price'>{sumPrice.toLocaleString()}원</dd>
            <dt>배송비</dt>
            <dd>+{sumPrice === 0 ? 0 : sumPrice >= 30000 ? 0 : SHIPPING}원</dd>
          </dl>
          <dl className='total'>
            <dt>결제예상금액</dt>
            <dd>{sumPrice === 0 ? 0 : sumPrice >= 30000 ? sumPrice.toLocaleString() : (sumPrice+shipping).toLocaleString()}원</dd>
          </dl>
        </div>
        <div className="order-box">
          <CartBtn className='order-btn' color={sumPrice !== 0 ? 'white' : '#CCC'}>
            <strong></strong>
            주문하기
          </CartBtn>
        </div>
      </div>
    </article>
  )
}
export default Cart