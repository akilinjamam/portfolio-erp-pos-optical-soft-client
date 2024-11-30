import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchGetProductData = async (query, from, to, priceFrom, priceTo) => {
    try {
        const token = localStorage.getItem('user')
        const value = query ? query : '';
        const fromDate = from ? from : '';
        const toDate = to ? to : '';
        const fromPrice = priceFrom ? priceFrom : '';
        const toPrice = priceTo ? priceTo : '';

        const result = await axios.get(`${url}/products?searchTerm=${value}&from=${fromDate}&to=${toDate}&priceFrom=${fromPrice}&priceTo=${toPrice}`, {
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
export const fetchGetGlassProductData = async (query, from, to, priceFrom, priceTo) => {
    try {
        const token = localStorage.getItem('user')
        const value = query ? query : '';
        const fromDate = from ? from : '';
        const toDate = to ? to : '';
        const fromPrice = priceFrom ? priceFrom : '';
        const toPrice = priceTo ? priceTo : '';

        const result = await axios.get(`${url}/products/glass?searchTerm=${value}&from=${fromDate}&to=${toDate}&priceFrom=${fromPrice}&priceTo=${toPrice}`, {
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
export const fetchPostProductData = async (data) => {
    try {

        const result = await axios.post(`${url}/products/create-product`, data)
        return result;
    } catch (error) {

        return error
    }
}
export const fetchUpdateProductData = async (id, data, refetch, toast, setUdpateProductData, initialProductData) => {
    try {
        const result = await axios.patch(`${url}/products/${id}`, data)
        refetch
        if (result?.data?.success) {
            setUdpateProductData(initialProductData)
            toast.success('product updated successfully')
        }
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchDeleteProductData = async (ids, refetch, toast) => {
    try {
        const result = await axios.post(`${url}/products/bulk-delete`, ids)
        toast.success('product deleted successfully')
        refetch
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}


