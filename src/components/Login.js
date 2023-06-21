import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import {login} from '../auth';
import ClientContext from "../context/ClientContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";



const Login = ({ error }) => {

  const { username, password, handleLogin, handleUserName, handlePassword} = useContext(ClientContext);
  const navigate = useNavigate();
  const [disabledBtn, setDisabledBtn] = useState(false);


  
  const handleSubmit = async (event) => {
    event.preventDefault();

    setDisabledBtn(true);
    
 
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        await handleLogin({ username, password });
        toast.success("erfolgreich eingeloggt");
        navigate("/dashboard")
        setDisabledBtn(false);


      } else {
        setDisabledBtn(false);
        throw new Error("Incorrect username or password");
      }
    } catch (error) {
      toast.error("Falscher Benutzername oder Passwort");
      console.log(error);
      setDisabledBtn(false);
    } 
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-login-body">
          <h1>Login Panel</h1>

          <form onSubmit={handleSubmit}>
            <label>
            Username <br/>
            <input
              type="text"
              value={username}
              autoComplete="username"
              onChange={(e) => handleUserName(e.target.value)}
              placeholder="User Name"
            />
            </label>
            
            <br />
            <label>
              Passwort <br/>
              <input
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => handlePassword(e.target.value)}
                placeholder="Passwort"
              />
            </label>
            <br />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button className="btn btn-login" disabled={disabledBtn} type="submit">Login </button>
          </form>
          { disabledBtn && <Spinner /> }
        </div>
      </div>
    </div>
  );
};

export default Login;
