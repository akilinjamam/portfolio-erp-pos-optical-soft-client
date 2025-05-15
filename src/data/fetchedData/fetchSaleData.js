import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetSaleData = async (query, from, to) => {
    try {
        const token = localStorage.getItem('user')
        const value = query ? query : '';
        const fromDate = from ? from : '';
        const toDate = to ? to : '';

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
export const fetchGetOneMonthSaleData = async (query, from, to) => {
    try {
        const token = localStorage.getItem('user')
        const value = query ? query : '';
        const fromDate = from ? from : '';
        const toDate = to ? to : '';

        const result = await axios.get(`${url}/sales/get-one-month-sales?searchTerm=${value}&from=${fromDate}&to=${toDate}`, {
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
export const fetchGetDueCollectionSaleData = async (paymentDate) => {
    try {
        const token = localStorage.getItem('user')

        const givenPaymentDate = paymentDate ? paymentDate : '';

        const result = await axios.get(`${url}/sales/get-due-collection?paymentDate=${givenPaymentDate}`, {
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


export const fetchUpdateSalesData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/sales/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchUpdateSalesInfoData = async (id, data) => {
    console.log(id);
    try {
        const result = await axios.patch(`${url}/sales/update-sales-info/${id}`, data)
        return result;
    } catch (error) {

        console.log(error)
        return error
    }
}

export const fetchDeleteSalesInfoData = async (ids) => {
    const token = localStorage.getItem('user');
    try {
        const result = await axios.post(`${url}/sales/delete-sales`, ids, {
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
export const fetchUpdateProductInfoData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/sales/update-product-info/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchCancelAdjustment = async (id) => {
    try {
        const result = await axios.patch(`${url}/sales/cancel-sales-adjustment/${id}`)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}






