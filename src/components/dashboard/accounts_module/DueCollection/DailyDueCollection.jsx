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
   
    const [range, setRange] = useState({
        date:''
    })
    
    const {dueCollectionSaleData, isLoading, refetch} = useGetDueCollectionSaleData(range.date);

    useEffect(() => {
        range.date;
        refetch()
    },[refetch,range])
   
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    
    console.log(paginatedDataContainer?.length);
    const total = dueCollectionSaleData?.result?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
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
                    dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem}))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {dueCollectionSaleData?.total}</span>
                
                <label htmlFor="">Date: </label>
                <input value={range?.date} type="date" name="" id="" onChange={(e) => setRange({...range, date: e.target.value})}/>
                
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