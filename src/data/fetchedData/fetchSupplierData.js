import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetSupplierData = async (query) => {
    try {
        const token = localStorage.getItem('user')

        const value = query ? query : '';

        const result = await axios.get(`${url}/suppliers?searchTerm=${value}`, {
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
export const fetchPostSupplierData = async (data) => {
    try {
        const result = await axios.post(`${url}/suppliers/create-supplier`, data)
        return result;
    } catch (error) {
        return error
    }
}

export const fetchUpdateSupplierData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/suppliers/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchDeleteSupplierData = async (ids) => {
    try {
        const result = await axios.post(`${url}/suppliers/bulk-delete`, ids)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}




