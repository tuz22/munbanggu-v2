function Price({ discount, price, fontSize }) {
    const isSoldOut = price === 'SOLD OUT';
    const isNoDiscount = discount === null;
    const PRICE = `${price.toLocaleString()}원`;
    const sale = price * (100 - discount) * 0.01;
    const SALE = `${sale.toLocaleString()}원`;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'minsansVF', fontSize: fontSize }}>
            <p>
                <strike className="sale-price">{isNoDiscount ? '' : PRICE + ' '}</strike>
                {isSoldOut ? price : isNoDiscount ? PRICE : SALE}
            </p>
        </div>
    );
}
export default Price;
