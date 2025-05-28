
import { useQuery } from '@tanstack/react-query';
import { fetchGetProductData } from '../fetchedData/fetchProductData';

const useProductData = (query, from, to, priceFrom, priceTo) => {

    const getAllData = useQuery({ queryKey: ['fetchGetProductData'], queryFn: () => fetchGetProductData(query, from, to, priceFrom, priceTo) })
    const { data, refetch: newRefetch, isLoading, error } = getAllData;
    const products = data


    const refetch = getAllData?.refetch()

    return { products, isLoading, error, refetch, newRefetch }

};

export default useProductData;