import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetSingleVendorData = async (id) => {
    try {
        const token = localStorage.getItem('user')

        const result = await axios.get(`${url}/vendors/get-last-vendor/${id}`, {
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
export const fetchPostVendorData = async (data) => {
    try {
        const result = await axios.post(`${url}/vendors/create-vendor`, data)
        return result;
    } catch (error) {
        return error.response?.data?.errorMessage
    }
}
export const fetchPostVendorBillData = async (data) => {
    try {
        const result = await axios.post(`${url}/vendors/create-vendor-bill`, data)
        return result;
    } catch (error) {
        return error.response?.data?.errorMessage
    }
}

export const fetchgetVendorData = async (supplierId, year, month) => {
    try {
        const token = localStorage.getItem('user')
        const givenSupplierId = supplierId ? supplierId : '';
        const givenYear = year ? year : '';
        const givenMonth = month ? month : '';

        const result = await axios.get(`${url}/vendors?supplierName=${givenSupplierId}&year=${givenYear}&month=${givenMonth}`, {
            headers: {
                Authorization: token,
                "Accepts": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchGetVendorBillData = async (supplierId, year, month) => {
    try {
        const token = localStorage.getItem('user')
        const givenSupplierId = supplierId ? supplierId : '';
        const givenYear = year ? year : '';
        const givenMonth = month ? month : '';

        const result = await axios.get(`${url}/vendors/get-vendor-bill?supplierName=${givenSupplierId}&year=${givenYear}&month=${givenMonth}`, {
            headers: {
                Authorization: token,
                "Accepts": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchDeleteVendorData = async (ids) => {
    try {
        const result = await axios.post(`${url}/vendors/bulk-delete`, ids)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}


export const fetchUpdateVendorData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/vendors/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}




