import glassStock from  './GlassStock.module.scss'
import Pagination from "../../pagination/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import CommonLoading from "../../../commonLoagin/CommonLoading";
import { useDispatch } from "react-redux";
import { addStockData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import GlassStockTable from "./GlassStockTable";
import useGlassProductData from '../../../../data/productData/useProductGlassData';
import FilterOption from './FilterOption';


const GlassStock = () => {

   const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: ''
    });
    const {products, isLoading} = useGlassProductData(query, range.from, range.to);
    const [stocks, setStocks] = useState(true);
    
    console.log(range)
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [filteredStock, setFilteredStock] = useState([]);
    
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId, setModifiedProductDataWithIndexId] = useState([])
    
    useEffect(() => {
        const filteredByStock = products?.result?.slice()?.reverse()?.filter(f => f?.inStock === stocks)
        setFilteredStock(filteredByStock)
    },[products, stocks])

       useEffect(() => {
        const modified = filteredStock?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    },[filteredStock])

    if(isLoading){
        return <CommonLoading/>
    }
    
    return (
        <div className={`${glassStock.main}`} >
            <div className={`${glassStock.titleBar} flex_left`}>
                <FilterOption dispatch={dispatch} addStockData={addStockData} filteredStock={filteredStock} openModal={openModal} query={query} setQuery={setQuery} stocks={stocks} setStocks={setStocks} range={range} setRange={setRange} />
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'70vh'}}>
                <GlassStockTable paginatedDataContainer={paginatedDataContainer}/>
            </div>
            <Pagination showData={modifiedProductDataWithIndexId} setPaginatedIndex={setPaginatedIndex} setPaginatedDataContainer={setPaginatedDataContainer} limit={50}  />
        </div>
    );
};

export default GlassStock;

