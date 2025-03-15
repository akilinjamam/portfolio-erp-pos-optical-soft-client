import axios from "axios"
const url = import.meta.env.VITE_DATA_URL;
export const fetchGetSinglePayrollData = async (id) => {
    try {
        const token = localStorage.getItem('user')

        const result = await axios.get(`${url}/payroll/${id}`, {
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
export const fetchPostPayrollData = async (data) => {
    try {
        const result = await axios.post(`${url}/payroll/create-payroll`, data)
        return result;
    } catch (error) {
        return error.response?.data?.errorMessage
    }
}
export const fetchPostPayrollBonusData = async (data) => {
    try {
        const result = await axios.post(`${url}/payroll/create-payroll-bonus`, data)
        return result;
    } catch (error) {
        return error.response?.data?.errorMessage
    }
}

export const fetchgetPayrollData = async (employeeId, year, month) => {
    try {
        const token = localStorage.getItem('user')
        const givenEmployeeId = employeeId ? employeeId : '';
        const givenYear = year ? year : '';
        const givenMonth = month ? month : '';

        const result = await axios.get(`${url}/payroll?employeeName=${givenEmployeeId}&year=${givenYear}&month=${givenMonth}`, {
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
export const fetchDeletePayrollData = async (ids) => {
    try {
        const result = await axios.post(`${url}/payroll/bulk-delete`, ids)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}


export const fetchUpdatePayrollData = async (id, data) => {
    try {
        const result = await axios.patch(`${url}/payroll/${id}`, data)
        return result;
    } catch (error) {
        console.log(error)
        return error
    }
}




