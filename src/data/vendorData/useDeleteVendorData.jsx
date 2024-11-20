
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchDeleteVendorData } from "../fetchedData/fetchVendorData";


const useDeleteVendorData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeleteVendorData'],
        mutationFn: (data) => fetchDeleteVendorData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("vendor deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useDeleteVendorData;