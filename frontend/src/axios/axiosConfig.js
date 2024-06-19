import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://evangadi-forum-backend-re4e.onrender.com/api",
  //baseURL: "https://evangadi-forum-backend-1-83vw.onrender.com/api",
});

export default axiosConfig;