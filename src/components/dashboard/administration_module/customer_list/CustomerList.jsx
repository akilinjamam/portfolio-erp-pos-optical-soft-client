import customerLists from './CustomerList.module.scss';
import { useDispatch } from "react-redux";
import { customerList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import CustomerListTable from "./CutomerListTable";
import useSaleData from '../../../../data/saleData/useSaleData';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const CustomerList = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: ''
    })
    const {saleData, isLoading, refetch} = useSaleData(query, range.from, range.to);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedSaleDataWithIndexId,setModifiedSaleDataWithIndexId] = useState([])
    const [paginatedIndex,setPaginatedIndex] = useState()
    console.log(paginatedIndex)

    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalSalesValue = calculateTotalPrice(total)

    useEffect(() => {
        const modified = saleData?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedSaleDataWithIndexId(modified)
    }, [saleData?.result])

    useEffect(() => {
        refetch()
    },[refetch, query ])

    return (
        <div  className={customerLists.main}>
            <div className={`${customerLists.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('customerList'))
                    dispatch(customerList(modifiedSaleDataWithIndexId))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {saleData?.total}</span>
                <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                <i onClick={() => setQuery('')} className="uil uil-times"></i>
                <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <CustomerListTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading} saleData={saleData} totalSalesValue={totalSalesValue} />
            </div>
            <div style={{display: `${isLoading ? 'none' :  'block'}`}}>
                <Pagination showData={modifiedSaleDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
            </div>
        </div>
    );
};

export default CustomerList;