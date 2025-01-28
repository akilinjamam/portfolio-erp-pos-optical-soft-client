
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchCancelAdjustment } from "../fetchedData/fetchSaleData";


const useCancelAdjustmentSaleData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateSales'],
        mutationFn: (id) => fetchCancelAdjustment(id),
        onSuccess: (data) => {
            
            if (data?.data?.success) {
                refetch()
                toast.success("Sales Adjustment Cancelled Successfully")
            }

            if(data?.response?.data?.success === false){
                toast.error(data?.response?.data?.errorMessage)
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useCancelAdjustmentSaleData;