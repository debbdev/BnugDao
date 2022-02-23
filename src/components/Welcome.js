import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
import './Flip.css';
import './Welcome.css';
import { formatEther, formatUnits } from '@ethersproject/units';
import QRCode from "react-qr-code";
import Modal from '@mui/material/Modal';
import bnb from './svg/bnb.svg';
import lead from './svg/lead.png';
import mm from './svg/mm.png';
import wc from './svg/wc.svg';
import Moralis from 'moralis';
import WalletConnect from "@walletconnect/client";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";

export default function Welcome() {
  Moralis.initialize("4LSqLovliBGDxbBA6BJh2NTR7J7Wa8IfpXtKnRxi");
  Moralis.serverURL = process.env.REACT_APP_SERVER_URL
  const initialUser = Moralis.User.current();
  const [user, setUser] = useState(initialUser);
  const userAddress = useMemo(() => user?.get("ethAddress"), [user]);
  async function loginMetamask() {
    let user = await Moralis.authenticate();
    setUser(user);
    console.log("logged in user:", user);
    if (user){
     const address = user.get('ethAddress');
     console.log(address);
     const options = {chain:"bsc testnet", address: userAddress};
     const balances = await Moralis.Web3API.account.getTokenBalances(options);
     console.log(balances)
     const tokenAddress =  '0x6c233982566e7f714c9fb31508ec6f4a5d9c5f12'; // You can specify for example: tokenAddress, name or symbol
     const tokenBalance= balances.find((token) => token.token_address === tokenAddress);
     console.log(tokenBalance);
     const bnugBalance = tokenBalance.balance;
     console.log(tokenBalance.balance)
     console.log(tokenBalance.name);
     checkBnugToken(bnugBalance);
    }
  }
  let tokenErr;
  function checkBnugToken (bnugBalance) {
    let tokenErr;
    if(bnugBalance<1){
       tokenErr = "Get Your BNUG Token to Continue";
       window.location.reload();
   }else{
       navigate('/bnug');
   }
 }
 
  useEffect(()=>{
    if(userAddress){
      checkBnugToken();
    }
    
  },[userAddress])
  async function loginWalletConnect() {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      infuraId: '8c8a6ca340e849bcb1cd809bfe0bcbfa',
      qrcodeModal: WalletConnectQRCodeModal,
    });
     const connect = await connector.connect();
     const walletconnect = new Web3(connect);
    //Change made here
    const user = await Moralis.authenticate({ provider: walletconnect,chainId: 56,
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ]});
    const web3 = await Moralis.enableWeb3({ provider: walletconnect,chainId: 56,
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ]});
    setUser(user);
  };

  async function loginLeadWallet() {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      infuraId: '8c8a6ca340e849bcb1cd809bfe0bcbfa',
      qrcodeModalOptions: {mobileLinks: ["metamask", "trust", "rainbow", "argent"]},
      qrcodeModal: WalletConnectQRCodeModal,
      qrcode: true,
    });
     const connect = await connector.connect();
     const walletconnect = new Web3(connect);
    //Change made here
    const user = await Moralis.authenticate({ provider: walletconnect,chainId: 56,
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ]});
    const web3 = await Moralis.enableWeb3({ provider: walletconnect,chainId: 56,
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ]});
    setUser(user);
  };

  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    setUser(null);
    sessionStorage.clear();
  }
  const [modal,setModal]= useState(false);
  const navigate = useNavigate();

  const handleCloseModal = ()=>{
    if(modal){
      setModal(false);
    }
  }

  const handleOpenModal = ()=>{
    if(!modal){
      setModal(true);
    }
  }

  

  const handleConnectClick = async()=>{
    setModal(true);
  }

  const HoverText = () => {
   return (
       <QRCode value='https://read.blockchainmagazine.report' size={100} className='qrcode'/>
   );
 };

  const HoverableDiv = ({ handleMouseOver, handleMouseOut }) => {
   return (
     <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
       <img className='footerIcon' src={thumb} alt="qrcode"/>
     </div>
   );
 };

 const [isHovering, setIsHovering] = useState(false);
 const handleMouseOver = () => {
   setIsHovering(true);
 };

 const handleMouseOut = () => {
   setIsHovering(false);
 };
  return (
     <>
    <div>
          <div className='flipHeader'>
              <div className='flipHeaderLeft'>
                 <img className='headerLogo' src={logo} alt="bnuglogo"/>
              </div>
              <div>{userAddress && <p>{userAddress}</p>}</div>
              <div className='flipHeaderRight'>
                 <input type="text" placeholder='Search' className='headerSearch'></input>
              </div>
         </div>
         <div className='welcomeContainer'>
               <div className='inputContainer'>
                    {tokenErr &&<p>{tokenErr}</p>}
                    {userAddress ? <button onClick={logOut} className="verifyBtn">Disconnect Wallet</button> : <button onClick={handleOpenModal} className="verifyBtn">Connect Wallet To Start Reading</button>}
        <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <div className='modalContainer'>
        <div className='connect-text'>Connect to a DeFi wallet</div>
        <div className='terms-div'>
          By connecting your wallet, you agree to BNUG DAO<span className='green'>Terms of Service </span> and acknowledge that you have read and indeed, understood the <span className='green'> BNUGDAO Group protocol disclaimer.</span>
        </div>
        <div onClick={loginMetamask} className='wallet'>
           <div> Metamask</div>
           <img src ={mm} width="20px" height="20px" alt="wallet"/>
          
        </div>
        <div onClick={loginMetamask} className='wallet'>
           <div> Binance Smart Chain</div>
           <img src ={bnb} width="20px" height="20px" alt="wallet"/> 
        </div>
        <div onClick={loginWalletConnect} className='wallet'>
           <div> WalletConnect</div>
           <img src ={wc} width="20px" height="20px" alt="wallet"/>  
        </div>
        <div onClick={loginLeadWallet} className='wallet'>
           <div>Lead Wallet</div>
           <img src ={lead} width="20px" height="20px" alt="wallet"/>  
        </div>
        </div >
      </Modal>
               </div>
               <div className='hover'><HoverableDiv handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut}/>{isHovering && <HoverText/> }</div>
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
                 <p className='footerIcon footerSearch'></p>
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
    </>
  )
}
