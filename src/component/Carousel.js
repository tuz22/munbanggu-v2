import { useEffect, useRef, useState } from 'react';

function Carousel(){
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
          <a href='/goods/detail/0'>
            <img src="./../assets/img/banner1.jpg" draggable="false" alt="메인베너1" />
          </a>
        </div>
        <div className='carousel-box'>
          <a href='/goods/detail/1'>
            <img src="./../assets/img/banner2.jpg" draggable="false" alt="메인베너2" />
          </a>
        </div>
        <div className='carousel-box'>
          <a href='/goods/detail/4'>
            <img src="./../assets/img/banner3.jpg" draggable="false" alt="메인베너3" />
          </a>
        </div>
        <div className='carousel-box'>
          <a href='/goods/detail/6'>
            <img src="./../assets/img/banner4.jpg" draggable="false" alt="메인베너4" />
          </a>
        </div>
        <div className='carousel-box'>
          <a href='/goods/detail/12'>
            <img src="./../assets/img/banner5.png" draggable="false" alt="메인베너5" />
          </a>
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