import customerLists from './CustomerList.module.scss';
import { useDispatch } from "react-redux";
import { customerList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import CustomerListTable from "./CutomerListTable";
import useOneMonthSaleDataPaginated from '../../../../data/saleData/useOneMonthSalesDataPaginated';
import NewPagination from '../../pagination/NewPagination';

const CustomerList = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [count, setCount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit:50
    })
    const {saleData, isLoading, refetch} = useOneMonthSaleDataPaginated(query, range.from, range.to, pageNumber, range.limit, '');

   
    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalSalesValue = calculateTotalPrice(total)

    useEffect(() => {
        refetch()
    },[refetch, query, range ])

    return (
        <div  className={customerLists.main}>
            <div className={`${customerLists.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('customerList'))
                    dispatch(customerList(saleData?.result))
                }} title="print" className="uil uil-print"></i>
                <span>Total : {saleData?.total}</span>
                <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                <i onClick={() => setQuery('')} className="uil uil-times"></i>
                <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({...range, from:'', to:''})} className="uil uil-times"></i>
            </div>
            <div className={`${customerLists.titleRes} flex_left`}>
                
                <div style={{marginBottom:"5px"}}>
                    <span>Total : {saleData?.result?.length}</span>
                <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                <i onClick={() => setQuery('')} className="uil uil-times"></i>
                </div>
                <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <CustomerListTable paginatedDataContainer={saleData?.result} isLoading={isLoading} saleData={saleData} totalSalesValue={totalSalesValue} />
            </div>
            <div style={{display: `${isLoading ? 'none' :  'block'}`}}>
                <NewPagination data={saleData} pageNumber={pageNumber} setPageNumber={setPageNumber} count={count} setCount={setCount}  limit={50}/>
            </div>
        </div>
    );
};

export default CustomerList;