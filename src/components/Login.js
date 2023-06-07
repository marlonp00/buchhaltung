import React, { useContext } from "react";
import { toast } from "react-toastify";
import {login} from '../auth';
import ClientContext from "../context/ClientContext";


const Login = ({ onLogin, error }) => {


  const { username, password, handleUserName, handlePassword} = useContext(ClientContext);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        await onLogin({ username, password });
        toast.success("erfolgreich eingeloggt");

      } else {
        throw new Error("Incorrect username or password");
      }
    } catch (error) {
      toast.error("Falscher Benutzername oder Passwort");
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
