import React from 'react';
import NavbarComponent from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';
import Homepage from './Components/Homepage/Homepage/Homepage';
import { Routes, Route, Outlet} from 'react-router-dom';
import { StoresProvider } from './Context/StoresContext';
import PageNotFound from './Components/404Page/PageNotFound';
import Listings from './Components/Listings/Listings';
import ListingForm from './Components/Listings/ListingForm/ListingForm';
import ListingDetails from './Components/Listings/ListingDetails/ListingDetails';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import AuthRoutes from './Utils/ProtectedRoutes/Auth.routes';
import ListingRoutes from './Utils/ProtectedRoutes/Listing.routes';
import Modal from './Components/Common/Modal/Modal';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  return (
    <>
      <StoresProvider>
        <ToastContainer />
        <Modal />
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
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
            <Route path="" element={<Homepage />} />
            <Route 
              path="listings/*" 
              element={<Outlet />}
            >
              <Route path="" element={<Listings />} />
              <Route element={<ListingRoutes />}>
                <Route path="form/:id" element={<ListingForm />} />
                <Route path="form" element={<ListingForm />} />
              </Route>
              <Route path=":id" element={<ListingDetails />} />
              <Route path="*" element={<PageNotFound text="listing" />} />
            </Route>
            <Route path="*" element={<PageNotFound text="page" />} />
          </Route>
          <Route path="*" element={<PageNotFound text="page" />} />
        </Routes>
      </StoresProvider>
    </>
  )
}

export default App;
