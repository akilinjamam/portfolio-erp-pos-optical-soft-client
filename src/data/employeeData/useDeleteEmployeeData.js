
import { useMutation } from "@tanstack/react-query";
import { fetchDeleteEmployeeData } from "../fetchedData/fetchEmployeeDate";
import { toast } from "react-toastify";


const useDeleteEmployeeData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeleteEmplyeeData'],
        mutationFn: (data) => fetchDeleteEmployeeData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("Employees deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useDeleteEmployeeData;