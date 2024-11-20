
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { fetchUpdateVendorData } from "../fetchedData/fetchVendorData";


const useUpdateVendorData = (refetch, setUdpateEmployeeData, initialEmployeeData, setEdit) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateVendorData'],
        mutationFn: (data) => fetchUpdateVendorData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                setUdpateEmployeeData(initialEmployeeData)
                setEdit('')
                refetch()
                toast.success("vendor Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateVendorData;