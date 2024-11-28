
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateAccountsData } from "../fetchedData/fetchAccountsData";


const useUpdateAccountsData = (refetch, setUdpateAccountsData, initialAccountsData, setEdit) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateAccountsData'],
        mutationFn: (data) => fetchUpdateAccountsData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateAccountsData(initialAccountsData)
                setEdit('')
                refetch()
                toast.success("Expense Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateAccountsData;