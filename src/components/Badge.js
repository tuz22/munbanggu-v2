function Badge({ discount, state }) {
    const badgeDiscount = discount === null ? '' : discount + '% SALE';
    const badgeColor = () => {
        if (state === 'NEW') {
            return '#2AC1BC';
        } else if (state === 'GREEN') {
            return '#0c952a';
        } else {
            return '#6236FF';
        }
    };
    return (
        <div className="badge">
            <span className="discount">{badgeDiscount}</span>
            <span className="badge-name" style={{ color: badgeColor() }}>
                {state === '' ? '' : state}
            </span>
        </div>
    );
}
export default Badge;
