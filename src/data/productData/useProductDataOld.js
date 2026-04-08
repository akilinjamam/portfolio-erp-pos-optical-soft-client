import { useQuery } from '@tanstack/react-query';
import { fetchGetProductOldData } from '../fetchedData/fetchProductData';

const useProductOldData = (query, from, to, priceFrom, priceTo) => {

    const getAllData = useQuery({ queryKey: ['fetchGetProductData'], queryFn: () => fetchGetProductOldData(query, from, to, priceFrom, priceTo) })
    const { data, refetch: newRefetch, isLoading, error } = getAllData;
    const products = data


    const refetch = getAllData?.refetch()

    return { products, isLoading, error, refetch, newRefetch }

};

export default useProductOldData;