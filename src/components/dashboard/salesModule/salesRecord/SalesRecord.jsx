import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useDispatch } from "react-redux";
import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import useSalesRecord from "./useSalesRecord";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import handleDebounce from "../../../handleDebounce/handleDebounce";
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SalesRecord = () => {

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [handleQuery, setHandleQuery] = useState('');
    console.log(handleQuery)
    const [range, setRange] = useState({
        from: '',
        to: ''
    })

    const {saleData, isLoading} = useSalesRecord(handleQuery, range.from, range.to);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    

    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalSalesValue = calculateTotalPrice(total)
    const totalSalesItem = saleData?.result?.length;

    useEffect(() => {
        const modified = saleData?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [saleData?.result])

    return (
        <div className={salesRecord.main}>
            <div className={`${salesRecord.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('sales'))
                    dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem}))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {saleData?.total}</span>
                <input value={query} type="text" name="" id="" onChange={(e) => {
                    setQuery(e.target.value)
                    handleDebounce(setHandleQuery, e.target.value)   
                }}/>
                <i onClick={() => setQuery('')} className="uil uil-times"></i>
                <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <SalesRecordTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading} saleData={saleData} totalSalesValue={totalSalesValue} totalSalesItem={ totalSalesItem} />
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