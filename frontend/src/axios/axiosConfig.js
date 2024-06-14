import axios from "axios";
const axiosConfig = axios.create({
    baseURL: "http://localhost:5500/api",
})

export default axiosConfig;