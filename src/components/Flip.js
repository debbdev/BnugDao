import React, { useCallback, useRef, useState } from 'react';
import {Data} from './Data';
import logo from '../files/extfile/appLogoIcon.png';
import prevBtn from '../style/icon/previous_normal.png';
import nextBtn from '../style/icon/next_normal.png';
import prev from '../style/icon/prev.png';
import next from '../style/icon/next.png';
import first from '../style/icon/First.png';
import last from '../style/icon/Last.png';
import fullscreen from '../style/icon/fullscreen.png';
import print from '../style/icon/print.png';
import thumb from '../style/icon/thumbnails.png';
import audio from '../style/icon/autoPlay.png';
import sound from '../style/icon/soundOn.png';
import share from '../style/icon/sharethis.png';
import zm from '../style/icon/ZM.png';
import email from '../style/icon/youjian.png';
import table from '../style/icon/tableOfContent.png';
import HTMLFlipBook from 'react-pageflip';
import { useParams } from 'react-router';
import './Flip.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/scrollbar';
// import 'swiper/css/pagination';


export default function Flip() {
   const {id} = useParams();
   console.log(id);
   const bnug = Data[id];
   console.log(bnug);
   const handle=useFullScreenHandle();
   const onFlip = useCallback((e)=>{
      console.log('current page:' + e.data)
   }, []);
   const mag = useRef();
   const firstPage=bnug.mag.map((a)=>a.img);
   console.log(firstPage)
   const lastPage=bnug.mag.map((a)=>a.img);
   console.log(lastPage)

  return <FullScreen handle={handle}>
         <div>
            <div className='flipHeader'>
              <div className='flipHeaderLeft'>
                 <img className='headerLogo' src={logo} alt="bnuglogo"/>
              </div>
              <div className='flipHeaderRight'>
                 <input type="text" placeholder='Search' className='headerSearch'></input>
              </div>
         </div>
         <div className='flipContainer'>
               <div className='buttonContainer'>
                   <img src={prevBtn} onClick={()=>mag.current.pageFlip().turnToPrevPage()} alt="previous-button"/>
               </div>
                      <HTMLFlipBook width={600} height={700} showCover={true} ref={mag} className='bookWrapper'>
                      {bnug.mag&&bnug.mag.map((page)=>(
                         <img key={page.id} className='magImages' src={`../png/${page.img}`} style={{width:600, height:700}} alt="book"/>
                      ))}
                </HTMLFlipBook>
                  
               <div className='buttonContainer'>
                   <img src={nextBtn} alt="next-button" onClick={()=>mag.current.pageFlip().turnToNextPage()}/>
               </div>
         </div>
         
         <div className='flipFooter'>
              <div className='flipFooterLeft'>
                 <img className='footerIcon' src={thumb} alt="thumb"/>
                 <img className='footerIcon' src={table} alt="thumb"/>
                 <img className='footerIcon' src={zm} alt="thumb"/>
                 <img className='footerIcon' src={sound} alt="thumb"/>
                 <img className='footerIcon' src={print} alt="thumb"/>
              </div>
              <div className='flipFooterMiddle'>
                 <img className='footerIcon' src={first} onClick={()=>mag.current.pageFlip().turnToPage()} alt="thumb"/>
                 <img className='footerIcon' src={prev} onClick={()=>mag.current.pageFlip().turnToPrevPage()} alt="thumb"/>
                 <p className='footerIcon footerSearch' onMouseOver={()=>mag.current.pageFlip().getPageCount()}></p>
                 <img className='footerIcon' src={next} onClick={()=>mag.current.pageFlip().turnToNextPage()} alt="thumb"/>
                 <img className='footerIcon' src={last} onClick={(lastPage)=>mag.current.pageFlip().turnToPage(lastPage)} alt="thumb"/>
              </div>
              <div className='flipFooterRight'>
                 <img className='footerIcon' src={email} onClick={() => window.location = 'mailto:bnugmail@gmail.com'} alt="thumb"/>
                 <img className='footerIcon' src={share} alt="thumb"/>
                 <img className='footerIcon' src={audio} alt="thumb"/>
                 <img className='footerIcon' src={fullscreen} onClick={handle.enter} alt="thumb"/>
              </div>
         </div>
         </div>
  </FullScreen>;
}
