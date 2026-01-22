import StockTable from "./StockTable";
import stock from  './Stock.module.scss'
import Pagination from "../../pagination/Pagination";
import { useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { useEffect } from "react";
import CommonLoading from "../../../commonLoagin/CommonLoading";
import { useDispatch } from "react-redux";
import { addStockData, addStockTotalInfo, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import FilterOption from "./FilterOption";


const Stock = () => {

   const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: ''
    });
    const {products, isLoading, newRefetch} = useProductData(query, range.from, range.to);
    const [stocks, setStocks] = useState(undefined);
    
    console.log(stocks)
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [filteredStock, setFilteredStock] = useState([]);
    
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId, setModifiedProductDataWithIndexId] = useState([])
    
    useEffect(() => {
        if(stocks === undefined){
            const filteredByStock = products?.result?.slice()?.reverse()
        setFilteredStock(filteredByStock)
        }else{
            const filteredByStock = products?.result?.slice()?.reverse()?.filter(f => f?.inStock === stocks)
        setFilteredStock(filteredByStock)
        }
    },[products, stocks])

       useEffect(() => {
        const modified = filteredStock?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    },[filteredStock]);


    const availableQuantity = calculateTotalPrice(filteredStock?.map(item => Number(item?.quantity)));
    const totalStockAmount = calculateTotalPrice(filteredStock?.map(item => Number(item?.stockAmount)));
    const stockOut = totalStockAmount - availableQuantity;
    
    const stockTotalInfo = {
        availableQuantity : availableQuantity,
        totalStockAmount: totalStockAmount,
        stockOut: stockOut
    }

    useEffect(() => {
        newRefetch()
    }, [query, range.from, range.to, stocks, newRefetch]);

    if(isLoading){
        return <CommonLoading/>
    }
    
    return (
        <div className={`${stock.main}`} >
            <div className={`${stock.titleBar} flex_left`}>
                <FilterOption dispatch={dispatch} addStockData={addStockData} filteredStock={filteredStock} addStockTotalInfo={addStockTotalInfo} stockTotalInfo={stockTotalInfo} openModal={openModal} query={query} setQuery={setQuery} newRefetch={newRefetch} stocks={stocks} setStocks={setStocks} range={range} setRange={setRange}/>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'70vh'}}>
                <StockTable paginatedDataContainer={paginatedDataContainer} showData={modifiedProductDataWithIndexId} stockTotalInfo={stockTotalInfo}/>
            </div>
            <Pagination showData={modifiedProductDataWithIndexId} setPaginatedIndex={setPaginatedIndex} setPaginatedDataContainer={setPaginatedDataContainer} limit={50}  />
        </div>
    );
};

export default Stock;

