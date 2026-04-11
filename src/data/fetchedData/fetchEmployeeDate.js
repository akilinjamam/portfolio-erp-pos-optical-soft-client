import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetEmployeeData = async (query, from, to, page, limit) => {
    try {
        const token = localStorage.getItem('user')

        const value = query ? query : '';
        const fromSalary = from ? from : '';
        const toSalary = to ? to : '';

        const result = await axios.get(`${url}/employees?searchTerm=${value}&from=${fromSalary}&to=${toSalary}&page=${page}&limit=${limit}`, {
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
    const thisToken = localStorage.getItem('user')
    try {
        const result = await axios.post(`${url}/employees/create-employee`, data, {
            headers: {
                Authorization: thisToken,
                "Accepts": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        return result;
    } catch (error) {
        throw error?.response?.data;
    }
}

export const fetchUpdateEmployeeData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/employees/${id}`, data)
        return result;
    } catch (error) {
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




