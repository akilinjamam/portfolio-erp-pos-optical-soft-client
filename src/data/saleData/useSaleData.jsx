import { useQuery } from "@tanstack/react-query";
import { fetchGetSaleData } from "../fetchedData/fetchSaleData";


const useSaleData = (query, from , to) => {
    const {data:getAllData, refetch, isLoading, error} = useQuery({ queryKey: ['fetchGetSaleData'], queryFn: () => fetchGetSaleData(query, from, to) })
    const saleData = getAllData
    

    console.log(saleData);

    return { saleData, isLoading, error, refetch }
};

export default useSaleData;