import { useQuery } from '@tanstack/react-query';
import { fetchGetGlassProductData } from '../fetchedData/fetchProductData';

const useGlassProductData = (query, from, to, priceFrom, priceTo, page, limit, inStock) => {


    const getAllData = useQuery({ queryKey: ['fetchGetGlassProductData', query, from, to, priceFrom, priceTo, page, limit, inStock], queryFn: () => fetchGetGlassProductData(query, from, to, priceFrom, priceTo, page, limit, inStock) })
    const products = getAllData?.data
    const isLoading = getAllData?.isLoading
    const error = getAllData?.error

    const refetch = getAllData?.refetch()

    return { products, isLoading, error, refetch }

};

export default useGlassProductData;