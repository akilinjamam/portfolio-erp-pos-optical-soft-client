import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
const token = localStorage.getItem("user");
export const fetchGetBranchData = async () => {
    try {
        const result = await axios.get(`${url}/branch`)
        return result?.data;
    } catch (error) {
        throw error?.response?.data?.message
    }
}
export const fetchPostBranchData = async (data) => {
    try {
        const result = await axios.post(`${url}/branch/create-branch`, data, {
            headers: {
                Authorization: token,
                "Accepts": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        return result?.data;
    } catch (error) {
        throw error?.response?.data
    }
}

export const fetchUpdateBranchData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/branch/${id}`, data)
        return result;
    } catch (error) {
        return error
    }
}

export const fetchDeleteBranchData = async (ids) => {
    try {
        const result = await axios.post(`${url}/branch/bulk-delete`, ids)

        return result;
    } catch (error) {
        console.log(error)
        throw error?.response?.data
    }
}
