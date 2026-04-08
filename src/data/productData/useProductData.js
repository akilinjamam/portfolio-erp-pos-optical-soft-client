
import { useQuery } from '@tanstack/react-query';
import { fetchGetProductData } from '../fetchedData/fetchProductData';

const useProductData = (query, from, to, priceFrom, priceTo, page, limit, inStock) => {

    const getAllData = useQuery({
        queryKey: ['fetchGetProductData', query,
            from,
            to,
            priceFrom,
            priceTo,
            page,
            limit,
            inStock
        ], queryFn: () => fetchGetProductData(query, from, to, priceFrom, priceTo, page, limit, inStock),
    })
    const { data, refetch, isLoading, error, isFetching } = getAllData;
    const products = data




    return { products, isLoading, error, refetch, isFetching }

};

export default useProductData;