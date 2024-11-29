/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetLastSalesAndAccountsData from "../../../../data/accountsData/useGetLastSalesAccountsData";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import usePostCreateAccounts from "../../../../data/accountsData/usePostCreateAccountsData";
import useGetDueCollectionSaleData from "../../../../data/saleData/useGetDueCollectionSaleData";

const useAddExpenses = () => {
    
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
        endingCashReserved: ''
    }
    const [expensesData, setExpensesData] = useState(initialExpensesData);
    const [otherExpensesData, setOtherExpensesData] = useState(initialOtherExpensesData)
    
    const {lastSaleAndAccountsData, refetch} = useGetLastSalesAndAccountsData(otherExpensesData.date);

    const {dueCollectionSaleData} = useGetDueCollectionSaleData(otherExpensesData.date)

    console.log(dueCollectionSaleData?.result?.totalPaidDueCollection);

   

    useEffect(() => {
        refetch()
        otherExpensesData.date
    },[otherExpensesData, refetch])



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

    const {mutate:postAccountsData, isSuccess, isError} = usePostCreateAccounts(refetch)

      const dueSales = dueCollectionSaleData?.result?.totalPaidDueCollection ? dueCollectionSaleData?.result?.totalPaidDueCollection : '0'
        console.log(dueSales);
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
            deficit: '0',
            dueSalesAmount: dueSales,
            expenses: showData
        };

        postAccountsData(accountsData)
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

    return {otherExpensesData, setOtherExpensesData ,expensesData, setExpensesData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct,  handleSubmit, initialExpensesData, initialOtherExpensesData, findSupplier, uploading, setUploading, handlePost, lastSaleAndAccountsData, dueSales }
};


export default useAddExpenses;