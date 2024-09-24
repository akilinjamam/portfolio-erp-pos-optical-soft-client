import { useQuery } from "@tanstack/react-query";
import { fetchGetSaleData } from "../fetchedData/fetchSaleData";


const useSaleData = (query, from , to) => {
    const getAllData = useQuery({ queryKey: ['fetchGetSaleData'], queryFn: () => fetchGetSaleData(query, from, to) })
    const saleData = getAllData?.data
    const isLoading = getAllData?.isLoading
    const error = getAllData?.error

    const refetch = getAllData?.refetch()

    return { saleData, isLoading, error, refetch }
};

export default useSaleData;