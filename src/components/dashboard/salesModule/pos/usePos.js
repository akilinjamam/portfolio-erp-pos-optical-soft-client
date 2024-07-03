import { useState } from "react";
import useProductData from "../../../../data/productData/useProductData";


const usePos = () => {
    const [priceArray, setPriceArray] = useState([])
    const [quantityArray, setQuantityArray] = useState([])
    const { products } = useProductData()
    const allProducts = products?.result
    return { allProducts, setPriceArray, priceArray, quantityArray, setQuantityArray }
};

export default usePos;