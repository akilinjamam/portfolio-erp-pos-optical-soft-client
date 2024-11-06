
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateSupplierData } from "../fetchedData/fetchSupplierData";

const useUpdateSupplierData = (refetch, setUdpateEmployeeData, initialEmployeeData, setImgHolder, setEdit) => {
    const updateAllData = useMutation({
        queryKey: ['fetchUpdateSupplierData'],
        mutationFn: (data) => fetchUpdateSupplierData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateEmployeeData(initialEmployeeData)
                setEdit('')
                setImgHolder('')
                refetch()
                toast.success("Supplier Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return updateAllData
};

export default useUpdateSupplierData;