import { useNavigate } from 'react-router-dom';
import { decrease, increase, dropItem, checkItem } from './../store/cartSlice';

function CartItem({ item, index, checkArr, dispatch }) {
    const { id, title, thumbnail1, price, count, checked } = item;
    const checkId = `@check${index}`;
    const navigate = useNavigate();

    const handleCheckboxClick = () => {
        dispatch(checkItem(id));
    };

    const handleCartItemDelete = () => {
        dispatch(dropItem(id));
    };

    const handleNavigate = () => {
        navigate(`/goods/detail/${id}`);
    };

    const handleDecrease = () => {
        dispatch(decrease(id));
    };

    const handleIncrease = () => {
        dispatch(increase(id));
    };

    const isChecked = checked ? true : false;
    if (isChecked) {
        checkArr.push(id);
    } else {
        const indexToRemove = checkArr.indexOf(id);
        if (indexToRemove !== -1) {
            checkArr.splice(indexToRemove, 1);
        }
    }

    return (
        <div key={id}>
            <ul className="cart-list">
                <li>
                    <div className="check-box">
                        <input
                            type="checkbox"
                            id={checkId}
                            onClick={handleCheckboxClick}
                            checked={isChecked}
                            readOnly
                        />
                        <label htmlFor={checkId} />
                    </div>
                    <div className="list-box" onClick={handleNavigate}>
                        <div className="thumbnail">
                            <img src={thumbnail1} alt="" />
                        </div>
                        <div className="list-info">
                            <p className="list-name">{title}</p>
                        </div>
                    </div>
                    <div className="cart-info">
                        <div className="quantity">
                            <input type="text" value={count} readOnly />
                            <button className="btn-minus" onClick={handleDecrease}>
                                -
                            </button>
                            <button className="btn-plus" onClick={handleIncrease}>
                                +
                            </button>
                        </div>
                        <div className="price-info">
                            <div className="price">
                                <span>{(price * count).toLocaleString()}원</span>
                            </div>
                            <button className="cart-del-btn" onClick={handleCartItemDelete}>
                                삭제
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default CartItem;
