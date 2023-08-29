import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import Badge from './Badge';
import Price from './Price';

const ItemInfo = styled.div`
    font-family: minsansVF;
    font-weight: 400;
    font-size: 16px;
    color: ${(props) => props.color};
`;

function CardIndex(props) {
    const navigate = useNavigate();
    const { discount, price, state, id } = props.item;
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const handleClick = () => {
        navigate('/goods/detail/' + id);
    };

    return (
        <div className="card-list-box" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <button onClick={handleClick}>
                <Thumbnail thumbnail1={props.item.thumbnail1} thumbnail2={props.item.thumbnail2} />
                <Badge discount={discount} state={state} />
                <ItemInfo className="info" color={isHovering ? '#2AC1BC' : 'black'}>
                    <h4>{props.item.title}</h4>
                    <Price price={price} discount={discount} />
                </ItemInfo>
            </button>
        </div>
    );
}

export default CardIndex;
