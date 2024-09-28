import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchGetUserData = async () => {
    const token = localStorage.getItem('user')

    const result = await axios.get(`/api/v1/login`, {
        headers: {
            Authorization: token,
            "Accepts": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
    return result?.data;
}
export const fetchGetUserDataById = async (id) => {
    const token = localStorage.getItem('user')

    const result = await axios.get(`${url}/login/${id}`, {
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
export const fetchUpdateUserData = async (data, id) => {
    const token = localStorage.getItem('user')
    const result = await axios.patch(`${url}/registration/update-user/${id}`, data, {
        headers: {
            Authorization: token,
            "Accepts": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });

    return result;
}
export const fetchDeleteUserData = async (id) => {
    const token = localStorage.getItem('user')
    const result = await axios.delete(`${url}/registration/remove-user/${id}`, {
        headers: {
            Authorization: token,
            "Accepts": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });

    return result;
}