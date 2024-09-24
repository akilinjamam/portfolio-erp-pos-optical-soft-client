import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetSaleData = async (query, from, to) => {
    try {
        const token = localStorage.getItem('user')
        const value = query ? query : '';
        const fromDate = from ? from : '';
        const toDate = to ? to : '';
        console.log(value)
        const result = await axios.get(`${url}/sales?searchTerm=${value}&from=${fromDate}&to=${toDate}`, {
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




