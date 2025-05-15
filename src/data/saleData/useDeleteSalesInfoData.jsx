
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchDeleteSalesInfoData } from "../fetchedData/fetchSaleData";


const useDeletSalesInfoData = (refetch, setIdsForDelete, setSelectDeleted) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeleteSalesInfoData'],
        mutationFn: (data) => fetchDeleteSalesInfoData(data),
        onSuccess: (data) => {
            if (data) {
                setIdsForDelete([])
                setSelectDeleted(false)
                refetch()
                toast.success("Sales deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};

export default useDeletSalesInfoData;