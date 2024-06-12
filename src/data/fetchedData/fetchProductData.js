import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchGetProductData = async (query) => {
    try {
        const token = localStorage.getItem('user')
        const value = query ? query : ''
        const result = await axios.get(`${url}/products?searchTerm=${value}`, {
            headers: {
                Authorization: token
            }
        })
        return result?.data;
    } catch (error) {
        return error
    }
}
export const fetchPostProductData = async (data) => {
    try {

        const result = await axios.post(`${url}/products/create-product`, data)
        return result;
    } catch (error) {

        return error
    }
}
export const fetchUpdateProductData = async (id, data, refetch, toast) => {
    try {
        const result = await axios.patch(`${url}/products/${id}`, data)
        toast.success('product updated successfully')
        refetch()
        return result;
    } catch (error) {
        return error
    }
}


