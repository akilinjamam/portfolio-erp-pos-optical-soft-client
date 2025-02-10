import { useQuery } from "@tanstack/react-query";
import { fetchGetAccountsData } from "../fetchedData/fetchAccountsData";



const useGetAccountsData = (year, month, date) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetAccountsData'], queryFn: () => fetchGetAccountsData(year, month, date) })
    const accountsData = getAllData

    return { accountsData, isLoading, error, refetch }
};

export default useGetAccountsData;