import { useQuery } from "@tanstack/react-query";
import { fetchgetVendorData } from "../fetchedData/fetchVendorData";


const useGetAllVendorData = (employeeId, year, month) => {

    const { data: getSingleData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetAllVendorData'], queryFn: () => fetchgetVendorData(employeeId, year, month) })
    const payroll = getSingleData

    return { payroll, isLoading, error, refetch }
};

export default useGetAllVendorData;