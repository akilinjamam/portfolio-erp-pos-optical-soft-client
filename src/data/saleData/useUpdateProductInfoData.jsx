
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateProductInfoData } from "../fetchedData/fetchSaleData";


const useUpdateProductInfoData = (refetch, setUpdateProductData, initialProductData, setProductId) => {
    const postAllData = useMutation({
        queryKey: ['fetchUpdateProductInfo'],
        mutationFn: (data) => fetchUpdateProductInfoData(data.id, data.data),
        onSuccess: (data) => {
            if (data) {
                refetch()
                toast.success("Product info Updated Successfully")
                setUpdateProductData(initialProductData)
                setProductId('')
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useUpdateProductInfoData;