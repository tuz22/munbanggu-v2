import { useState } from 'react';
import CardIndex from './../components/CardIndex.js';
import data from './../data/data.js';
import Carousel from '../components/Carousel.js';

function Main() {
    const [item] = useState(data);
    const newItem = item.filter((e) => e.date === 221201);
    const bestItem = item.filter((e) => e.stock < 100);
    const firstItem = item.filter((e) => e.date < 220600);
    const saleItem = item.filter((e) => e.discount !== null);

    return (
        <>
            <Carousel />
            <section className="main-container">
                <article className="event-content">
                    <img src={process.env.PUBLIC_URL + '/assets/img/card-banner1.jpg'} alt="카드베너1" />
                    <div className="event-list">
                        <div className="card-box">
                            {newItem &&
                                newItem.map((data) => {
                                    return <CardIndex key={data.id} item={data} />;
                                })}
                        </div>
                    </div>
                    <div className="btn-box">
                        <button className="item-btn item-prev-btn">prev</button>
                        <button className="item-btn item-next-btn">next</button>
                    </div>
                </article>
                <article className="main-content">
                    <h3 className="main-title">요즘 잘 나가요</h3>
                    <div className="card-list">
                        {bestItem &&
                            bestItem.map((data) => {
                                return <CardIndex key={data.id} item={data} />;
                            })}
                    </div>
                </article>
                <article className="event-content">
                    <img src={process.env.PUBLIC_URL + '/assets/img/card-banner2.png'} alt="카드베너2" />
                    <div className="event-list">
                        <div className="card-box">
                            {firstItem &&
                                firstItem.map((data) => {
                                    return <CardIndex key={data.id} item={data} />;
                                })}
                        </div>
                    </div>
                    <div className="btn-box">
                        <button className="item-btn item-prev-btn">prev</button>
                        <button className="item-btn item-next-btn">next</button>
                    </div>
                </article>
                <article className="main-content">
                    <h3 className="main-title">지금은 할인중</h3>
                    <div className="card-list sale-list">
                        {saleItem &&
                            saleItem.map((data) => {
                                return <CardIndex key={data.id} item={data} />;
                            })}
                    </div>
                </article>
            </section>
        </>
    );
}
export default Main;
