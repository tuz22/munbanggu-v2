import { useContext } from 'react';
import styled from 'styled-components';
import CardIndex from './../component/CardIndex.js';
import { CategoryContext } from './../App.js';

let Container = styled.div`
    width: 1200px;
    height: 100%;
    margin: 0px auto;
    padding: 80px 0px 200px;
    display: flex;
    flex-direction: column;
`;
let Header = styled.div`
    padding-bottom: 60px;
    border-bottom: 1px solid rgb(221, 221, 221);
    height: 216px;
    // display: flex;
`;

function List(props) {
    const count = props.category.count;
    const category = props.category.category;
    const item = useContext(CategoryContext).item;
    const listItem = item.filter((e) => e.category === category);

    return (
        <Container>
            <Header className="list-header">
                <h2>
                    {props.category.category}
                    <span>{isNaN(count) === true ? count : `총 ${count}개`}</span>
                </h2>
                <article>{props.category.content}</article>
            </Header>
            <div className="card-list">
                {category === '전체'
                    ? item &&
                      item.map((a, i) => {
                          return <CardIndex key={i} item={item[i]} />;
                      })
                    : listItem &&
                      listItem.map((a, i) => {
                          return <CardIndex key={i} item={listItem[i]} />;
                      })}
            </div>
        </Container>
    );
}

export default List;
