import axios from "axios";

const baseURL = import.meta.VITE_DATA_URL;
const token = localStorage.getItem('user')
const axiosInstance = axios.create({
    headers: {
        'Accepts': 'application/json',
        "Access-Controll-Allow-Origin": "*",
        Authorization: token
    },

    baseURL: baseURL

})

export default axiosInstance