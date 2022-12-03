import { useState } from 'react'

function SubNav() {
  return (
    <>
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
          </div>
        </footer>
      </div>
      <div className='nav-bg'/>
    </>
  )
}

export default SubNav