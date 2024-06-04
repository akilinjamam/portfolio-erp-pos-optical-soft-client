// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, updateData } from './productSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchGetProductData } from '../fetchedData/fetchProductData';

const useProductData = () => {

    // const { products, isLoading, error } = useSelector(state => state.products);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchProducts());
    //     dispatch(updateData())
    // }, [dispatch]);

    const query = useQuery({ queryKey: ['fetchGetProductData'], queryFn: fetchGetProductData })
    const products = query.data
    const isLoading = query.isLoading
    const error = query.error
    const refetch = query.refetch()

    return { products, isLoading, error, refetch }

};

export default useProductData;