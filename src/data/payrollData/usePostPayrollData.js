
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostPayrollData } from "../fetchedData/fetchPayrollData";


const usePostPayrollData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostPayrollData'],
        mutationFn: (data) => fetchPostPayrollData(data),
        onSuccess: (data) => {
            console.log(data)
            if (data?.data?.success) {
                refetch()
                toast.success('Salary added successfully')
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

export default usePostPayrollData;