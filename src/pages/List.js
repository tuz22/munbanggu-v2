import { useContext } from 'react';
import styled from 'styled-components';
import CardIndex from './../component/CardIndex.js'
import { Context2 } from './../App.js';

let Container = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 80px 0px 200px;
  display: flex;
  flex-direction: column;
`
let Header = styled.div`
  padding-bottom: 60px;
  border-bottom: 1px solid rgb(221, 221, 221);
  height: 216px;
  // display: flex;
`

function List(props){
  const count = props.category.count;
  const item = useContext(Context2).item;
  // console.log(item.item)
  // console.log(useContext(Context2))

  return (
    <Container>
      <Header className='list-header'>
        <h2>
          {props.category.category}
          <span>{isNaN(count) == true ? count : `총 ${count}개`}</span>
        </h2>
        <article>{props.category.content}</article>
      </Header>
      <div className='card-list'>
      {
        item && item.map((a, i) => {
          return (
            <CardIndex item={item[i]} />
          )
        })
      }
    </div>
    </Container>
  )
}

export default List;