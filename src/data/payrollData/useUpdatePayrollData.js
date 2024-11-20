
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { fetchUpdatePayrollData } from "../fetchedData/fetchPayrollData";


const useUpdatePayrollData = (refetch, setUdpateEmployeeData, initialEmployeeData, setEdit) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdatePayrollData'],
        mutationFn: (data) => fetchUpdatePayrollData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateEmployeeData(initialEmployeeData)
                setEdit('')
                refetch()
                toast.success("payroll Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdatePayrollData;