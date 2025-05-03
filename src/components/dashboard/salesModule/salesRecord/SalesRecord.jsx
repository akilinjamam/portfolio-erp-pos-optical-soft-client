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
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SalesRecord = () => {

    const dispatch = useDispatch();
   
    const [handleQuery, setHandleQuery] = useState('');
    console.log(handleQuery)
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
            <div className={`${salesRecord.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('sales'))
                    dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCash: totalCashValue, totalBank: totalBankValue, totalBkash: totalBkashValue, totalNogod: totalNogodValue, totalSalesQuantity}))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {totalSalesItem}</span>
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