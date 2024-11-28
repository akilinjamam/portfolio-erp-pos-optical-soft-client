import { useEffect, useState } from "react";
import useGetAccountsData from "../../../../data/accountsData/useGetAccountsData";
import useUpdateAccountsData from "../../../../data/accountsData/useUpdateAccountsData";
import useDeleteAccountsData from "../../../../data/accountsData/useDeleteAccountsData";


const useDailyCashExpensesList = () => {

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

   

    const { accountsData, refetch: refetch } = useGetAccountsData(queryValues.year, queryValues.month)
    const allAccountsData = accountsData?.result
    
    console.log(accountsData?.result)

    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedAccountsDataWithIndexId, setModifiedAccountsDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars

    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');


    const [fullScr, setFullScr] = useState(false)
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);

    const initialAccountsData = {
        date: ''
    }


    const [updateAccountsData, setUdpateAccountsData] = useState(initialAccountsData);


    const findPayrollList = allAccountsData?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateAccountsData(findPayrollList || '')
    }, [findPayrollList])

    const { mutate: editAccountsData } = useUpdateAccountsData(refetch, setUdpateAccountsData, initialAccountsData, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()

        const updatedData = {
            date: updateAccountsData?.date,

        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editAccountsData(finalUpdatedData)
    }


    useEffect(() => {
        const accountsAddedWithIndexId = allAccountsData?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedAccountsDataWithIndexId(accountsAddedWithIndexId)
    }, [allAccountsData])

    useEffect(() => {
        refetch()
    }, [refetch, query, range])

    useEffect(() => {
        refetch()
    }, [refetch, employeeId, queryValues?.employeeName, queryValues?.month, queryValues?.year])

    const { mutate: deleteAccounts } = useDeleteAccountsData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteAccounts(idsForDelete)
    }

    return {updateAccountsData, setUdpateAccountsData, initialAccountsData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, fullScr, setFullScr, modifiedAccountsDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange, setMonth, setEmployeeId }
};
export default useDailyCashExpensesList;