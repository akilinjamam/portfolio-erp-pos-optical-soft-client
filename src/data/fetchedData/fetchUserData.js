import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchGetUserData = async () => {
    const token = localStorage.getItem('user')

    const result = await axios.get(`${url}/login`, {
        headers: {
            Authorization: token,
            "Accepts": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
    return result?.data;
}


export const fetchPostUserData = async (data) => {

    const result = await axios.post(`${url}/registration/create-registration`, data);
    localStorage.setItem('userEmail', result?.data?.result?.email)
    return result;
}