import axios from "axios";
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetLastSaleAndAccountsData = async (date) => {
    try {
        const token = localStorage.getItem('user')

        const valueDate = date ? date : '';

        const result = await axios.get(`${url}/accounts/get-sale-lastAccount?date=${valueDate}`, {
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
export const fetchGetLastSaleForAddExpenses = async (date) => {
    try {
        const token = localStorage.getItem('user')

        const valueDate = date ? date : '';

        const result = await axios.get(`${url}/accounts/get-today-sales-for-add-expenses?date=${valueDate}`, {
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
export const fetchGetFinalAccountsData = async (year, month) => {
    try {
        const token = localStorage.getItem('user')

        const valueYear = year ? year : '';
        const valueMonth = month ? month : '';


        const result = await axios.get(`${url}/finalAccounts?year=${valueYear}&month=${valueMonth}`, {
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
export const fetchGetFinalProfitExpenseAccountsData = async () => {
    try {
        const token = localStorage.getItem('user')
        const result = await axios.get(`${url}/accounts/get-accounts-monthly-profit-expenses`, {
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

export const fetchGetAccountsData = async (year, month) => {
    try {
        const token = localStorage.getItem('user')

        const valueYear = year ? year : '';
        const valueMonth = month ? month : '';

        const result = await axios.get(`${url}/accounts/get-accounts-with-year-month?year=${valueYear}&month=${valueMonth}`, {
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


export const fetchPostAccountsData = async (data) => {
    try {
        const result = await axios.post(`${url}/accounts/create-account`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchPostFinalAccountsData = async (data) => {
    try {
        const result = await axios.post(`${url}/finalAccounts/create-final-account`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}


export const fetchUpdateAccountsData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/accounts/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchUpdateFinalAccountsData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/finalAccounts/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchDeleteAccountsData = async (ids) => {
    try {
        const result = await axios.post(`${url}/accounts/bulk-delete`, ids)

        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchDeleteFinalAccountsData = async (ids) => {
    try {
        const result = await axios.post(`${url}/finalAccounts/bulk-delete`, ids)

        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}