import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetSaleData = async () => {
    try {
        const token = localStorage.getItem('user')

        const result = await axios.get(`${url}/sales/`, {
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
export const fetchPostSaleData = async (data) => {
    try {
        const result = await axios.post(`${url}/sales/create-sale`, data)
        return result;
    } catch (error) {
        return error
    }
}




