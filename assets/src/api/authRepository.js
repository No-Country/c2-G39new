import axios from "axios";

export default function authRepository() {

  let baseUrl = window.location.origin + "/api/dj-rest-auth"

  const tokenName = "user_token";

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
          resolve(r.data)
        })
        .catch((e) => {
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
