import axios from "axios";

const apiUrl = 'https://misfits-backend-marlon.onrender.com';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
};
