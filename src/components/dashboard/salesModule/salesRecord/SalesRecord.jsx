import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useDispatch } from "react-redux";
import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import { useEffect } from "react";
import FilterOption from "./FilterOption";
import useOneMonthSaleDataPaginated from "../../../../data/saleData/useOneMonthSalesDataPaginated";
import NewPagination from "../../pagination/NewPagination";
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SalesRecord = () => {

    const dispatch = useDispatch();
   
    const [handleQuery, setHandleQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [count, setCount] = useState(1);
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit: 50
    })

    // paginated data from server
    const {saleData, refetch, isLoading} = useOneMonthSaleDataPaginated(handleQuery, range.from, range.to, pageNumber, range.limit, '');
    const summary = saleData?.summary;
    const {totalCash, totalBank, totalBkash, totalNogod, totalSalesValue, totalDiscount, total, totalSoldQuantity} = summary || {}


    useEffect(() => {
        refetch()
        setPageNumber(1)
    },[refetch,handleQuery, range])

    return (
        <div className={salesRecord.main}>
            <FilterOption dispatch={dispatch}  openModal={openModal} addSalesData={addSalesData} modifiedProductDataWithIndexId={saleData?.result} totalSalesItem={saleData?.total} totalSalesValue={totalSalesValue} totalPaid={total} totalDiscount={totalDiscount} totalCashValue={totalCash} totalBankValue={totalBank} totalBkashValue={totalBkash} totalNogodValue={totalNogod} totalSalesQuantity={totalSoldQuantity} handleQuery={handleQuery} setHandleQuery={setHandleQuery} range={range} setRange={setRange} />
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <SalesRecordTable paginatedDataContainer={saleData?.result} isLoading={isLoading} saleData={saleData?.result} totalSalesValue={totalSalesValue} totalSalesItem={ saleData?.total} totalPaid={total} totalDiscount={totalDiscount} totalCashValue={totalCash} totalBankValue={totalBank} totalBkashValue={totalBkash} totalNogodValue={totalNogod} totalSalesQuantity={totalSoldQuantity} />
            </div>
            {
                !isLoading
                &&
                <NewPagination data={saleData} limit={range.limit} setPageNumber={setPageNumber} pageNumber={pageNumber} count={count} setCount={setCount} />
            }
        </div>
    );
};

export default SalesRecord;