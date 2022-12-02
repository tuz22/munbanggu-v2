import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from './../App.js';

let Container = styled.div`
  width : 1200px;
  height : 100%;
  background : none;
  margin : 0 auto;
  padding : 80px 0 200px 0;
  flex-diraction : column;
`
let ViewBox = styled.div`
  padding : 80px 0 0 0;
`
let ItemInfo = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
`

function Detail(props) {
  const {id} = useParams()
  const itemId = props.item.find((a) => a.id == id)
  const [tab, setTab] = useState(0)
  const tabData = ['상품정보', '기본정보', '상품후기'];
  const [active, setActive] = useState('')

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

  return (
    <div className='detail-container'>
      <Container>
        {/* <h4>detail 페이지</h4> */}
        {/* <h4>{itemId.title}</h4> */}
        <header className='detail-header'>
          <div className='item-info'>
            <span className='badge'>{itemId.state}</span>
            <h3 className='name'>{itemId.title}</h3>
            <p className='price'>{itemId.price}원</p>
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
                    <input type="text" value="1"/>
                    <button className='btn-minus'>-</button>
                    <button className='btn-plus'>+</button>
                  </div>
                  <div className="price">
                    <span>{itemId.price}원</span>
                  </div>
                </div>
              </div>
              <dl className="total-price">
                <dt>총 금액</dt>
                <dd>
                  <span>{itemId.price}원</span>
                </dd>
              </dl>
              <footer className='buy-btn-box'>
                <button className='detail-cart-btn'>장바구니</button>
                <button className='detail-buy-btn'>바로 구매하기</button>
              </footer>
            </section>
          </div>
        </header>
        <section className='view-content'>
          <div className='view-tab'>
            <ul>
              {
                tabData && tabData.map((a, i) => {
                  return (
                    <li>
                      <a className={i == active ? 'active' : ''} value={i} Link onClick={(e) => { setTab(i); setActive(e.target.getAttribute('value')) }}>{a}</a>
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
  const {eventItem} = useContext(Context);
  const itemInfo = eventItem[id];
  console.log('id'+id)
  console.log(eventItem[id]);
  
  return (
    <ViewBox>
      { [ 
          <ItemInfo>
            <img src={itemInfo.content1} alt="" />
            <img src={itemInfo.content2} alt="" />
            <img src={itemInfo.content3} alt="" />
          </ItemInfo>,
          <div>내용1</div>, 
          <div>내용2</div> ][tab] }
    </ViewBox>
  )
}
export default Detail;