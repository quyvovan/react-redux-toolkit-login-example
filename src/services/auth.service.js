import axios from "axios";

const API_URL = "https://b591acdb-7342-41c6-8374-ed62277b642a.mock.pstmn.io/";

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password,
    returnSecureToken: true,
  }, { 
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8081/',
      'X-CSRF-Token': 'CIwNZNlR4XbisJF39I8yWnWX9wX4WFoz',
      'Access-Control-Allow-Credentials': true
    } 
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
