import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostAccountsData } from "../fetchedData/fetchAccountsData";


const usePostCreateAccounts = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostCreateAccounts'],
        mutationFn: (data) => fetchPostAccountsData(data),
        onSuccess: (data) => {
            console.log(data)
            refetch()
            toast.success("Daily Expense Accounts Created Successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default usePostCreateAccounts;