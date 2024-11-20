import { useQuery } from "@tanstack/react-query";
import { fetchGetSingleVendorData } from "../fetchedData/fetchVendorData";



const useGetSingleVendorData = (id) => {

    const { data: getSingleData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetSingleVendorData'], queryFn: () => fetchGetSingleVendorData(id) })
    const payroll = getSingleData

    return { payroll, isLoading, error, refetch }
};

export default useGetSingleVendorData;