import { useQuery } from "@tanstack/react-query";
import { fetchGetFinalAccountsData } from "../fetchedData/fetchAccountsData";

const useGetFinalAccountsData = () => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetFinalAccountsData'], queryFn: () => fetchGetFinalAccountsData() })
    const finalAccountsData = getAllData;

    console.log(getAllData);

    return { finalAccountsData, isLoading, error, refetch }
};

export default useGetFinalAccountsData;