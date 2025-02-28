import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetGlassData = async () => {
    try {
        const result = await axios.get(`${url}/glass`)
        return result?.data;
    } catch (error) {
        return error
    }
}
export const fetchPostGlassData = async (data) => {
    try {
        const result = await axios.post(`${url}/glass/create-glassType`, data)
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




