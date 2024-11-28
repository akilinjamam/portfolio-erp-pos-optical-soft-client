
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchDeleteAccountsData } from "../fetchedData/fetchAccountsData";


const useDeleteAccountsData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeleteAccountsData'],
        mutationFn: (data) => fetchDeleteAccountsData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("Expense deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useDeleteAccountsData;