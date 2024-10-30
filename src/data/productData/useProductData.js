// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, updateData } from './productSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchGetProductData } from '../fetchedData/fetchProductData';

const useProductData = (query, from, to, priceFrom, priceTo) => {


    const getAllData = useQuery({ queryKey: ['fetchGetProductData'], queryFn: () => fetchGetProductData(query, from, to, priceFrom, priceTo) })
    const products = getAllData?.data
    const isLoading = getAllData?.isLoading
    const error = getAllData?.error

    const refetch = getAllData?.refetch()

    return { products, isLoading, error, refetch }

};

export default useProductData;