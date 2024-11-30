import { useQuery } from '@tanstack/react-query';
import { fetchGetGlassProductData } from '../fetchedData/fetchProductData';

const useGlassProductData = (query, from, to, priceFrom, priceTo) => {


    const getAllData = useQuery({ queryKey: ['fetchGetGlassProductData'], queryFn: () => fetchGetGlassProductData(query, from, to, priceFrom, priceTo) })
    const products = getAllData?.data
    const isLoading = getAllData?.isLoading
    const error = getAllData?.error

    const refetch = getAllData?.refetch()

    return { products, isLoading, error, refetch }

};

export default useGlassProductData;