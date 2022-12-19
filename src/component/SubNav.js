import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { categories } from '../categories'
import { subChange } from '../store';

function SubNav() {
  const navigate = useNavigate();
  const subHidden = useSelector((state) => state.subHidden)
  const dispatch = useDispatch()
  
  return (
    <div className={subHidden}>
      <div className='nav-container'>
        <header>
          <h2>앗!</h2>
          <a>로그인이 필요해요</a>
        </header>
        <nav>
          <h2>테마</h2>
          <ul>
            <li onClick={() => dispatch(subChange()) }>
              <Link to='/goods/list/0'>전체보기</Link>
            </li>
            <li onClick={() => dispatch(subChange()) }>
              <Link to='/goods/detail/6'>목장갑은 뚝딱 만들어지지 않았다</Link>
            </li>
            <li onClick={() => dispatch(subChange()) }>
              <Link to='/goods/detail/12'>나의 첫 배민문방구</Link>
            </li>
            <li onClick={() => dispatch(subChange()) }>
              <Link to='/goods/detail/3'>[단독] 베스트셀러 출생의 비밀</Link>
            </li>
          </ul>
          <h2><span>카테고리</span></h2>
          <ul>
            { categories.map((data) => {
              let link = '/goods/list/' + data.id
              return (
                <li key={data.id} onClick={() => dispatch(subChange()) }>
                  <Link to={link}>{data.category}</Link>
                </li>
              )
            })}
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
      <div onClick={() => { dispatch(subChange()) }} className='close-btn'>닫기</div>
    </div>
  )
}

export default SubNav