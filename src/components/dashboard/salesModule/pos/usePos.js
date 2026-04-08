import { useState } from "react";
import useGetProductDataByBarcode from "../../../../data/productData/useGetProductDataByBarcode";


const usePos = (barcode) => {
    const [priceArray, setPriceArray] = useState([])
    let [quantityArray, setQuantityArray] = useState([])
    const { productByBarcode, refetch, isFetching } = useGetProductDataByBarcode(barcode)
    const allProducts = productByBarcode?.result;
    return { allProducts, setPriceArray, priceArray, quantityArray, setQuantityArray, refetch, isFetching }
};

export default usePos;