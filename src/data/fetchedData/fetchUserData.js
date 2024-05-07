import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchGetUserData = async () => {
    const token = localStorage.getItem('user')

    const result = await axios.get(`https://opticalsoft-server.vercel.app/api/v1/login`, {
        headers: {
            Authorization: token
        }
    })
    return result?.data;
}


export const fetchPostUserData = async (data) => {

    const result = await axios.post(`${url}/registration/create-registration`, data);
    localStorage.setItem('userEmail', result?.data?.result?.email)
    return result;
}