import { useEffect, useState } from "react";
import useGetFinalAccountsData from "../../../../data/accountsData/useGetFinalAccountsDtaa";
import useUpdateFinalAccountsData from "../../../../data/accountsData/useUpdateFinalAccountData";
import useDeleteFinalAccountsData from "../../../../data/accountsData/useDeleteFinalAccountsData";
import useCurrentDate from "../../../../data/saleData/useCurrentDate";


const useProfitExpenseList = () => {
    const {todayMonth } = useCurrentDate()
    const [date, setDate] = useState(todayMonth);
    
    const year = date?.split('-')?.[0]
    const month = date?.split('-')?.[1]
    
    const {finalAccountsData, refetch, isLoading} = useGetFinalAccountsData(year, month)
    
    
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedEmployeeDataWithIndexId, setModifiedEmployeeDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
   
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);
   
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);

    const initialEmployeeData = {
        totalProfit: '',
        extraProfitAmount: '',
        date: '',
        totalExpense: '',
        profitAllocation: ''
    }


    const [updateEmployeeData, setUdpateEmployeeData] = useState(initialEmployeeData);
    const findEmployeeList = finalAccountsData?.result?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateEmployeeData(findEmployeeList || '')
    }, [findEmployeeList])

    const {mutate: editFinalAccounts} = useUpdateFinalAccountsData(refetch, setUdpateEmployeeData, initialEmployeeData, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()
       
        const updatedData = {
            totalProfit: updateEmployeeData?.totalProfit,
            extraProfitAmount: updateEmployeeData?.extraProfitAmount,
            date: updateEmployeeData?.date,
            totalExpense: updateEmployeeData?.totalExpense,
            profitAllocation: updateEmployeeData?.profitAllocation,
        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editFinalAccounts(finalUpdatedData)
        console.log(updatedData)
    }
    

    useEffect(() => {
        const finalAccountsAddedWithIndexId = finalAccountsData?.result?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedEmployeeDataWithIndexId(finalAccountsAddedWithIndexId)
    }, [finalAccountsData?.result])

    useEffect(() => {
        refetch()
    }, [refetch, date])

    const {mutate:deleteFinalAccounts} = useDeleteFinalAccountsData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteFinalAccounts(idsForDelete)
    }

    return { finalAccountsData, isLoading, updateEmployeeData, setUdpateEmployeeData, initialEmployeeData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, modifiedEmployeeDataWithIndexId,  selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, date, setDate}
};
export default useProfitExpenseList;