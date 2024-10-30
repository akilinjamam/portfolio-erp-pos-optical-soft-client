import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetEmployeeData = async () => {
    try {
        const token = localStorage.getItem('user')
        const result = await axios.get(`${url}/employees`, {
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
export const fetchPostEmployeeData = async (data) => {
    try {
        const result = await axios.post(`${url}/employees/create-employee`, data)
        return result;
    } catch (error) {
        return error
    }
}

export const fetchUpdateEmployeeData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/employees/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchDeleteEmployeeData = async (ids) => {
    try {
        const result = await axios.post(`${url}/employees/bulk-delete`, ids)

        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}




