import './default.css';
import './App.css';
import SubNav from './component/SubNav.js';
import { createContext, useState } from 'react';
import Carousel from './component/Carousel.js';
import data from './data.js';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail.js';
import { categories } from './categories.js';
import List from './pages/List.js';
import Card from './component/Card.js'
import CardIndex from './component/CardIndex.js'
import Cart from './pages/Cart.js'
export const Context = createContext();
export const Context2 = createContext();

function App() {
  const [hidden, setHidden] = useState('hidden');
  const [item] = useState(data);
  const [category] = useState(categories);
  const navigate = useNavigate();

  const newItem = item.filter(e => e.date > 221200)
  const bestItem = item.filter(e => e.stock < 100)
  const firstItem = item.filter(e => e.date < 220600)
  const saleItem = item.filter(e => e.discount !== null)

  return (
    <div className="App">
      <title>배민문방구</title>
      <div className='header-container bgOff'>
        <header className=''>
            <button className='logo logo-btn' Link onClick={() => { navigate('/') }}>로고</button>
          <nav>
            <ul>
              <li Link onClick={() => { navigate('/goods/list/0') }}>전체</li>
              <li Link onClick={() => { navigate('/goods/list/1') }}>문구</li>
              <li Link onClick={() => { navigate('/goods/list/2') }}>리빙</li>
              <li Link onClick={() => { navigate('/goods/list/3') }}>책/메거진F</li>
              <li Link onClick={() => { navigate('/goods/list/4') }}>배민그린</li>
              <li Link onClick={() => { navigate('/goods/list/5') }}>배달이친구들</li>
              <li Link onClick={() => { navigate('/goods/list/6') }}>콜라보레이션</li>
              <li Link onClick={() => { navigate('/goods/list/7') }}>명예의 전당</li>
            </ul>
          </nav>
          <ul>
            <li><button className='icon search-btn'>검색</button></li>
            <li className='icon cart-btn' Link onClick={() => { navigate('/cart') }}>장바구니</li>
            <li className='login-btn' Link onClick={() => { navigate('/login') }}>로그인</li>
            <li><button onClick={() => { setHidden(''); bodyHold(1)}} className='icon menu-btn'>햄버거메뉴</button></li>
          </ul>
        </header>
      </div>
      <div className={hidden}>
        <SubNav />
        <div onClick={() => {setHidden('hidden'); bodyHold(0)}} className='close-btn'>닫기</div>
      </div>
      {/* 메인 페이지 */}
      <Routes>
        <Route path="/" element= {
          <>
            <Carousel />
            <section className='main-container'>
              <article className='event-content'>
                <img src="./../assets/img/card-banner1.jpg" alt="" />
                <div className='event-list'>
                  <div className='card-box'>
                    {
                      newItem && newItem.map((a, i) => {
                        return (
                          <Card item={newItem[i]} />
                        )
                      })
                    }
                  </div>
                </div>
                <div className='btn-box'>
                  <button className='item-btn item-prev-btn'>prev</button>
                  <button className='item-btn item-next-btn'>next</button>
                </div>
              </article>
              <article className='main-content'>
                <h3 className='main-title'>요즘 잘 나가요</h3>
                <div className='card-list'>
                  {
                      bestItem.map((a, i) => {
                      return (
                        <CardIndex item={bestItem[i]} />
                      )
                    })
                  }
                </div>
              </article>
              <article className='event-content'>
                <img src="./../assets/img/card-banner2.png" alt="" />
                <div className='event-list'>
                  <div className='card-box'>
                    {
                      firstItem && firstItem.map((a, i) => {
                        return (
                          <Card item={firstItem[i]} />
                        )
                      })
                    }
                  </div>
                </div>
                <div className='btn-box'>
                  <button className='item-btn item-prev-btn'>prev</button>
                  <button className='item-btn item-next-btn'>next</button>
                </div>
              </article>
              <article className='main-content'>
                <h3 className='main-title'>지금은 할인중</h3>
                <div className='card-list'>
                  {
                    saleItem && saleItem.map((a, i) => {
                      return (
                          <CardIndex item={saleItem[i]} />
                      )
                    })
                  }
                </div>
              </article>
            </section>
          </>
        } />
        <Route path="/goods/detail/:id" element={
          <Context.Provider value={ {item} }>
            <Detail item={item}/>
          </Context.Provider>
        }></Route>
        {
          categories.map((a, i) => {
            const listUrl = "goods/list/"+ i
            return ( <Route path={listUrl} element={
              <Context2.Provider value={ {item} }>
                <List category={category[i]}/>
              </Context2.Provider>
            } />)
          })
        }
        <Route path="/cart" element={<><Cart /></>}></Route>
      </Routes>
      <footer className='footer'>
        <div className='footer-container'>
          <h2 className='footer-logo'>
            <span>배민문방구</span>
          </h2>
          <div>
            <nav className='footer-nav'>
              <ul>
                <li><a href='#'>About</a></li>
                <li><a href='#'>공지사항</a></li>
                <li><a href='#'>이용약관</a></li>
                <li><a href='#'><b>개인정보처리방침</b></a></li>
                <li><a href='#'>대량구매/제휴안내</a></li>
              </ul>
              <p className='link-sns'>
                <a href='https://www.instagram.com/baemin_store/?hl=ko' target='_blank'>@baemin_store</a>
              </p>
            </nav>
            <div className='footer-content'>
              <p>상호 : (주)우아한형제들</p>
              <p>대표 : 김범준</p>
              <p>사업자등록번호 : 120-87-65763</p>
              <p>통신판매업신고번호 : 2021-서울송파-0515</p>
              <p>사업자정보확인</p>
              <p>대표번호 : 1670-9902</p>
              <p>이메일 : marketing_store@woowahan.com</p>
              <p>주소 : 서울특별시 송파구 위례성대로 2 장은빌딩</p>
              <p>호스팅제공 : (주)우아한형제들</p>
              <p>© Woowa Brothers Corp. All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function bodyHold(state){
  const body = document.querySelector('body').style;
  if (state == 1) {
    body.overflow = 'hidden';
    body.height = '100%';
  } else {
    body.overflow = '';
    body.height = '';
  }
}

export default App;