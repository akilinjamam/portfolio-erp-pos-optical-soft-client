import { useEffect, useState } from "react";
import useGetAllVendorData from "../../../../data/vendorData/useGetVendorData";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import useUpdateVendorData from "../../../../data/vendorData/useUpdateVendorData";
import useDeleteVendorData from "../../../../data/vendorData/useDeleteVendorData";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import useHome from "../../home/useHome";


const useVendorList = () => {

    const {location} = useHome()
    const [query, setQuery] = useState('');
    const [employeeId, setEmployeeId] = useState('')
    const [range, setRange] = useState({
        from: '',
        to: '',
    })

    const [month, setMonth] = useState('')


    const splitedMonthValue = month.split('-');
    const splitedYear = splitedMonthValue[0]
    const splitedMonth = splitedMonthValue[1]

    const queryValues = {
        supplierName: employeeId,
        year: splitedYear,
        month: splitedMonth
    }

    console.log(queryValues?.month, queryValues?.year, employeeId )

    const { supplierData, refetch, isLoading } = useGetSupplierData(query, range.from, range.to)

    const { payroll, refetch: payrollRefetch } = useGetAllVendorData(queryValues.supplierName, queryValues.year, queryValues.month)

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
        billingDate: '',
        paymentDate: '',
        billNo: '',
        billAmount: '',
        transectionId: '',
    }


    const [updateEmployeeData, setUdpateEmployeeData] = useState(initialEmployeeData);


    const findPayrollList = allPayrollData?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateEmployeeData(findPayrollList || '')
    }, [findPayrollList])

    const { mutate: editPayrollData } = useUpdateVendorData(payrollRefetch, setUdpateEmployeeData, initialEmployeeData, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()

        const updatedData = {
            paid: updateEmployeeData?.paid,
            billingDate: updateEmployeeData?.billingDate,
            paymentDate: updateEmployeeData?.paymentDate,
            billNo: updateEmployeeData?.billNo,
            billAmount: updateEmployeeData?.billAmount,
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

    const { mutate: deleteEmployees } = useDeleteVendorData(payrollRefetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteEmployees(idsForDelete)
    }

    const totalPaid = calculateTotalPrice(modifiedEmployeeDataWithIndexId?.map(data => Number(data?.paid)));

    return { supplierData, allPayrollData, isLoading, updateEmployeeData, setUdpateEmployeeData, initialEmployeeData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, fullScr, setFullScr, modifiedEmployeeDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange, setMonth, setEmployeeId, totalPaid, location }
};
export default useVendorList;