import { useQuery } from "@tanstack/react-query";
import { fetchGetVendorBillData } from "../fetchedData/fetchVendorData";


const useGetAllVendorBillData = (employeeId, year, month) => {

    const { data: getSingleData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetAllVendorBillData'], queryFn: () => fetchGetVendorBillData(employeeId, year, month) })
    const payroll = getSingleData

    return { payroll, isLoading, error, refetch }
};

export default useGetAllVendorBillData;