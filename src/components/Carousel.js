import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Carousel({ item }) {
    const navigate = useNavigate();
    const { length } = item.length;
    // const TOTAL_SLIDES = length;
    const TOTAL_SLIDES = item.length - 1;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    console.log(item);
    const slideBtn = (e) => {
        setCurrentSlide(e.target.innerHTML - 1);
    };

    const prevBtn = () => {
        if (currentSlide <= 0) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const nextBtn = () => {
        if (currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    useEffect(() => {
        if (TOTAL_SLIDES > 1) {
            slideRef.current.style.transform = `translateX(-${currentSlide * 100}vw)`;
        } else {
            slideRef.current.style.transform = `translateX(-${currentSlide * 500}px)`;
        }
        slideRef.current.style.transition = 'all 1s ease';
    }, [currentSlide]);

    return (
        <div className="carousel">
            <div className="carousel-container" ref={slideRef}>
                {item &&
                    item.map((item, index) => {
                        return (
                            <div className="carousel-box">
                                <button
                                    style={{ padding: 0 }}
                                    onClick={() => {
                                        navigate(item.link ? item.link : '');
                                    }}
                                >
                                    <img
                                        id="carouselImg"
                                        src={
                                            item?.img?.includes('assets')
                                                ? process.env.PUBLIC_URL + item.img
                                                : item.thumbnail
                                        }
                                        draggable="false"
                                        alt={`mainBanner${index + 1}`}
                                    />
                                </button>
                            </div>
                        );
                    })}
            </div>
            <div className="carousel-btn">
                <button onClick={prevBtn} className="prev-btn">
                    〈
                </button>
                <div className="slide-btn">
                    {item &&
                        item.map((data, index) => {
                            return <button onClick={slideBtn}>{index + 1}</button>;
                        })}
                </div>
                <button onClick={nextBtn} className="next-btn">
                    〉
                </button>
            </div>
        </div>
    );
}

export default Carousel;
