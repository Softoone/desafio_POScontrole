import axios from "axios";

const API_URL = "https://app-web-03-bck-rd-hmg.azurewebsites.net";

export default axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});
