import { useState } from 'react';
import styled from 'styled-components';

const ItemInfo = styled.div`
  color : ${props => props.color};
`

function Card(props){
  let detail = '/goods/detail/' + props.item.id;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => { setIsHovering(true); }
  const handleMouseOut = () => { setIsHovering(false); }
  return (
    <div className='event-card' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <a href={detail}>
      <img src={isHovering ? props.item.thumbnail2 : props.item.thumbnail1} alt="" />
      <div className='badge'>
        { props.item.state == '' ? '' : props.item.state }
      </div>
      {/* setIsHovering == true ? '#2AC1BC' : 'black' */}
      <ItemInfo className='info' color={isHovering ? '#2AC1BC' : 'black'}>
        <h4>{props.item.title}</h4>
        <p>{props.item.price}원</p>
      </ItemInfo>
      </a>
    </div>
  )
}

export default Card;