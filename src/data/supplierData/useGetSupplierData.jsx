import { useQuery } from "@tanstack/react-query";
import { fetchGetSupplierData } from "../fetchedData/fetchSupplierData";



const useGetSupplierData = (query) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetSupplierData'], queryFn: () => fetchGetSupplierData(query) })
    const supplierData = getAllData


    return { supplierData, isLoading, error, refetch }
};

export default useGetSupplierData;