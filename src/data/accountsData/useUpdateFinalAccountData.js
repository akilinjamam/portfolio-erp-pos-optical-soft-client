
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateFinalAccountsData } from "../fetchedData/fetchAccountsData";


const useUpdateFinalAccountsData = (refetch, setUdpateAccountsData, initialAccountsData, setEdit) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateFinalAccountsData'],
        mutationFn: (data) => fetchUpdateFinalAccountsData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateAccountsData(initialAccountsData)
                setEdit('')
                refetch()
                toast.success("Fixed Expense Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateFinalAccountsData;