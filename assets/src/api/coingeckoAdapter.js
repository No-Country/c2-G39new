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

const getDataFromGecko = () => {
  return new Promise((resolve, reject) => {
    const instance =  axios.create({
      baseURL: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=100&page=1",
      headers: headers,
    });
    instance
      .get("/")
      .then((r) => {
        resolve(r.data)
      })
      .catch((e) => {
        reject(e.response);
      });
  });
};

export default getDataFromGecko