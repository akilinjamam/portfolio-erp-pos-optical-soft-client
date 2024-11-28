import { useQuery } from "@tanstack/react-query";
import { fetchGetAccountsData } from "../fetchedData/fetchAccountsData";



const useGetAccountsData = (year, month) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetAccountsData'], queryFn: () => fetchGetAccountsData(year, month) })
    const accountsData = getAllData

    return { accountsData, isLoading, error, refetch }
};

export default useGetAccountsData;