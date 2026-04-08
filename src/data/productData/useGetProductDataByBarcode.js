
import { useQuery } from '@tanstack/react-query';
import { fetchGetProductDataByBarcode } from '../fetchedData/fetchProductData';

const useGetProductDataByBarcode = (barcode) => {

    const getAllData = useQuery({
        queryKey: ['fetchGetProductDataByBarcode', barcode], queryFn: () => fetchGetProductDataByBarcode(barcode),
    });

    const { data, refetch, isLoading, error, isFetching } = getAllData;
    const productByBarcode = data




    return { productByBarcode, isLoading, error, refetch, isFetching }

};

export default useGetProductDataByBarcode;