
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateSalesInfoData } from "../fetchedData/fetchSaleData";


const useUpdateSaleInfoData = (refetch, setUdpateSupplierData, initialSupplierData, setEdit,setUpdatePaymentMethod) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateSalesInfo'],
        mutationFn: (data) => fetchUpdateSalesInfoData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                refetch()
                toast.success("Sales info Updated Successfully")
                setUdpateSupplierData(initialSupplierData)
                setEdit('')
                setUpdatePaymentMethod('')
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateSaleInfoData;