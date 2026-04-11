import soldProducts from './SoldProduct.module.scss';
// import { useDispatch } from "react-redux";
// import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";

// import useSaleData from "../../../../data/saleData/useSaleData";
import SoldProductTable from "./SoldProductTable";
import FilterOption from './FilterOption';
import useOneMonthSaleDataPaginated from '../../../../data/saleData/useOneMonthSalesDataPaginated';
import NewPagination from '../../pagination/NewPagination';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SoldProduct = () => {

    // const dispatch = useDispatch();
   
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [count , setCount] = useState(1);
    
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit:50
    })
    const {saleData, isLoading} = useOneMonthSaleDataPaginated(query, range.from, range.to, pageNumber, range.limit, category );
   
    
    // eslint-disable-next-line no-unused-vars
    
    const totalSalesItem = saleData?.total;
    const totalQuantity = saleData?.summary?.totalSoldQuantity;

     const allProducts = saleData?.result?.flatMap(item => item?.products?.map(product => ({...product, recorderName: item?.recorderName, invoiceBarcode: item?.invoiceBarcode}) ) )
    
  


    const totalCategory = saleData?.totalProductCateogories?.slice().sort((a, b) =>
    a.localeCompare(b)
     
) || [];
    console.log(category)
    return (
        <div className={soldProducts.main}>
            <FilterOption totalSalesItem={totalSalesItem}  query={query} setQuery={setQuery} setCategory={setCategory}  category={category} totalCategory={totalCategory} setRange={setRange} range={range}  />
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <SoldProductTable paginatedDataContainer={allProducts} isLoading={isLoading} totalSaleQuantity={totalQuantity} />
            </div>
            {
                !isLoading
                &&
                <NewPagination data={saleData} count={count} setCount={setCount} pageNumber={pageNumber} setPageNumber={setPageNumber} limit={50}/>
            }
        </div>
    );
};

export default SoldProduct;