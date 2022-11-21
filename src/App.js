import './default.css';
import './App.css';
import SubNav from './pages/SubNav';
import { useState } from 'react';
import Carousel from './pages/Carousel';
import { eventData, data, firstData } from './data.js';

function App() {
  const [hidden, setHidden] = useState('hidden');
  let [eventItem] = useState(eventData);
  let [item] = useState(data)

  return (
    <div className="App">
      <title>배민문방구</title>
      <div className='header-container bgOff'>
        <header className=''>
          <img src="../assets/logo.png" alt="로고" />
          <nav>
            <a href='#'>전체</a>
            <a href='#'>문구</a>
            <a href='#'>리빙</a>
            <a href='#'>책/메거진F</a>
            <a href='#'>배민그린</a>
            <a href='#'>배달이친구들</a>
            <a href='#'>콜라보레이션</a>
            <a href='#'>명예의 전당</a>
          </nav>
          <ul>
            <li><button className='icon search-btn'>검색</button></li>
            <li><button className='icon cart-btn'>장바구니</button></li>
            <li><button className='login-btn'>로그인</button></li>
            <li><button onClick={() => { setHidden('')}} className='icon menu-btn'>햄버거메뉴</button></li>
          </ul>
        </header>
      </div>
      <div className={hidden}>
        <SubNav />
        <div onClick={() => {setHidden('hidden')}} className='close-btn'>닫기</div>
      </div>
      <Carousel />
      <section className='main-container'>
        <article className='event-content'>
          <img src="./../assets/img/card-banner1.jpg" alt="" />
          {/* <button>〈</button> */}
          <div className='event-list'>
            {
              eventItem && eventItem.map((a, i) => {
                return (
                  <Card item={eventItem[i]} />
                )
              })
            }
          </div>
          {/* <button>〉</button> */}
        </article>
        <article className='main-content'>
          <h3 className='main-title'>요즘 잘 나가요</h3>
          <div className='card-list'>
            {
              item && item.map((a, i) => {
                return (
                  <CardIndex item={data[i]} />
                )
              })
            }
          </div>
        </article>
        {/* <article> 
          <h4>새로 나왔어요</h4>
          <div>카드 컴포넌트4*4</div>
          <hr></hr>
        </article>
        <article>
          <h4>지금은 할인중</h4>
          <div>카드 컴포넌트</div>
          <div>카드 컴포넌트</div>
          <div>카드 컴포넌트</div>
          <div>카드 컴포넌트</div>
        </article> */}
      </section>
      <footer>
        <img src="" alt="로고" />
        <a href='#'>About</a>
        <a href='#'>공지사항</a>
        <a href='#'>이용약관</a>
        <a href='#'><b>개인정보처리방침</b></a>
        <a href='#'>대량구매/제휴안내</a>
        <img src="" alt="" />
        <a href='#'>@baemin_store</a>
        <div>
          상호 : (주)우아한형제들 대표 : 김범준
          사업자등록번호 : 120-87-65763
          통신판매업신고번호 : 2021-서울송파-0515
          <a href='#'>사업자정보확인</a>
          대표번호 : 1670-9902
          이메일 : marketing_store@woowahan.com
          주소 : 서울특별시 송파구 위례성대로 2 장은빌딩
          호스팅제공 : (주)우아한형제들
          © Woowa Brothers Corp. All rights reserved
        </div>
      </footer>
    </div>
  );
}

function Card(props){
  
  return (
    <div className='event-card'>
      <img src={props.item.thumbnail1} alt="" />
      <span className='badge'>{props.item.state}</span>
      <div className='info'>
        <h4>{props.item.title}</h4>
        <p>{props.item.price}원</p>
      </div>
    </div>
  )
}

function CardIndex(props){
  
  return (
    // <div className='card-list'>
      <div className='card-list-box'>
        <div className='card-content'>
          <img src={props.item.thumbnail1} alt="" />
          <span className='badge'>{props.item.state}</span>
          <div className='info'>
            <h4>{props.item.title}</h4>
            <p>{props.item.price}원</p>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default App;
