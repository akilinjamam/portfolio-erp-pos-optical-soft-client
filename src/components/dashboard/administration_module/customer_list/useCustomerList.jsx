import useSaleData from "../../../../data/saleData/useSaleData";

const useCustomerList = (query, from, to) => {
    const { saleData, error, isLoading } = useSaleData(query, from, to)
    return { saleData, error, isLoading }
};

export default useCustomerList;