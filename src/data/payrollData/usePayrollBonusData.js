
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostPayrollBonusData } from "../fetchedData/fetchPayrollData";


const usePostPayrollBonusData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostPayrollBonusData'],
        mutationFn: (data) => fetchPostPayrollBonusData(data),
        onSuccess: (data) => {
            console.log(data)
            if (data?.data?.success) {
                refetch()
                toast.success('Bonus added successfully')
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

export default usePostPayrollBonusData;