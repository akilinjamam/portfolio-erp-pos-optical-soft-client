import { useQuery } from "@tanstack/react-query";
import { fetchGetFinalAccountsData } from "../fetchedData/fetchAccountsData";

const useGetFinalAccountsData = (year, month) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetFinalAccountsData'], queryFn: () => fetchGetFinalAccountsData(year, month) })
    const finalAccountsData = getAllData;



    return { finalAccountsData, isLoading, error, refetch }
};

export default useGetFinalAccountsData;