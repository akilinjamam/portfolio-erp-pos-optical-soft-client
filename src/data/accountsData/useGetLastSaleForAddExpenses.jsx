import { useQuery } from '@tanstack/react-query';
import { fetchGetLastSaleForAddExpenses } from '../fetchedData/fetchAccountsData';


const useGetLastSaleForAddExpenses = (date) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetLastSaleForAddExpenses'], queryFn: () => fetchGetLastSaleForAddExpenses(date) })
    const lastSaleAndAccountsData = getAllData


    return {lastSaleAndAccountsData, refetch, isLoading, error}
};

export default useGetLastSaleForAddExpenses;