
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchDeleteSupplierData } from "../fetchedData/fetchSupplierData";


const useDeleteSupplierData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeleteSupplierData'],
        mutationFn: (data) => fetchDeleteSupplierData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("Supplier deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useDeleteSupplierData;