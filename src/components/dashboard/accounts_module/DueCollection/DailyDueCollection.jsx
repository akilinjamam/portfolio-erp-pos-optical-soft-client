import dueCollection from './DailyDueCollection.module.scss';
import { useDispatch } from "react-redux";
import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import DailyDueCollectionTable from "./DailyDueCollectionTable";
import useGetDueCollectionSaleData from '../../../../data/saleData/useGetDueCollectionSaleData';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const DailyDueCollection = () => {

    const dispatch = useDispatch();
   
    const [date, setDate] = useState('')
    
    const {dueCollectionSaleData, isLoading, refetch} = useGetDueCollectionSaleData(date);

    useEffect(() => {
    
        refetch()
    },[refetch,date])
   
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    
    console.log(paginatedDataContainer?.length);
    const total = dueCollectionSaleData?.result?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    const totalDiscount = calculateTotalPrice(dueCollectionSaleData?.result?.result?.map(sale => Number(sale?.discount)))

    const totalTodayPaid = calculateTotalPrice(dueCollectionSaleData?.result?.result?.map(sale => Number(sale?.todayPaid)))


    const totalSalesValue = calculateTotalPrice(total)
    const totalSalesItem = dueCollectionSaleData?.result?.length;

    useEffect(() => {
        const modified = dueCollectionSaleData?.result?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [dueCollectionSaleData])

    return (
        <div className={dueCollection.main}>
            <div className={`${dueCollection.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('sales'))
                    dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem, totalDiscount, totalTodayPaid}))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {dueCollectionSaleData?.total}</span>
                
                <label htmlFor="">Date: </label>
                <input value={date} type="date" name="" id="" onChange={(e) => setDate(e.target.value)}/>
                <i onClick={() => {
                    setDate('')
                    setModifiedProductDataWithIndexId([])
                    }} className="uil uil-times"></i>
                
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <DailyDueCollectionTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading} saleData={dueCollectionSaleData} totalSalesValue={totalSalesValue} totalSalesItem={ totalSalesItem} />
            </div>
            {
                ((modifiedProductDataWithIndexId) )
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={20}/>
            }
        </div>
    );
};

export default DailyDueCollection;