import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useDispatch } from "react-redux";
import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
// import useSaleData from "../../../../data/saleData/useSaleData";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import FilterOption from "./FilterOption";
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SalesRecord = () => {

    const dispatch = useDispatch();
   
    const [handleQuery, setHandleQuery] = useState('');

    const [range, setRange] = useState({
        from: '',
        to: ''
    })

    const {saleData, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, isLoading, refetch, totalSalesQuantity} = useOneMonthSaleData(handleQuery, range.from, range.to);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    
    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    

    const totalPaid = calculateTotalPrice(saleData?.result?.map(sale => Number(sale?.advance)))
    const totalDiscount = calculateTotalPrice(saleData?.result?.map(sale => Number(sale?.discount)))
  
    const totalSalesValue = calculateTotalPrice(total)
    const totalSalesItem = saleData?.result?.length;
    
    
    useEffect(() => {
        const modified = saleData?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [saleData?.result])

    useEffect(() => {
        refetch()
    },[refetch,handleQuery, range])

    return (
        <div className={salesRecord.main}>
            <FilterOption dispatch={dispatch}  openModal={openModal} addSalesData={addSalesData} modifiedProductDataWithIndexId={modifiedProductDataWithIndexId} totalSalesItem={totalSalesItem} totalSalesValue={totalSalesValue} totalPaid={totalPaid} totalDiscount={totalDiscount} totalCashValue={totalCashValue} totalBankValue={totalBankValue} totalBkashValue={totalBkashValue} totalNogodValue={totalNogodValue} totalSalesQuantity={totalSalesQuantity} handleQuery={handleQuery} setHandleQuery={setHandleQuery} range={range} setRange={setRange} />
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <SalesRecordTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading} saleData={saleData} totalSalesValue={totalSalesValue} totalSalesItem={ totalSalesItem} totalPaid={totalPaid} totalDiscount={totalDiscount} totalCashValue={totalCashValue} totalBankValue={totalBankValue} totalBkashValue={totalBkashValue} totalNogodValue={totalNogodValue} totalSalesQuantity={totalSalesQuantity} />
            </div>
            {
                !isLoading
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
            }
        </div>
    );
};

export default SalesRecord;