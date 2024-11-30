import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostFinalAccountsData } from "../fetchedData/fetchAccountsData";


const usePostFinalAccountsData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostFinalAccountsData'],
        mutationFn: (data) => fetchPostFinalAccountsData(data),
        onSuccess: (data) => {
            console.log(data)
            refetch()
            toast.success("Fixed Expense Accounts Created Successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default usePostFinalAccountsData;