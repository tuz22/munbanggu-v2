import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemInfo = styled.div`
  font-family : minsansVF;
  font-weight : 400;
  font-size : 16px;
  color : ${props => props.color};
`
const BadgeState = styled.span`
  color : ${props => props.color};
`

function CardIndex(props){
  const navigate = useNavigate();
  const discount = props.item.discount;
  const price = props.item.price;
  const PRICE = price.toLocaleString();
  const sale = price * (100 - discount) * 0.01;
  const SALE = sale.toLocaleString();
  const state = props.item.state;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => { setIsHovering(true); }
  const handleMouseOut = () => { setIsHovering(false); }
  
  return (
    <div className='card-list-box' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <button onClick={() => {navigate('/goods/detail/' + props.item.id)}} >
      <img src={isHovering ? props.item.thumbnail2 : props.item.thumbnail1} alt="" />
        <div className='badge'>
          <span className='discount'>
            { discount === null ? '' : discount + '% SALE' }
          </span>
          <BadgeState className='badge-name' color={state === 'NEW' ? '#2AC1BC' : state === 'GREEN' ? '#0c952a' : '#6236FF'}>
            { state === '' ? '' : state }
          </BadgeState>
        </div>
        <ItemInfo className='info' color={isHovering ? '#2AC1BC' : 'black'}>
          <h4>{props.item.title}</h4>
          <div>
            <p>
              <strike className='sale-price'>{ discount === null ? '' : PRICE + ' '}</strike>
              { (price === 'SOLD OUT') ? price : (discount === null) ? PRICE + '원' : SALE + '원' }
            </p>
          </div>
        </ItemInfo>
        </button>
    </div>
  )
}

export default CardIndex;