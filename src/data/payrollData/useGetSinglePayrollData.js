import { useQuery } from "@tanstack/react-query";
import { fetchGetSinglePayrollData } from "../fetchedData/fetchPayrollData";



const useGetSinglePayrollData = (id) => {

    const { data: getSingleData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetPayrollData'], queryFn: () => fetchGetSinglePayrollData(id) })
    const payroll = getSingleData

    return { payroll, isLoading, error, refetch }
};

export default useGetSinglePayrollData;