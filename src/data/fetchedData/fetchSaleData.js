import axios from "axios"

const url = import.meta.env.VITE_DATA_URL;

export const fetchGetSaleData = async () => {
    try {
        const token = localStorage.getItem('user')

        const result = await axios.get(`${url}/sales/`, {
            headers: {
                Authorization: token
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
// export const fetchUpdateProductData = async (id, data, refetch, toast) => {
//     try {
//         const result = await axios.patch(`${url}/products/${id}`, data)
//         toast.success('product updated successfully')
//         refetch
//         return result;
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }
// export const fetchDeleteProductData = async (ids, refetch, toast) => {
//     try {
//         const result = await axios.post(`${url}/products/bulk-delete`, ids)
//         toast.success('product deleted successfully')
//         refetch
//         return result;
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }


