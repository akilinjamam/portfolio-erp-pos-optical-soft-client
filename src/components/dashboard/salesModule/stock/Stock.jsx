import StockTable from "./StockTable";
import stock from  './Stock.module.scss'
import { useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { useEffect } from "react";
import CommonLoading from "../../../commonLoagin/CommonLoading";
import { useDispatch } from "react-redux";
import { addStockData, addStockTotalInfo, openModal } from "../../../modal/imgmodal/imgModalSlice";
import FilterOption from "./FilterOption";
import NewPagination from "../../pagination/NewPagination";


const Stock = () => {

   const dispatch = useDispatch();
   const [stocks, setStocks] = useState(undefined);

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit: 50
    });
    const [pageNumber, setPageNumber] = useState(1)
    const {products, isLoading, refetch} = useProductData(query, range.from, range.to, '', '', pageNumber, range.limit, stocks);
    
    console.log(stocks)
    // eslint-disable-next-line no-unused-vars
    const [count, setCount] = useState(1);
    
    const stockTotalInfo = {
        availableQuantity : products?.totalQuantity,
        totalStockAmount: products?.totalStock,
        stockOut: products?.totalStock - products?.totalQuantity 
    }

    useEffect(() => {
        refetch()
    }, [query, range.from, range.to, stocks,refetch]);

    if(isLoading){
        return <CommonLoading/>
    }
    
    return (
        <div className={`${stock.main}`} >
            <div className={`${stock.titleBar} flex_left`}>
                <FilterOption dispatch={dispatch} addStockData={addStockData} filteredStock={products?.result} addStockTotalInfo={addStockTotalInfo} stockTotalInfo={stockTotalInfo} openModal={openModal} query={query} setQuery={setQuery} newRefetch={refetch} stocks={stocks} setStocks={setStocks} range={range} setRange={setRange}/>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'70vh'}}>
                <StockTable paginatedDataContainer={products?.result} stockTotalInfo={stockTotalInfo}/>
            </div>
             {
            !isLoading  
            &&
            <NewPagination data={products} limit={range.limit} setPageNumber={setPageNumber} pageNumber={pageNumber} count={count} setCount={setCount} />
           }  
        </div>
    );
};

export default Stock;

