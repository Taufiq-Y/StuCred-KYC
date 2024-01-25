import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link, NavLink, useNavigate  } from 'react-router-dom';
import KnowCustomer from '../pages/KnowCustomer'
import Pagination from '../pages/Pagination'
import ThankYou from "../pages/ThankYou";
import "../../src/App.css"

import "./Navbar.css";

const Navbar = ({onLogout}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    onLogout();
    navigate('/thankyou');
  }

  return (
    <>
     <Routes>
      {/* <Route path="/kyc" element={<KnowCustomer />} /> */}
      {/* <Route path="/pagination" element={<Pagination />} /> */}
      {/* <Route path="/thankyou" element={<ThankYou />} /> */}
    </Routes>
    <nav>
      <Link to="/" className="title">
        StuCred Vanilla JS KYC APP 
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <li>
           <NavLink to="/kyc">KYC</NavLink>
         </li>
         <li>
           <NavLink to="/pagination">Pagination</NavLink>
       </li>
       <li>
           <NavLink to="/ocr">OCR</NavLink>
       </li>
        <button className= "logoutbtn" onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
    <p className="text-css">Click on pagination to get list of user data with pagination and sorting</p>
    <p className="text-css">Click on KYC to capture image and audio file</p>
    <p className="text-css">Click on OCR to Extract Data from Image</p>
    </>
  );
};

export default Navbar;
