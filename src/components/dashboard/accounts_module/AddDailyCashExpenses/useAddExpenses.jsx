/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import usePostCreateAccounts from "../../../../data/accountsData/usePostCreateAccountsData";
import useGetDueCollectionSaleData from "../../../../data/saleData/useGetDueCollectionSaleData";
import useGetLastSaleForAddExpenses from "../../../../data/accountsData/useGetLastSaleForAddExpenses";
import useGetLastSalesAndAccountsData from "../../../../data/accountsData/useGetLastSalesAccountsData";

const useAddExpenses = () => {
    
    const [inInput, setInInput] = useState(false);
    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
   
    const [uploading, setUploading] = useState(false);

    

    
    
    const initialExpensesData = {
        expenseName: '',
        expenseAmount: ''
    }
    const initialOtherExpensesData = {
        date: '',
        startingCashReserved: '',
        endingCashReserved: '',
        deficit: '',
        cashOver: ''
    }
    const [expensesData, setExpensesData] = useState(initialExpensesData);
    const [otherExpensesData, setOtherExpensesData] = useState(initialOtherExpensesData)
    
    const {lastSaleAndAccountsData, refetch} = useGetLastSaleForAddExpenses(otherExpensesData.date);
    const {totalBankPaidValue, totalBkashPaidValue, totalNogodPaidValue, refetch:refetchSale} = useGetLastSalesAndAccountsData(otherExpensesData.date)
    const {dueCollectionSaleData, refetch:refetchDue} = useGetDueCollectionSaleData(otherExpensesData.date)
    
    
    useEffect(() => {
        refetch()
        refetchDue()
        refetchSale()
        otherExpensesData.date
    },[otherExpensesData, refetch])
    
    
    console.log(totalBankPaidValue + Number(dueCollectionSaleData?.result?.dueBankPaidValue), totalBkashPaidValue + Number(dueCollectionSaleData?.result?.dueBkashPaidValue), totalNogodPaidValue + Number(dueCollectionSaleData?.result?.dueNogodPaidValue))
    console.log(Number(dueCollectionSaleData?.result?.dueBankPaidValue))
    console.log(Number(dueCollectionSaleData?.result?.dueBkashPaidValue))

    const todayBankValue = totalBankPaidValue + Number(dueCollectionSaleData?.result?.dueBankPaidValue)
    const todayBkashValue = totalBkashPaidValue + Number(dueCollectionSaleData?.result?.dueBkashPaidValue)
    const todayNogodValue = totalNogodPaidValue + Number(dueCollectionSaleData?.result?.dueNogodPaidValue)

    const findSupplier = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findSupplier) {
            setExpensesData(findSupplier)
        }
    }, [setExpensesData, findSupplier])


    const editProduct = (e) => {
        let modifiedData = { ...expensesData }
        e.preventDefault();
        setEdit(false)
        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? modifiedData : product
        }))
        setExpensesData(initialExpensesData)
       
    }

    useEffect(() => {

        const handleExpenseList = (e) => {
            if(!inInput){
                if(e.key === 'l' || e.key === 'L'){
                    const allData = {
                        ...expensesData
                    }
                    if(expensesData?.expenseAmount && expensesData?.expenseName ){
                        setShowData((prevData) => [...prevData, allData]);
                        setExpensesData(initialExpensesData)
                    }else{
                        toast.error('please fillup Expense Name and Expense Amount input ')
                    }
                }
            }
        }


        document.addEventListener('keydown', handleExpenseList);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleExpenseList);
        };
    })

    const handleSubmit = (e) => {
        const allData = {
            ...expensesData
        }
        e.preventDefault();
        setShowData((prevData) => [...prevData, allData]);
        setExpensesData(initialExpensesData)  
    }

    const {mutate:postAccountsData, isSuccess, isError, isPending} = usePostCreateAccounts(refetch)

    const dueSales = dueCollectionSaleData?.result?.dueCashPaidValue ? dueCollectionSaleData?.result?.dueCashPaidValue : '0';
    
    console.log(otherExpensesData?.startingCashReserved)
    const handlePost = async () => {

        if(!otherExpensesData?.date){
            toast.error('please provide date')
            return
        }
        if(!otherExpensesData?.endingCashReserved){
            toast.error('please provide ending cash reserved')
            return
        }
        let calculateSalesWithStartingCashReserved;
        if(Number(otherExpensesData?.startingCashReserved) > 0) {
            calculateSalesWithStartingCashReserved = Number(otherExpensesData?.startingCashReserved) + Number(lastSaleAndAccountsData?.result?.totalSales)
        }else{
            calculateSalesWithStartingCashReserved = Number(lastSaleAndAccountsData?.result?.total);
        }

        
        console.log(Number(calculateSalesWithStartingCashReserved))

        if ( Number(otherExpensesData?.endingCashReserved) >  calculateSalesWithStartingCashReserved){
            toast.error('ending cash reserved amount can not be more than total sales')
            return
        }

        
        if(showData?.length === 0){
            toast.error('please provide expenses')
            return
        }

        const totalExpenseValue = showData?.map(expense => Number(expense.expenseAmount));
        
        const calculatetotalExpenses = calculateTotalPrice(totalExpenseValue)
        console.log(calculatetotalExpenses);

        if(calculatetotalExpenses > calculateSalesWithStartingCashReserved){
            toast.error('total expense amount can not be more than total sales')
            return
        }

        if( (calculatetotalExpenses + Number(otherExpensesData?.endingCashReserved)) > calculateSalesWithStartingCashReserved){
            toast.error('sum of total expense and ending Cash Reserved amount can not be more than total sales')
            return
        }

      
        const accountsData = {
            ...otherExpensesData, 
            startingCashReserved: otherExpensesData?.startingCashReserved === '' ? '0' : otherExpensesData?.startingCashReserved,
            deficit: otherExpensesData?.deficit === '' ? '0' : otherExpensesData?.deficit,
            cashOver: otherExpensesData?.cashOver === '' ? '0' : otherExpensesData?.cashOver,
            dueSalesAmount: dueSales,
            expenses: showData,
            todayBankValue,
            todayBkashValue,
            todayNogodValue
        };
        console.log(accountsData);

        if(!isPending){
            postAccountsData(accountsData)
        }
    }

    useEffect(() => {
        if(isSuccess){
            setShowData([])
            setExpensesData(initialExpensesData)
            setOtherExpensesData(initialOtherExpensesData)
        }
    
        if(isError){
            toast.error(`something went wrong`)
        }
    },[isSuccess,isError])

    return {otherExpensesData, setOtherExpensesData ,expensesData, setExpensesData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct,  handleSubmit, initialExpensesData, initialOtherExpensesData, findSupplier, uploading, setUploading, handlePost, lastSaleAndAccountsData, dueSales, setInInput,  isPending }
};


export default useAddExpenses;