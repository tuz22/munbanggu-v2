import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Carousel(){
  const navigate = useNavigate();
  const TOTAL_SLIDES = 4;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  
  const slideBtn = ((e) => {
    setCurrentSlide((e.target.innerHTML)-1);
  })
  
  const prevBtn = (() => {
    if ( currentSlide <= 0) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  })
  
  const nextBtn = (() => {
    if ( currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  })

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
    slideRef.current.style.transition = "all 1s ease";
  }, [currentSlide]);
  
  return(
    <div className='carousel'>
      <div className='carousel-container' ref={slideRef}>
        <div className='carousel-box'>
          <button onClick={() => {navigate('/goods/detail/0')}} >
            <img src={process.env.PUBLIC_URL + '/assets/img/banner1.jpg'} draggable="false" alt="메인베너1" />
          </button>
        </div>
        <div className='carousel-box'>
          <button onClick={() => {navigate('/goods/detail/1')}} >
            <img src={process.env.PUBLIC_URL + '/assets/img/banner2.jpg'} draggable="false" alt="메인베너2" />
          </button>
        </div>
        <div className='carousel-box'>
          <button onClick={() => {navigate('/goods/detail/4')}} >
            <img src={process.env.PUBLIC_URL + '/assets/img/banner3.jpg'} draggable="false" alt="메인베너3" />
          </button>
        </div>
        <div className='carousel-box'>
          <button onClick={() => {navigate('/goods/detail/6')}} >
            <img src={process.env.PUBLIC_URL + '/assets/img/banner4.jpg'} draggable="false" alt="메인베너4" />
          </button>
        </div>
        <div className='carousel-box'>
          <button onClick={() => {navigate('/goods/detail/12')}} >
            <img src={process.env.PUBLIC_URL + '/assets/img/banner5.png'} draggable="false" alt="메인베너5" />
          </button>
        </div>
      </div>
      <div className='carousel-btn'>
        <button onClick={prevBtn} className='prev-btn'>〈</button>
        <div className='slide-btn'>
          <button onClick={slideBtn}>1</button>
          <button onClick={slideBtn}>2</button>
          <button onClick={slideBtn}>3</button>
          <button onClick={slideBtn}>4</button>
          <button onClick={slideBtn}>5</button>
        </div>
        <button onClick={nextBtn} className='next-btn'>〉</button>
      </div>
    </div>
  )
}

export default Carousel;