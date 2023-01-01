import './default.css';
import './App.css';
import { createContext, useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subChange } from './store/subSlice';
import SubNav from './component/SubNav.js';
import Carousel from './component/Carousel.js';
import data from './data/data.js';
import categories from './data/categories.js';
import Main from './pages/Main.js';

const Detail = lazy(() => import('./pages/Detail.js'));
const List = lazy(() => import('./pages/List.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

export const Context = createContext();
export const Context2 = createContext();

function App() {
  const [item] = useState(data);
  const [category] = useState(categories);
  const dispatch = useDispatch()

  const scrollRef = useRef(null);
  const [bg, setBg] = useState('bgOff')
  const handleScroll = () => { window.scrollY === 0 ? setBg('bgOff') : setBg('bgOn') };

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
    <Suspense fallback={<div className='loading'>⟳</div>}>
    <div className="App" ref={scrollRef}>
      <title>배민문방구</title>
      <div className= {`${bg} header-container` }>
        <header>
          <Link to='/'>
            <button className='logo logo-btn'>로고</button>
          </Link>
          <nav>
            <ul>
              {
                categories.map((data) => {
                  let link = '/goods/list/' + data.id
                  return (
                    <Link to={link} key={data.id}>
                      <li>{data.category}</li>
                    </Link>
                  )
                })
              }
            </ul>
          </nav>
          <ul>
            <li><button className='icon search-btn'>검색</button></li>
            <li>
              <Link to='/cart' className='icon cart-btn'>장바구니</Link>
            </li>
            <li className='login-btn'>로그인</li>
            <li><button onClick={() => { dispatch(subChange());}} className='icon menu-btn'>햄버거메뉴</button></li>
          </ul>
        </header>
      </div>
      <SubNav />
      <Routes>
        <Route exact path="/" element= {
          <>
            <Carousel />
            <Main />
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
            return ( <Route path={listUrl} key={i} element={
              <Context2.Provider value={ {item} }>
                <List category={category[i]}/>
              </Context2.Provider>
            } />)
          })
        }
        <Route path="/cart" component={Cart} element={<Cart />}></Route>
      </Routes>
      <footer className='footer'>
        <div className='footer-container'>
          <h2 className='footer-logo'>
            <span>배민문방구</span>
          </h2>
          <div>
            <nav className='footer-nav'>
              <ul>
                <li>About</li>
                <li>공지사항</li>
                <li>이용약관</li>
                <li><b>개인정보처리방침</b></li>
                <li>대량구매/제휴안내</li>
              </ul>
              <p className='link-sns'>
                <a href='https://www.instagram.com/baemin_store/?hl=ko' target='_blank' rel='noopener noreferrer'>@baemin_store</a>
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
    </Suspense>
  );
}

export default App;