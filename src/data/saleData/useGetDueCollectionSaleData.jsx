import { useQuery } from "@tanstack/react-query";
import { fetchGetDueCollectionSaleData } from "../fetchedData/fetchSaleData";


const useGetDueCollectionSaleData = (date) => {
    const {data:getAllData, refetch, isLoading, error} = useQuery({ queryKey: ['fetchGetDueCollectionSaleData'], queryFn: () => fetchGetDueCollectionSaleData(date) })
    const dueCollectionSaleData = getAllData
  
    return { dueCollectionSaleData, isLoading, error, refetch }
};

export default useGetDueCollectionSaleData;