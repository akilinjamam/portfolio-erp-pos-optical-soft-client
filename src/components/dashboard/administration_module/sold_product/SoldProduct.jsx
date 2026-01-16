import soldProducts from './SoldProduct.module.scss';
// import { useDispatch } from "react-redux";
// import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
// import useSaleData from "../../../../data/saleData/useSaleData";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import SoldProductTable from "./SoldProductTable";
import FilterOption from './FilterOption';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SoldProduct = () => {

    // const dispatch = useDispatch();
   
    const [handleQuery, setHandleQuery] = useState('');
    const [category, setCategory] = useState('');
    const [totalSaleQuantity, setTotalSaleQuantity] = useState(0)
    console.log(handleQuery)
    const [range, setRange] = useState({
        from: '',
        to: ''
    })

    const {saleData, isLoading, refetch} = useOneMonthSaleData('', range.from, range.to);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    

    const totalSalesItem = saleData?.result?.flatMap(item => item?.products)?.length;
    const totalQuantity = calculateTotalPrice(paginatedDataContainer?.map((item) => item?.quantity))
    
    useEffect(() => {
        const allProducts = saleData?.result?.flatMap(item => item?.products?.map(product => ({...product, recorderName: item?.recorderName, invoiceBarcode: item?.invoiceBarcode}) ) )
        const modifiedProducts = allProducts?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        if(!handleQuery){
            const totalQuantity = calculateTotalPrice(modifiedProducts?.map((item) => item?.quantity))
            setTotalSaleQuantity(totalQuantity)
            setModifiedProductDataWithIndexId(modifiedProducts)
        }else{
            const findProducts = allProducts?.filter(item => item?.productName?.toLowerCase()?.includes(handleQuery?.toLowerCase()) || item?.category?.toLowerCase()?.includes(handleQuery?.toLowerCase()) || item?.barcode?.toLowerCase()?.includes( handleQuery?.toLowerCase())) 
            const totalQuantity = calculateTotalPrice(findProducts?.map((item) => item?.quantity))
            setTotalSaleQuantity(totalQuantity)
            setModifiedProductDataWithIndexId(findProducts)
        }

        if(category && !handleQuery){
            const findProducts = allProducts?.filter(item => item?.category === category)
            const totalQuantity = calculateTotalPrice(findProducts?.map((item) => item?.quantity))
            setTotalSaleQuantity(totalQuantity)
            setModifiedProductDataWithIndexId(findProducts)

        }
    }, [saleData?.result, handleQuery,totalQuantity, category])

   

    useEffect(() => {
        refetch()
    },[refetch,handleQuery, range])


    const totalCategory = [...new Set(saleData?.result?.flatMap(item => item?.products)?.map(item => item?.category))]
    

    return (
        <div className={soldProducts.main}>
            <FilterOption totalSalesItem={totalSalesItem}  handleQuery={handleQuery} setHandleQuery={setHandleQuery} setCategory={setCategory}  category={category} totalCategory={totalCategory} setRange={setRange} range={range}  />
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <SoldProductTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading} totalSaleQuantity={totalSaleQuantity} />
            </div>
            {
                !isLoading
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
            }
        </div>
    );
};

export default SoldProduct;