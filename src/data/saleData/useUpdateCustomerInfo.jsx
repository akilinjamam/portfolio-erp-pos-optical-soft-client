
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateSalesInfoData } from "../fetchedData/fetchSaleData";


const useUpdateCustomerInfo = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateCustomersInfo'],
        mutationFn: (data) => fetchUpdateSalesInfoData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                refetch()
                toast.success("Customer info Updated Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateCustomerInfo;