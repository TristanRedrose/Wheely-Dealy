import React from 'react';
import './App.css';
import NavbarComponent from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';
import Homepage from './Components/Homepage/HomepageComponent/Homepage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Components/404Page/PageNotFound';
import Listings from './Components/Listings/Listings';

const App: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="listings" element={<Listings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}


export default App;
