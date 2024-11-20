import { useQuery } from "@tanstack/react-query";
import { fetchgetPayrollData } from "../fetchedData/fetchPayrollData";



const useGetAllPayrollData = (employeeId, year, month) => {

    const { data: getSingleData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetAllPayrollData'], queryFn: () => fetchgetPayrollData(employeeId, year, month) })
    const payroll = getSingleData

    return { payroll, isLoading, error, refetch }
};

export default useGetAllPayrollData;