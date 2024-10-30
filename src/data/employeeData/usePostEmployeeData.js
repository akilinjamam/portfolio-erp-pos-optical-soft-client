
import { useMutation } from "@tanstack/react-query";
import { fetchPostEmployeeData } from "../fetchedData/fetchEmployeeDate";
import { toast } from "react-toastify";


const usePostEmployeeData = () => {
    const postAllData = useMutation({
        queryKey: ['fetchPostEmplyeeData'],
        mutationFn: (data) => fetchPostEmployeeData(data),
        onSuccess: (data) => {
            console.log(data)
            toast.success("Employee Created Successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default usePostEmployeeData;