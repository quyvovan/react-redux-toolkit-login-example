import axios from "axios";

const API_URL = "https://b591acdb-7342-41c6-8374-ed62277b642a.mock.pstmn.io/";

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password,
  });
};

const forgot = (email) => {
  return axios
    .get(API_URL + "forgotPassword?email=" + email);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", response.config.data);
      }

      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
  forgot
};

export default authService;
