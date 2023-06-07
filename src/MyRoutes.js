import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import ClientDetails from './components/ClientDetails';
import Clients from './components/Clients';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Clients />} />
      <Route path='/customers' element={<ClientDetails />}/>
    </Routes>
  );
}

export default MyRoutes;