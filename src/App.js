import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ClientDetails from "./components/ClientDetails";
import ClientContext from "./context/ClientContext";
import Login from "./components/Login";
import NoMatch from "./components/noMatch";
import Dashboard from "./components/Dashboard";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { user } = useContext(ClientContext);

  useEffect(() => {
  }, []); 

 

  return (
    <Router>
       <>
 
          { !user && <Navigate to='/login' /> }

           <ToastContainer autoClose={3000} />
         
        </>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<ClientDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </Router>
  );
}

export default App;
