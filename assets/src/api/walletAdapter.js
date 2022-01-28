import axios from "axios";

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

const obtenerMontoUsuario = (id) => {
  return new Promise((resolve, reject) => {
    const instance =  axios.create({
      baseURL: window.location.origin + "/api/wallets",
      headers: headers,
    });
    instance
      .get(`/${id}`)
      .then((r) => {
        resolve(r.data.monto)
      })
      .catch((e) => {
        reject(e.response);
      });
  });
};

const modificarMontoUsuario = (id, monto) => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/wallets/",
      headers: headers,
    });
    const data = {
      "monto": monto, 
      "tipo": "usd"
    }
    instance
      .patch(`/${id}/`, data)
      .then((r) => {
        resolve(r.data)
      })
      .catch((e) => {
        reject(e.response);
      });
  });
}

export {
  obtenerMontoUsuario,
  modificarMontoUsuario
}