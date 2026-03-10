
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchDeleteBranchData } from "../fetchedData/fetchGetBranchData";


const useDeleteBranchData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const deleteBranchData = useMutation({
        queryKey: ['fetchDeleteBranchData'],
        mutationFn: (data) => fetchDeleteBranchData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("Branch deleted Successfully")
            }
        },
        onError: (error) => {
            toast.error(error.errorMessage)
        }
    })

    return deleteBranchData
};

export default useDeleteBranchData;