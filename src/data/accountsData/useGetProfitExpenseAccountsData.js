import { useQuery } from "@tanstack/react-query";
import { fetchGetFinalProfitExpenseAccountsData } from "../fetchedData/fetchAccountsData";

const useGetProfitExpenseAccountsData = () => {

    const { data: getAllData, refetch, isLoading, error, isSuccess, isError } = useQuery({ queryKey: ['fetchGetProfitExpenseAccountsData'], queryFn: () => fetchGetFinalProfitExpenseAccountsData() })
    const profitExpenseData = getAllData

    return { profitExpenseData, isLoading, error, refetch, isSuccess, isError }
};

export default useGetProfitExpenseAccountsData;