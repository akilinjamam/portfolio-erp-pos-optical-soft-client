import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchPostLoginData = async (data) => {

    const result = await axios.post(`${url}/login/create-login`, data);

    localStorage.setItem("user", result?.data?.token)
    localStorage.setItem("userEmail", result?.data?.email)
    return result;
}