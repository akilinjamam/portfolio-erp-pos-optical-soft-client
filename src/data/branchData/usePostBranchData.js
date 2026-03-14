
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostBranchData } from "../fetchedData/fetchGetBranchData";


const usePostBranchData = () => {
    const postAllData = useMutation({
        queryKey: ['fetchPostBranchData'],
        mutationFn: (data) => fetchPostBranchData(data),
        onSuccess: (data) => {
            console.log(data)
            toast.success("branch Created Successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error?.message)
        }
    })

    return postAllData
};

export default usePostBranchData;