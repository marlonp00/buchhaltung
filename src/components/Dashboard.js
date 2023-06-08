import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import Clients from './Clients'

function Dashboard({handleLogout, user}) {
useEffect(() => {

}, []);
  
  return (
   <>
          {user ? (
            <div>
             <header>
             <h2>Willkommen, {user.username}!</h2>
             <div className="controls">
               <button className="btn" onClick={() => handleLogout(user === null)}>
                 Logout
               </button>
             </div>
           </header>
           <Clients />
           </div>
          ) : (
            <Navigate to='/login' />
     
          )}    
    </>
  )
}

export default Dashboard