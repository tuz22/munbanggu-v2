import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { categories } from '../categories'
import { subChange } from '../store';

function SubNav() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState('');
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
            <li Link onClick={() => { navigate('/goods/list/0'); dispatch(subChange()) }}>전체보기</li>
            <li Link onClick={() => { navigate('/goods/list/0'); dispatch(subChange()) }}>목장갑은 뚝딱 만들어지지 않았다</li>
            <li Link onClick={() => { navigate('/goods/list/0'); dispatch(subChange()) }}>나의 첫 배민문방구</li>
            <li Link onClick={() => { navigate('/goods/list/0'); dispatch(subChange()) }}>[단독] 베스트셀러 출생의 비밀</li>
          </ul>
          <h2><span>카테고리</span></h2>
          <ul>
            { categories.map((a, i) => {
              return (
                <li Link onClick={() => { navigate('/goods/list/' + i); dispatch(subChange()) }}>
                  {categories[i].category}
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