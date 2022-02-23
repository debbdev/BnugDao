import './App.css';
import Magazines from './components/Magazines';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Flip from './components/Flip';
import { MoralisProvider } from "react-moralis";
import Welcome from './components/Welcome';

function App() {
  return (
    <MoralisProvider appId={process.env.REACT_APP_MORALIS_ID} serverUrl={process.env.REACT_APP_SERVER_URL}>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ="/bnug/:id" element={<Flip/>} />
        <Route path ="/bnug" element={<Magazines/>} />
        <Route path ="/" element={<Welcome/>} exact/>
        </Routes>
      </BrowserRouter>
    </div>
    </MoralisProvider>
  );
}

export default App;
