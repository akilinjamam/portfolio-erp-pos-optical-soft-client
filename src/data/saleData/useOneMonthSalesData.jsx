import { useQuery } from "@tanstack/react-query";
import { fetchGetOneMonthSaleData } from "../fetchedData/fetchSaleData";


const useOneMonthSaleData = (query, from , to) => {
    const {data:getAllData, refetch, isLoading, error} = useQuery({ queryKey: ['fetchGetOneMonthSalesSaleData'], queryFn: () => fetchGetOneMonthSaleData(query, from, to) })
    const saleData = getAllData
    

    return { saleData, isLoading, error, refetch }
};

export default useOneMonthSaleData;