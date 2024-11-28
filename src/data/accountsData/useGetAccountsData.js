import { useQuery } from "@tanstack/react-query";
import { fetchGetLastSaleAndAccountsData } from "../fetchedData/fetchAccountsData";



const useGetAccountsData = (date) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetAccountsData'], queryFn: () => fetchGetLastSaleAndAccountsData(date) })
    const lastSaleAndAccountsData = getAllData


    return { lastSaleAndAccountsData, isLoading, error, refetch }
};

export default useGetAccountsData;