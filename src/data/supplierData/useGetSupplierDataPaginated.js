import { useQuery } from "@tanstack/react-query";
import { fetchGetSupplierDataPaginated } from "../fetchedData/fetchSupplierData";



const useGetSupplierDataPaginated = (query, page, limit) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetSupplierData', query, page, limit], queryFn: () => fetchGetSupplierDataPaginated(query, page, limit) })
    const supplierData = getAllData


    return { supplierData, isLoading, error, refetch }
};

export default useGetSupplierDataPaginated;