import { useState } from 'react';
import styled from 'styled-components';

const ItemInfo = styled.div`
  color : ${props => props.color};
`
const BadgeState = styled.span`
  color : ${props => props.color};
`

function CardIndex(props){
  const discount = props.item.discount;
  const price = props.item.price;
  const sale = price * (100 - discount) * 0.01;
  let detail = '/goods/detail/' + props.item.id;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => { setIsHovering(true); }
  const handleMouseOut = () => { setIsHovering(false); }

  return (
    <div className='card-list-box' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <a href={detail}>
      <img src={isHovering ? props.item.thumbnail2 : props.item.thumbnail1} alt="" />
        <div className='badge'>
          <span className='discount'>
            { discount == null ? '' : discount + '% SALE' }
          </span>
          <BadgeState className='badge-name' color={props.item.state == 'NEW' ? '#2AC1BC' : '#6236FF'}>
            { props.item.state == '' ? '' : props.item.state }
          </BadgeState>
        </div>
        <ItemInfo className='info' color={isHovering ? '#2AC1BC' : 'black'}>
          <h4>{props.item.title}</h4>
          <div>
            <p>
              <strike className='sale-price'>{ discount == null ? '' : price + ' '}</strike>
              { discount == null ? price + '원' : sale + '원' }
            </p>
          </div>
        </ItemInfo>
      </a>
    </div>
  )
}

export default CardIndex;