import { useQuery } from "@tanstack/react-query";
import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";


const useSalesRecord = () => {

    const { isPending, isError, data: saleData, error } = useQuery({
        queryKey: ['getSaleData'],
        queryFn: fetchGetSaleData,
    });
    return { saleData, isError, isPending, error }
};

export default useSalesRecord;