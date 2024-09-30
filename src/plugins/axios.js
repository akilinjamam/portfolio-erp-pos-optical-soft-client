import axios from "axios";

const baseURL = 'https://opticalsoft-server.vercel.app';
const token = localStorage.getItem('user')
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Accepts': 'application/json',
        "Access-Controll-Allow-Origin": "*",
        Authorization: token
    },


})

export default axiosInstance