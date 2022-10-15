import React from 'react';
import NavbarComponent from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';
import Homepage from './Components/Homepage/Homepage/Homepage';
import { Routes, Route, Outlet} from 'react-router-dom';
import PageNotFound from './Components/404Page/PageNotFound';
import Listings from './Components/Listings/Listings';
import { ListingsProvider } from './Context/ListingsContext';
import AddListing from './Components/Listings/AddListing/AddListing';
import ListingDetails from './Components/Listings/ListingDetails/ListingDetails';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route 
          path="/*" 
          element={
            <>
              <NavbarComponent />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="" element={ <Homepage />} />
          <Route 
            path="listings/*" 
            element={
              <ListingsProvider>
                <Outlet />
              </ListingsProvider>
            }
          >
            <Route path="" element = {<Listings />} />
            <Route path="add" element ={<AddListing />} />
            <Route path=":id" element ={<ListingDetails />} />
            <Route path="*" element={<PageNotFound text="listing" />} />
          </Route>
          <Route path="*" element={<PageNotFound text="page" />} />
        </Route>
        <Route path="*" element={<PageNotFound text="page" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
