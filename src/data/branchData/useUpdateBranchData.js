
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateBranchData } from "../fetchedData/fetchGetBranchData";


const useUpdateBranchData = (refetch, setUdpateBranchData, initialBranchData, setImgHolder, setEdit) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateBranchData'],
        mutationFn: (data) => fetchUpdateBranchData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateBranchData(initialBranchData)
                setEdit('')
                setImgHolder('')
                refetch()
                toast.success("Branch Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateBranchData;