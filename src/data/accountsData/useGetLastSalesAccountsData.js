import { useQuery } from "@tanstack/react-query";
import { fetchGetLastSaleAndAccountsData } from "../fetchedData/fetchAccountsData";



const useGetLastSalesAndAccountsData = (date) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetLastSalesAndAccountsData'], queryFn: () => fetchGetLastSaleAndAccountsData(date) })
    const lastSaleAndAccountsData = getAllData


    return { lastSaleAndAccountsData, isLoading, error, refetch }
};

export default useGetLastSalesAndAccountsData;