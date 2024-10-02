import axios from "axios";

const baseURL = 'https://opticalsoft-server.vercel.app';

const axiosInstance = axios.create({
    baseURL: baseURL,



})

export default axiosInstance