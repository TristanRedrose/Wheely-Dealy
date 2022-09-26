import React from 'react';
import NavbarComponent from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';
import Homepage from './Components/Homepage/Homepage/Homepage';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import PageNotFound from './Components/404Page/PageNotFound';
import Listings from './Components/Listings/Listings';
import { ListingsProvider } from './Context/ListingsContext';
import AddListing from './Components/Listings/AddListing/AddListing';
import ListingDetails from './Components/Listings/ListingDetails/ListingDetails';

const App: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route 
          path="listings/*" 
          element={
            <ListingsProvider>
              <Outlet />
            </ListingsProvider>
          }
        >
          <Route path="" element = {<Listings />} />
          <Route path="add" element = {<AddListing />} />
          <Route path=":id" element = {<ListingDetails />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route path="404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </>
  )
}


export default App;
