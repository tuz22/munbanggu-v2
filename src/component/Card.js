function Card(props){
  let detail = '/goods/detail/' + props.item.id;
  // console.log(detail)

  return (
    <div className='event-card'>
      <a href={detail}>
      <img src={props.item.thumbnail1} alt="" />
      <div className='badge'>
        { props.item.state == '' ? '' : props.item.state }
      </div>
      <div className='info'>
        <h4>{props.item.title}</h4>
        <p>{props.item.price}원</p>
      </div>
      </a>
    </div>
  )
}

export default Card;