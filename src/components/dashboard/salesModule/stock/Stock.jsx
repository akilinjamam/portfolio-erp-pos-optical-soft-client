import StockTable from "./StockTable";
import stock from  './Stock.module.scss'
import Pagination from "../../pagination/Pagination";
import { useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { useEffect } from "react";

const Stock = () => {
    const [query, setQuery] = useState('');
    const {products} = useProductData(query);
    const [stocks, setStocks] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex, setPaginatedIndex] = useState();
    console.log(stocks)
   
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId, setModifiedProductDataWithIndexId] = useState([])

    
    useEffect(() => {
        const modified = products?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    },[products])


    return (
        <div className={`${stock.main}`} >
            <div className={`${stock.titleBar} flex_left`}>
                <div className={`${stock.titleBarContainer}`}>
                    <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                    <i onClick={() => setQuery('')} className="uil uil-times"></i>
                    <select value={stocks} name="" id="" onChange={(e) => setStocks(e?.target?.value === "true") }>
                        <option value={true}>stock-in</option>
                        <option value={false}>stock-out</option>
                    </select>
                </div>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll',width:"99.5%", minHeight:'auto', maxHeight:'700px'}}>
                <StockTable paginatedDataContainer={paginatedDataContainer}/>
            </div>
            <Pagination showData={modifiedProductDataWithIndexId} setPaginatedIndex={setPaginatedIndex} setPaginatedDataContainer={setPaginatedDataContainer} limit={50}  />
        </div>
    );
};

export default Stock;

