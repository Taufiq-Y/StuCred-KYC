import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import KnowCustomer from "./pages/KnowCustomer";
import Pagination from "./pages/Pagination";
import Navbar from "./components/navBar";
import ThankYou from "./pages/ThankYou";
import CardReader from "./pages/ocr"

function App() {
  const [token, setToken] = useState("");
  console.log("token::: ", token);
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (
    <>
      {token && <Navbar onLogout={handleLogout} />}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/ocr" element={<CardReader />} />
        <Route path="/kyc" element={<KnowCustomer />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/thankyou" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
