import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Clients from './Clients';
import ClientContext from "../context/ClientContext";


function Dashboard() {

  const { user, handleLogout } = useContext(ClientContext);

  useEffect(() => {


  }, [user]);

  
  return (
   <>
          {user ? (
            <div>
             <header>
             <h2>Willkommen, {user.username}!</h2>
             <div className="controls">
               <button className="btn btn-logout" onClick={() => handleLogout(user === null)}>
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