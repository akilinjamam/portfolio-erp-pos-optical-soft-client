
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { fetchPostProductData } from "../fetchedData/fetchProductData";

const usePostProductEntryData = (setShowData, setImgHolder, setProductData, initialProductData) => {
    const {mutate: postProductData, isPending} = useMutation({
        queryKey: ['fetchPostProductEntryData'],
        mutationFn: (data) => fetchPostProductData(data),
        onSuccess: (data) => {
            console.log(data)
            if (data?.data?.success) {
                toast.success('Product added successfully')
                setShowData([])
                setImgHolder(undefined)
                setProductData(initialProductData)
            } else {
                toast.error(data)
            }
        },
        onError: (error) => {
            // toast.error(`${res.data.error?.map(err => err.message.slice(4))}`)
            toast.error(error.response?.data?.errorMessage)
        }
    })

    return {postProductData, isPending}
};

export default usePostProductEntryData;