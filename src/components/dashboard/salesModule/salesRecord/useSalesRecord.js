
import useSaleData from "../../../../data/saleData/useSaleData";

const useSalesRecord = (query, from, to) => {
    const { saleData, error, isLoading, refetch } = useSaleData(query, from, to)
    return { saleData, error, isLoading, refetch }
};

export default useSalesRecord;