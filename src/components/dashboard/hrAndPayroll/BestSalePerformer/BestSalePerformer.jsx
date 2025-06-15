import bestSalePerfomer from './BestSalePerfomer.module.scss';
import { useDispatch } from "react-redux";
import { addBestPerformerData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
// import useSaleData from "../../../../data/saleData/useSaleData";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import BestSalePerformerTable from "./BestSalePerfomerTable";
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const BestSalePerformer = () => {

    const dispatch = useDispatch();
   
    const [handleQuery, setHandleQuery] = useState('');
    console.log(handleQuery)
    const [range, setRange] = useState({
        from: '',
        to: ''
    })

    const {saleData,isLoading, refetch} = useOneMonthSaleData(handleQuery, range.from, range.to);

    const formatSalesData = (salesData) => {
        if (!salesData || !Array.isArray(salesData)) {
          return []; 
        }
      
        const salesBy = salesData.reduce((acc, sale) => {
          const recorder = sale?.recorderName;
      
          const totalSale = sale.products?.reduce((sum, product) => {
            return sum + (product.actualSalesPrice || 0) * (product.quantity || 0);
          }, 0);
          
      
          acc[recorder] = (acc[recorder] || 0) + totalSale;
          return acc;
        }, {});
      
        return Object.entries(salesBy).map(([salesBy, totalSale]) => ({
          salesBy,
          totalSale,
        }));
      };

      
      const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
      const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
      // eslint-disable-next-line no-unused-vars
      const [paginatedIndex,setPaginatedIndex] = useState()
      console.log(modifiedProductDataWithIndexId)
    
    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    
    const totalSalesValue = calculateTotalPrice(total)
    
    useEffect(() => {
        const modified = formatSalesData(saleData?.result)?.sort((a,b) => b?.totalSale - a?.totalSale)?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [saleData?.result])

    useEffect(() => {
        refetch()
    },[refetch,handleQuery, range])

    return (
        <div className={bestSalePerfomer.main}>
            <div className={`${bestSalePerfomer.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('best-performer'))
                    dispatch(addBestPerformerData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue}))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {saleData?.total}</span>
                <input value={handleQuery} type="text" name="" id="" onChange={(e) => {
                   
                    setHandleQuery(e.target.value)   
                }}/>
                <i onClick={() => setHandleQuery('')} className="uil uil-times"></i>
                <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <BestSalePerformerTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading}  totalSalesValue={totalSalesValue} />
            </div>
            {
                !isLoading
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
            }
        </div>
    );
};

export default BestSalePerformer;