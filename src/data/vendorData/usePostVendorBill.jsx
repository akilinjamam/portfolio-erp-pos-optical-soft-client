
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostVendorBillData } from "../fetchedData/fetchVendorData";


const usePostVendorBillData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostVendorBillData'],
        mutationFn: (data) => fetchPostVendorBillData(data),
        onSuccess: (data) => {
            console.log(data)
            if (data?.data?.success) {
                refetch()
                toast.success('Vendor bill added successfully')
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

export default usePostVendorBillData;