import todaySales from './TodayDueCollection.module.scss';
import { useDispatch } from "react-redux";
import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";


import TodayDueCollectionTable from './TodayDueCollectionTable';
import useGetDueCollectionSaleData from '../../../../data/saleData/useGetDueCollectionSaleData';
import useCurrentDate from '../../../../data/saleData/useCurrentDate';

const TodayDueCollection = () => {

    const dispatch = useDispatch();

    const {today} = useCurrentDate()
   
    const [date, setDate] = useState(today);
    

    const {dueCollectionSaleData, isLoading, refetch} = useGetDueCollectionSaleData(date);
    const totalDueCollection = dueCollectionSaleData?.result?.totalPaidDueCollection;
    const totalCashDueCollection = dueCollectionSaleData?.result?.dueCashPaidValue
    const totalBankDueCollection = dueCollectionSaleData?.result?.dueBankPaidValue
    const totalBkashDueCollection = dueCollectionSaleData?.result?.dueBkashPaidValue
    const totalNogodDueCollection = dueCollectionSaleData?.result?.dueNogodPaidValue
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    

    const total = dueCollectionSaleData?.result?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalPaid = calculateTotalPrice(dueCollectionSaleData?.result?.result?.map(sale => Number(sale?.advance)))
    const totalDiscount = calculateTotalPrice(dueCollectionSaleData?.result?.result?.map(sale => Number(sale?.discount)))

    const totalTodayPaid = calculateTotalPrice(dueCollectionSaleData?.result?.result?.map(sale => Number(sale?.todayPaid)))
  
    const totalSalesValue = calculateTotalPrice(total)
    const totalSalesItem = dueCollectionSaleData?.result?.result?.length;
    
    
    useEffect(() => {
        const modified = dueCollectionSaleData?.result?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [dueCollectionSaleData?.result])

    useEffect(() => {
        refetch()
    },[refetch, date])

    return (
        <div className={todaySales.main}>
            <div className={`${todaySales.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('today-due-collection'))
                    dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalTodayPaid, totalDueCollection, totalCashDueCollection, totalBankDueCollection, totalBkashDueCollection, totalNogodDueCollection}))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {dueCollectionSaleData?.result?.result?.length}</span>
                
                
                <input value={date}  type="date" name="" id=""  onChange={(e) => setDate(e.target.value)}/>
                <i onClick={() => {
                    setDate('')
                    setModifiedProductDataWithIndexId([])
                }} className="uil uil-times"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <TodayDueCollectionTable showReportTitle={false} paginatedDataContainer={paginatedDataContainer} isLoading={isLoading} totalSalesValue={totalSalesValue} totalSalesItem={ totalSalesItem} totalPaid={totalPaid} totalDiscount={totalDiscount} totalTodayPaid={totalTodayPaid} totalDueCollection={totalDueCollection} totalCashDueCollection={totalCashDueCollection} totalBankDueCollection={totalBankDueCollection} totalBkashDueCollection={totalBkashDueCollection} totalNogodDueCollection={totalNogodDueCollection}  />
            </div>
            {
                ((modifiedProductDataWithIndexId) )
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={20}/>
            }
        </div>
    );
};

export default TodayDueCollection;