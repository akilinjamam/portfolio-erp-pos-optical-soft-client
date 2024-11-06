
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchPostSupplierData } from "../fetchedData/fetchSupplierData";


const usePostSupplierData = () => {
    const postAllData = useMutation({
        queryKey: ['fetchPostSupplierData'],
        mutationFn: (data) => fetchPostSupplierData(data),
        onSuccess: (data) => {
            console.log(data)
            toast.success("Supplier Created Successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default usePostSupplierData;