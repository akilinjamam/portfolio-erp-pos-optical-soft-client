
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostVendorData } from "../fetchedData/fetchVendorData";


const usePostVendorData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostVendorData'],
        mutationFn: (data) => fetchPostVendorData(data),
        onSuccess: (data) => {
            console.log(data)
            if (data?.data?.success) {
                refetch()
                toast.success('Vendor added successfully')
            } else {
                toast.error(data)
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.errorMessage)
        }
    })

    return postAllData
};

export default usePostVendorData;