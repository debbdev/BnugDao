import React, { useState } from 'react';
import {Data} from './Data';
import { useParams } from 'react-router';
import thumb from '../style/icon/thumbnails.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

export default function SwipeThumbs() {
    const {id} = useParams();
   console.log(id);
   const bnug = Data[id];
   console.log(bnug);
   const Mag = React.forwardRef((props, ref) => {
    return (
          <div className="" ref={ref}>
          <p>{props.children}</p>
        </div>
  );
});
    const swipe = () => {
        return (
            <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} spaceBetween={10} pagination={{ clickable: true }}
            slidesPerView={5} navigation scrollbar={{ draggable: true }}>
               {bnug.mag&&bnug.mag.map((page)=>(
               <SwiperSlide><img key={page.id} className='' src={`../png/${page.img}`} style={{width:600, height:700}} alt="book"/></SwiperSlide>
               ))}
            </Swiper>
        );
      };
      const SwipeableDiv = ({ handleMouseOver, handleMouseOut }) => {
        return (
          <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <img className='footerIcon' src={thumb} alt="carousel"/>
          </div>
        );
      };
  
      const [isSwipe, setIsSwipe] = useState(false);
      const handleMouseOver = () => {
        setIsSwipe(true);
      };
     
      const handleMouseOut = () => {
        setIsSwipe(false);
      };
  return (
    <div>
         <div className=''>
             <SwipeableDiv handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut}/>{isSwipe && <Swiper modules={[ Scrollbar, A11y]} spaceBetween={10} pagination={{ clickable: true }}
          slidesPerView={5} navigation scrollbar={{ draggable: true }}>
             {bnug.mag&&bnug.mag.map((page)=>(
             <SwiperSlide><img key={page.id} className='' src={`../png/${page.img}`} style={{width:100, height:100}} alt="book"/></SwiperSlide>
             ))}
          </Swiper> }
              </div>
    </div>
  )
}
