import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ClientDetails from "./components/ClientDetails";
import Login from "./components/Login";
import NoMatch from "./components/noMatch";
import Dashboard from "./components/Dashboard";
import { ClientProvider } from './context/ClientContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);
  const [formatGermanDate, setFormatGermanDate] = useState(null);
  const [handleStatus, setHandleStatus] = useState(null);


  const handleLogin = (user) => {
    setUser(user);
    console.log(user)
  };


  const handleLogout = () => {
    setUser(null);
  };


  return (
    <Router>
      <ClientProvider>
        <>
          {user ? (
            <Navigate to='/dashboard' />
          ) : (
            <Navigate to='/login' />
          )}
           <ToastContainer autoClose={3000} />
         
        </>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard user={user} handleLogout={handleLogout} />} />
          <Route path="/details" element={<ClientDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ClientProvider>
    </Router>
  );
}

export default App;
