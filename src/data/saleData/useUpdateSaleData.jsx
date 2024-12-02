
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateSalesData } from "../fetchedData/fetchSaleData";


const useUpdateSaleData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateSales'],
        mutationFn: (data) => fetchUpdateSalesData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                refetch()
                toast.success("Sales Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateSaleData;