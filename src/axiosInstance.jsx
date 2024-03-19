import axios from "axios";

const baseURL = "https://poseben-backend.onrender.com/api"  ;
// const baseURL ="http://localhost:3000/api"
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;