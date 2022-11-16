import './default.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <title>배민문방구</title>
      <div className='header-container bgOff'>
        <header className="">
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
            <li><button className='icon menu-btn'>햄버거메뉴</button></li>
          </ul>
        </header>
      </div>
      <SubNav />
      <section>
        <div>메인베너</div>
        <article>
          <div>우리 같이 놀아요! 베너</div>
          <button>〈</button>
            <div>카드 컴포넌트</div>
            <div>카드 컴포넌트</div>
            <div>카드 컴포넌트</div>
          <button>〉</button>
          <hr></hr>
        </article>
        <article>
          <h4>요즘 잘 나가요</h4>
          <div>카드 컴포넌트4*2</div>
          <div>나의 첫 배민문방구 베너</div>
          <button>〈</button>
            <div>카드 컴포넌트</div>
            <div>카드 컴포넌트</div>
            <div>카드 컴포넌트</div>
          <button>〉</button>
          <hr></hr>
        </article>
        <article>
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
        </article>
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

/* subNav */
function SubNav() {
  return (
    <div>
      <div className='nav-container'>
        <header>
          <h2>앗!</h2>
          <a>로그인이 필요해요</a>
        </header>
        <nav>
          <h2>테마</h2>
          <ul>
            <li>전체보기</li>
            <li>목장갑은 뚝딱 만들어지지 않았다</li>
            <li>나의 첫 배민문방구</li>
            <li>[단독] 베스트셀러 출생의 비밀</li>
          </ul>
          <h2><span>카테고리</span></h2>
          <ul>
            <li>전체보기</li>
            <li>~</li>
            <li>명예의 전당</li>
          </ul>
        </nav>
        <footer>
          <div>
            <h2>고객센터</h2>
            <div>1:1 문의</div>
            <div>|</div>
            <div>이메일 문의</div>

            {/* <ul>
              <li>1:1 문의</li>
              <li>이메일 문의</li>
            </ul> */}
          </div>
        </footer>
        <div className='close-btn'>닫기</div>
      </div>
      <div className='nav-bg'/>
    </div>
  )
}
export default App;
