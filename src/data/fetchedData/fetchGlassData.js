import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetGlassData = async () => {
    const token = localStorage.getItem('user')
    try {
        const result = await axios.get(`${url}/glass`, {
            headers: {
                Authorization: token,
                "Accepts": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        return result?.data;
    } catch (error) {
        return error
    }
}
export const fetchPostGlassData = async (data) => {
    const token = localStorage.getItem('user')
    try {
        const result = await axios.post(`${url}/glass/create-glassType`, data, {
            headers: {
                Authorization: token,
                "Accepts": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        return result;
    } catch (error) {
        return error
    }
}


export const fetchDeleteGlassData = async (id) => {
    try {
        const result = await axios.delete(`${url}/glass/${id}`)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}




