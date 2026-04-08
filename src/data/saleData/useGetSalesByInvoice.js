import { useQuery } from "@tanstack/react-query";
import { fetchGetSalesByInvoice } from "../fetchedData/fetchSaleData";


const useGetSalesByInvoice = (invoice) => {
    const { data: getSalesByInvoice, refetch, isLoading, error, isFetching } = useQuery({ queryKey: ['fetchGetSalesByInvoice', invoice], queryFn: () => fetchGetSalesByInvoice(invoice) })

    return { getSalesByInvoice, isLoading, error, refetch, isFetching }
};

export default useGetSalesByInvoice;