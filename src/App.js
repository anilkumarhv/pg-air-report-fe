import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import './App.css';
import Footer from './components/nav/Footer';
import Nav from './components/nav/Nav';
import Banner from './components/pages/Banner';
import FeaturesArea from './components/pages/FeaturesArea';
import ServicesArea from './components/pages/ServicesArea';

import PBanner from './components/pirep/PBanner';
import MBanner from './components/metar/MBanner';

import PSearchArea from './components/pirep/PSearchArea';
import MSearchArea from './components/metar/MSearchArea';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/pirep' element={<Pirep />} />
          <Route path='/metar' element={<Metar />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function Main() {
  return (
    <div className='main'>
      <>
        <div className='hero-section'>
          <Banner />
        </div>
        <div className='feature-area pt-70 pb-50'>
          <FeaturesArea />
        </div>

        <div className='service-area bg py-120'>
          <ServicesArea />
        </div>
        <a href="/#" id="scroll-top" style={{ display: 'none' }}>
          <i className="far fa-angle-double-up">
          </i>
        </a>
      </>

    </div>
  );
}


function Pirep() {
  return (
    <div className='main'>
      <>
        <div className='hero-section'>
          <PBanner />
        </div>
        {/* <div className='search-area'> */}
        <div>
          <PSearchArea />
        </div>

        {/* <div className='feature-area pt-120 pb-50'>
          <FeaturesArea />
        </div> */}

        {/* <div className='service-area bg py-120'>
          <ServicesArea />
        </div> */}

        <a href="/#" id="scroll-top" style={{ display: 'none' }}>
          <i className="far fa-angle-double-up">
          </i>
        </a>
      </>

    </div>
  );
}


function Metar() {
  return (
    <div className='main'>
      <>
        <div className='hero-section'>
          <MBanner />
        </div>
        <div>
          <MSearchArea />
        </div>

        <a href="/#" id="scroll-top" style={{ display: 'none' }}>
          <i className="far fa-angle-double-up">
          </i>
        </a>
      </>

    </div>
  );
}

export default App;
