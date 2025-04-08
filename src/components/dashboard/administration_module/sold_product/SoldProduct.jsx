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
        const allProducts = saleData?.result?.flatMap(item => item?.products?.map(product => product) )
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

    return (
        <div className={soldProducts.main}>
            <div className={`${soldProducts.title} flex_left`}>
                {/* <i onClick={() => {
                    dispatch(openModal('sales'))
                    dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId}))
                }} title="print" className="uil uil-print"></i> */}
                <span>Total : {totalSalesItem}</span>
                <input style={{width: '230px'}} placeholder='Product Name / Barcode' value={handleQuery} type="text" name="" id="" onChange={(e) => {
                   
                    setHandleQuery(e.target.value)   
                }}/>
                <i onClick={() => setHandleQuery('')} className="uil uil-times"></i>

                <input style={{width: '230px'}} placeholder='Category' value={category} type="text" name="" id="" onChange={(e) => {
                   
                    setCategory(e.target.value)   
                }}/>
                <i onClick={() => setCategory('')} className="uil uil-times"></i>
                <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
            </div>
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