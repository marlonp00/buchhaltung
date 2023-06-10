import React, { useContext } from "react";
import { toast } from "react-toastify";
import {login} from '../auth';
import ClientContext from "../context/ClientContext";
import { useNavigate } from "react-router-dom";



const Login = ({ error }) => {

  const { username, password, handleLogin, handleUserName, handlePassword} = useContext(ClientContext);
  const navigate = useNavigate();


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        await handleLogin({ username, password });
        toast.success("erfolgreich eingeloggt");
        navigate("/dashboard")

      } else {
        throw new Error("Incorrect username or password");
      }
    } catch (error) {
      toast.error("Falscher Benutzername oder Passwort");
      console.log(error);
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
              onChange={(e) => handleUserName(e.target.value)}
              placeholder="UserName"
            />
            </label>
            
            <br />
            <label>
              Passwort <br/>
              <input
                type="password"
                value={password}
                onChange={(e) => handlePassword(e.target.value)}
                placeholder="passwort"
              />
            </label>
            <br />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
