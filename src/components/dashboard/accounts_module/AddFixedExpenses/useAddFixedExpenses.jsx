/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetProfitExpenseAccountsData from "../../../../data/accountsData/useGetProfitExpenseAccountsData";
import usePostFinalAccountsData from "../../../../data/accountsData/usePostFinalAccountsData";

const useAddFixedExpenses = () => {
    const [inInput, setInInput] = useState(false);
    console.log(inInput)
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
        extraProfitAmount: ''
    }
    const [expensesData, setExpensesData] = useState(initialExpensesData);
    const [otherExpensesData, setOtherExpensesData] = useState(initialOtherExpensesData)
    
    

    const {profitExpenseData, refetch } = useGetProfitExpenseAccountsData();




   
    useEffect(() => {
    otherExpensesData.date
    },[otherExpensesData])



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

    const {mutate:postFinalAccountsData, isSuccess, isError} = usePostFinalAccountsData(refetch)

      
    const handlePost = async () => {

        if(!otherExpensesData?.date){
            toast.error('please give date')
            return
        }

        
        const accountsData = {
            ...otherExpensesData,
            extraProfitAmount: otherExpensesData?.extraProfitAmount === '' ? '0' : otherExpensesData?.extraProfitAmount,
           expenses:showData
        };

        console.log(accountsData);

        postFinalAccountsData(accountsData)
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

    return {otherExpensesData, setOtherExpensesData ,expensesData, setExpensesData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct,  handleSubmit, initialExpensesData, initialOtherExpensesData, findSupplier, uploading, setUploading, handlePost, profitExpenseData, setInInput }
};


export default useAddFixedExpenses;