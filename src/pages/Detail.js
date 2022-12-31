import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, increase } from './../store/cartSlice';
import { Context } from './../App.js';

const Container = styled.div`
  width : 1200px;
  height : 100%;
  background : none;
  font-family: minsansVF;
  margin : 0 auto;
  padding : 80px 0 200px 0;
  flex-diraction : column;
`
const ViewBox = styled.div`
  padding : 80px 0 0 0;
`
const ItemInfo = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
`
const BasicGuid = styled.div`
  font-size : 14px;
  font-family: minsansVF;
`
const BadgeState = styled.span`
  color : ${props => props.color};
`

function Detail(props) {
  const {id} = useParams()
  const itemId = props.item.find((a) => a.id == id)
  const discount = itemId.discount;
  const price = itemId.price;
  const PRICE = price.toLocaleString();
  const sale = itemId.price * (100 - discount) * 0.01;
  const SALE = sale.toLocaleString();
  const [tab, setTab] = useState(0)
  const tabData = ['상품정보', '기본정보', '상품후기'];
  const [active, setActive] = useState('')
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [alertCart, setAlertCart] = useState(false);

  const cartItem = useSelector((state) => state.cartItem);
  const dupVal = cartItem.findIndex((data) => data.id == itemId.id);

  const TOTAL_SLIDES = 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  
  const slideBtn = ((e) => {
    setCurrentSlide((e.target.innerHTML)-1);
  })
  
  const prevBtn = (() => {
    if ( currentSlide <= 0) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  })
  const nextBtn = (() => {
    if ( currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  })

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${currentSlide*5}00px)`;
    slideRef.current.style.transition = "all 1s ease";
  }, [currentSlide]);

  useEffect(() => {
    const timer = (alertCart === true)
    ? setTimeout(() => { setAlertCart(false) }, 2000)
    : null
    return () => {
      clearTimeout(timer)
    }
  })
  return (
    <div className='detail-container'>
      <Container>
        <header className='detail-header'>
          <div className='item-info'>
            <div className='badge'>
              <span className='discount'>
                { discount === null ? '' : discount + '% SALE' }
              </span>
              <BadgeState className='badge-name' color={itemId.state === 'NEW' ? '#2AC1BC' : itemId.state === 'GREEN' ? '#0c952a' : '#6236FF'}>
                { itemId.state === '' ? '' : itemId.state }
              </BadgeState>
            </div>
            <h3 className='name'>{itemId.title}</h3>
            <p>
              <strike className='sale-price'>{ discount === null ? '' : PRICE + ' '}</strike>
              { (price === 'SOLD OUT') ? price : (discount === null) ? PRICE + '원' : SALE + '원' }
            </p>
          </div>
          <div className='item-preview'>
            <div className='carousel'>
              <div className='carousel-container' ref={slideRef}>
                <div className='carousel-box'>
                    <img src={itemId.thumbnail1} draggable="false" alt="아이템1" />
                </div>
                <div className='carousel-box'>
                  <img src={itemId.thumbnail2} draggable="false" alt="아이템2" />
                </div>
              </div>
              <div className='btn-box'>
                <button onClick={prevBtn} className='item-btn item-prev-btn'>prev</button>
                <button onClick={nextBtn} className='item-btn item-next-btn'>next</button>
              </div>
              <div className='carousel-btn'>
                <div className='slide-btn'>
                  <button onClick={slideBtn}>1</button>
                  <button onClick={slideBtn}>2</button>
                </div>
              </div>
            </div>
          </div>
          <div className='item-order'>
            <dl className='shipping'>
              <dt>배송정보</dt>
              <dd>3,000원 (30,000원 이상 구매 시 무료) <br /> 오후 1시 당일배송마감</dd>
            </dl>
            <section className="item-buy">
              <div className='buy-list'>
                <h4>{itemId.title}</h4>
                <div className="buy-options">
                  <div className="quantity">
                    <input type="text" value={count} readOnly />
                    <button className='btn-minus' onClick={() => { count > 1 && setCount(count-1)}}>-</button>
                    <button className='btn-plus' onClick={() => {setCount(count+1)}}>+</button>
                  </div>
                  <div className="price">
                    <span>
                      { (price === 'SOLD OUT') ? price : (discount === null) ? PRICE + '원' : SALE + '원' }
                    </span>
                  </div>
                </div>
              </div>
              <dl className="total-price">
                <dt>총 금액</dt>
                <dd>
                  <span>{ (price === 'SOLD OUT') ? price : discount === null ? (price * count).toLocaleString()+'원' : (sale * count).toLocaleString() +'원'}</span>
                </dd>
              </dl>
              <footer className={price === 'SOLD OUT' ? 'hidden' : 'buy-btn-box'}>
                <button className='detail-cart-btn' onClick={ () => {
                  setAlertCart(true);console.log(sale)
                  dupVal !== -1
                  ? dispatch(increase(itemId.id))
                  : discount === null
                    ? dispatch(addItem({ id : itemId.id, thumbnail1 : itemId.thumbnail1, title : itemId.title, price : itemId.price, count : count, checked : true }))
                    : dispatch(addItem({ id : itemId.id, thumbnail1 : itemId.thumbnail1, title : itemId.title, price : sale, count : count, checked : true }))
                }}>장바구니</button>
                <button className='detail-buy-btn'>바로 구매하기</button>
              </footer>
            </section>
          </div>
        </header>
        <div className={alertCart === true ? 'cartBtn-on' : 'cartBtn-off'}>
          <div className='cartBtn-click'>
            장바구니에 상품을 담았습니다.
            <Link to='/cart' className='cart-link'>장바구니로 이동</Link>
          </div>
        </div>
        <section className='view-content'>
          <div className='view-tab'>
            <ul>
              {
                tabData && tabData.map((a, i) => {
                  return (
                    <li key={i}>
                      <a className={i == active ? 'active' : ''} value={i} onClick={(e) => { setTab(i); setActive(e.target.getAttribute('value')) }} >{a}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <TabContent tab={tab} id={id}/>
        </section>
      </Container>
    </div>
  )
}

function TabContent({tab, id}){
  const {item} = useContext(Context);
  const itemInfo = item[id];
  // console.log('id'+id)

  return (
    <ViewBox>
      { [ 
          <ItemInfo>
            <img src={itemInfo.content1} alt="상품상세이미지1" />
            <img src={itemInfo.content2} alt="상품상세이미지2" />
            <img src={itemInfo.content3} alt="상품상세이미지3" />
          </ItemInfo>,
          <BasicGuid>
            <h4 className='guide-title'>배송안내</h4>
            <dl className='guide-cautions'>
              <dt>배송사</dt>
              <dd>CJ대한통운</dd>
            </dl>
            <dl className='guide-cautions'>
              <dt>배송비</dt>
              <dd>
                3,000원 (30,000원 이상 구매 시 무료배송)<br />
                도서, 산간 일부지역은 배송비가 추가될 수 있습니다.
              </dd>
            </dl>
            <dl className='guide-cautions'>
              <dt>배송기간</dt>
              <dd>
                오후 1시 이전 결제완료시 당일 출고 (영업일 기준)<br />
                단, 상품의 재고 상황, 배송량, 배송 지역에 따라 배송일이 추가로 소요될 수 있는 점 양해 부탁드립니다.
              </dd>
            </dl>
            <h4 className='guide-title'>교환안내</h4>
            <ul className='guide-cautions'>
              <li>
                주문 취소 및 배송지 변경은 “결제완료” 단계에서만 가능합니다.<br />
                (마이페이지에서 취소 또는 변경하실 수 있습니다.)
              </li>
              <li>
                "상품준비중" 단계에서는 주문 취소 및 배송지 변경이 불가합니다.
              </li>
              <li>
                교환 및 반품은 배송완료 후 7일 이내에 가능합니다.<br />
                단, 재화 등의 내용이 표시, 광고 내용과 다르거나 계약내용을 다르게 이행한 경우에는 재화 등을 공급받은 날로부터 3개월 이내,<br />
                그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 교환 및 반품이 가능합니다.
              </li>
              <li>
                다음의 경우 교환 및 반품이 불가합니다.
                <ul className='guide-cautions dash'>
                  <li>구매자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우</li>
                  <li>구매자의 사용 또는 일부 소비에 의해 재화 등의 가치가 현저히 감소한 경우</li>
                  <li>복제가 가능한 재화 등의 포장을 훼손한 경우(CD/DVD/GAME/도서의 경우 포장 개봉 시)</li>
                  <li>시간 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가 현저히 감소한 경우</li>
                  <li>고객의 주문에 따라 개별 생산되는 상품의 경우</li>
                </ul>
              </li>
              <li>
                상품의 불량/하자 및 표시광고 및 계약 내용이 다른 경우 해당 상품의 회수 비용은 무료입니다.
              </li>
              <li>
                고객님의 단순변심에 의한 교환/반품일 경우에는 교환/반품 배송비(왕복 배송비) 6,000원을 고객님께서 부담하셔야 합니다.
              </li>
              <li>
                반송지 : 경기도 파주시 문산읍 돈유2로 105(선유리 1375-5) 배민문방구 물류센터
              </li>
            </ul>
            <h4 className='guide-title'>환불안내</h4>
            <p className='guide-cautions'>주문취소 및 반품 시 환불은 주문 시 이용하신 결제수단으로 2~7 영업일 이내 환불됩니다.</p>
            <h4 className='guide-title'>AS안내</h4>
            <ul className='guide-cautions'>
              <li>제품에 문제가 있으신 경우, 배민문방구 고객센터로 접수해주시면 안내 도와드리겠습니다.</li>
              <li>배민문방구에서 발생한 문제는 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.</li>
            </ul>
          </BasicGuid>, 
          <article>
            <h3>상품후기(0)</h3>
            <div className='review-box'>
              <div className='review-content'>
                <h3>앗!</h3>
                <p className='ment'>첫 번째 후기를 남겨주세요.</p>
              </div>
            </div>
          </article>
        ][tab] }
    </ViewBox>
  )
}
export default Detail;