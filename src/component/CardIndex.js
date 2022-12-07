import { useState } from 'react';

function CardIndex(props){
  // console.log(props.item.state)
  const discount = props.item.discount;
  const price = props.item.price;
  const sale = price * (100 - discount) * 0.01;
  let detail = '/goods/detail/' + props.item.id;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => { setIsHovering(true); }
  const handleMouseOut = () => { setIsHovering(false); }

  return (
    // <div className='card-list'>
      <div className='card-list-box' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <a href={detail}>
        <img src={isHovering ? props.item.thumbnail2 : props.item.thumbnail1} alt="" />
          <div className='badge'>
            <span className='discount'>
              { discount == null ? '' : discount + '% SALE' }
            </span>
            <span className='badge-name'>
              { props.item.state == '' ? '' : props.item.state }
            </span>
          </div>
          <div className='info'>
            <h4>{props.item.title}</h4>
            <div>
              <p>
                <strike className='sale-price'>{ discount == null ? '' : price + ' '}</strike>
                { discount == null ? price + '원' : sale + '원' }
              </p>
            </div>
          </div>
        </a>
      </div>
    // </div>
  )
}

export default CardIndex;