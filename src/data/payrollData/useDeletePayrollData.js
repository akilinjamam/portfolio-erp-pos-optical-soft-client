
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchDeletePayrollData } from "../fetchedData/fetchPayrollData";


const useDeletePayrollData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeletePayrollData'],
        mutationFn: (data) => fetchDeletePayrollData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("Payroll deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useDeletePayrollData;