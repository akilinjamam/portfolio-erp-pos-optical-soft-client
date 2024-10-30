
import { useMutation } from "@tanstack/react-query";
import { fetchUpdateEmployeeData } from "../fetchedData/fetchEmployeeDate";
import { toast } from "react-toastify";


const useUpdateEmployeeData = (refetch, setUdpateEmployeeData, initialEmployeeData, setImgHolder, setEdit) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateEmplyeeData'],
        mutationFn: (data) => fetchUpdateEmployeeData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateEmployeeData(initialEmployeeData)
                setEdit('')
                setImgHolder('')
                refetch()
                toast.success("Employee Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateEmployeeData;