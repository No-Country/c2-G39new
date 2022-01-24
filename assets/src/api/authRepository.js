import axios from "axios";

export default function authRepository() {
  let debug = true;

  let baseUrl = "http://127.0.0.1:8000/api/dj-rest-auth";

  const tokenName = "user_token";

  const getLocalToken = () => {
    return JSON.parse(localStorage.getItem(tokenName));
  };

  //Funcion para obtener el token CSRF
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  //

  const logIn = (user) => {
    return new Promise((resolve, reject) => {
      const instance = axios.create({
        baseURL: baseUrl,
        headers: headers,
      });
      instance
        .post("login/", user)
        .then((r) => {
          localStorage.setItem(tokenName, r.data.key);
        })
        .catch((e) => {
          console.log(e);
          reject(e.response);
        });
    });
  };

  const signUp = (user) => {
    return new Promise((resolve, reject) => {
      const instance = axios.create({
        baseURL: baseUrl,
        headers: headers,
      });
      instance
        .post("registration/", user)
        .then((r) => {
          localStorage.setItem(tokenName, r.data.key);
          resolve(r.data);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };

  const logOut = () => {
    return new Promise((resolve, reject) => {
      const instance = axios.create({
        baseURL: baseUrl,
        headers: headers,
      });

      instance
        .post("logout/", {})
        .then((r) => {
          localStorage.removeItem(tokenName);
          resolve(r.data);
        })
        .catch((e) => {
          console.log(e);
          reject(e.response);
        });
    });
  };

  return {
    logIn,
    signUp,
    logOut,
  };
}
