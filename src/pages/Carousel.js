import { useEffect, useRef, useState } from 'react';

function Carousel(){
  const TOTAL_SLIDES = 4;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  
  const slideBtn = ((e) => {
    // console.log((e.target.innerHTML)-1)
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
            <img src="./../assets/img/banner1.jpg" draggable="false" alt="메인베너1" />
        </div>
        <div className='carousel-box'>
          <img src="./../assets/img/banner2.jpg" draggable="false" alt="메인베너2" />
        </div>
        <div className='carousel-box'>
          <img src="./../assets/img/banner3.jpg" draggable="false" alt="메인베너3" />
        </div>
        <div className='carousel-box'>
          <img src="./../assets/img/banner4.jpg" draggable="false" alt="메인베너4" />
        </div>
        <div className='carousel-box'>
          <img src="./../assets/img/banner5.png" draggable="false" alt="메인베너5" />
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