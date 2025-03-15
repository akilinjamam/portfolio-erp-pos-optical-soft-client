import { useEffect, useState } from "react";
import useGetEmployeeData from "../../../../data/employeeData/useGetEmployeeData";
import useGetAllPayrollData from "../../../../data/payrollData/useGetPayrollData";
import useUpdatePayrollData from "../../../../data/payrollData/useUpdatePayrollData";
import useDeletePayrollData from "../../../../data/payrollData/useDeletePayrollData";
import { calculateTotalPrice } from "../../../calculation/calculateSum";


const usePayrollList = () => {

    const [query, setQuery] = useState('');
    const [employeeId, setEmployeeId] = useState('')
    const [range, setRange] = useState({
        from: '',
        to: '',
    })

    const currentDate = new Date();
    const currentMonth = (currentDate?.getMonth() + 1)?.toString()?.padStart(2, '0');
    const currentYear = currentDate?.getFullYear();
    const currentYearMonth = `${currentYear}-${currentMonth}`

    const [month, setMonth] = useState(currentYearMonth)


    const splitedMonthValue = month.split('-');
    const splitedYear = splitedMonthValue[0]
    const splitedMonth = splitedMonthValue[1]

    const queryValues = {
        employeeName: employeeId,
        year: splitedYear,
        month: splitedMonth
    }



    const { employeeData, refetch, isLoading } = useGetEmployeeData(query, range.from, range.to)

    const { payroll, refetch: payrollRefetch } = useGetAllPayrollData(queryValues.employeeName, queryValues.year, queryValues.month)

    const allPayrollData = payroll?.data?.result

    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedEmployeeDataWithIndexId, setModifiedEmployeeDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars

    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');


    const [fullScr, setFullScr] = useState(false)
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);

    const initialEmployeeData = {
        paid: '',
        date: '',
        advance: '',
        incentive: '',
        overtime: '',
        transectionId: '',
    }


    const [updateEmployeeData, setUdpateEmployeeData] = useState(initialEmployeeData);


    const findPayrollList = allPayrollData?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateEmployeeData(findPayrollList || '')
    }, [findPayrollList])

    const { mutate: editPayrollData } = useUpdatePayrollData(payrollRefetch, setUdpateEmployeeData, initialEmployeeData, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()

        const updatedData = {
            paid: updateEmployeeData?.paid,
            date: updateEmployeeData?.date,
            advance: updateEmployeeData?.advance,
            incentive: updateEmployeeData?.incentive,
            overtime: updateEmployeeData?.overtime,
            transectionId: updateEmployeeData?.transectionId,

        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editPayrollData(finalUpdatedData)
    }


    useEffect(() => {
        const employeesAddedWithIndexId = allPayrollData?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedEmployeeDataWithIndexId(employeesAddedWithIndexId)
    }, [allPayrollData])

    useEffect(() => {
        refetch()
    }, [refetch, query, range])

    useEffect(() => {
        payrollRefetch()
    }, [payrollRefetch, employeeId, queryValues?.employeeName, queryValues?.month, queryValues?.year])

    const { mutate: deleteEmployees } = useDeletePayrollData(payrollRefetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteEmployees(idsForDelete)
    }


    const paidAmount = calculateTotalPrice(modifiedEmployeeDataWithIndexId?.map(data => Number(data?.paid)));
    const totalIncentive = calculateTotalPrice(modifiedEmployeeDataWithIndexId?.map(data => Number(data?.incentive)));
    const totalOvertime = calculateTotalPrice(modifiedEmployeeDataWithIndexId?.map(data => Number(data?.overtime)));
    const totalPaid = paidAmount + totalIncentive + totalOvertime;

    return { employeeData, allPayrollData, isLoading, updateEmployeeData, setUdpateEmployeeData, initialEmployeeData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, fullScr, setFullScr, modifiedEmployeeDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange, setMonth, setEmployeeId, paidAmount, totalIncentive, totalOvertime, totalPaid, currentYearMonth, month }
};
export default usePayrollList;