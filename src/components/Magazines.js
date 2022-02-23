import React from 'react';
import logo from '../files/extfile/appLogoIcon.png';
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
import {Data} from './Data';
import { Link } from 'react-router-dom';
import './Magazines.css';
import './Flip.css';
import './Welcome.css';

export default function Magazines() {
  return (
    <div>
          <div className='flipHeader'>
              <div className='flipHeaderLeft'>
                 <img className='headerLogo' src={logo} alt="bnuglogo"/>
              </div>
              <div className='flipHeaderRight'>
                 <input type="text" placeholder='Search' className='headerSearch'></input>
              </div>
         </div>
         <div className='magazineContainer'>
             {Data&&Data.map((mag)=>(
               <div className='magazines'>
                    <Link to={'/bnug/' + mag.id}><img className='magImg' key={mag.id} src={`../png/${mag.cover}`} alt="bnugMagazine"/></Link>
               </div>
             ))}
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
                 <img className='footerIcon' src={first} alt="thumb"/>
                 <img className='footerIcon' src={prev} alt="thumb"/>
                 <input type="text" placeholder='' className='footerIcon footerSearch'/>
                 <img className='footerIcon' src={next} alt="thumb"/>
                 <img className='footerIcon' src={last} alt="thumb"/>
              </div>
              <div className='flipFooterRight'>
                 <img className='footerIcon' src={email} alt="thumb"/>
                 <img className='footerIcon' src={share} alt="thumb"/>
                 <img className='footerIcon' src={audio} alt="thumb"/>
                 <img className='footerIcon' src={fullscreen} alt="thumb"/>
              </div>
         </div>
    </div>
  )
}
