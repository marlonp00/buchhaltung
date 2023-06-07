import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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
