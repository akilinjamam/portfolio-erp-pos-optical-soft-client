import salesRecord from './CashFlowSummery.module.scss';
import { useDispatch } from "react-redux";
import {  addCashFlowData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useEffect, useState } from "react";

// import useSaleData from "../../../../data/saleData/useSaleData";

import CashFlowSummeryTable from "./CashFlowSummeryTable";
import useCombineSalesAnalysis from '../../business_monitor/sales_analysis/useCombineSalesAnalysis';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const CashFlowSummery = () => {

    const dispatch = useDispatch();
    
    const [month, setMonth] = useState('');

    const date = new Date();
    const yearMonth = `${date?.getFullYear() + '-' + (date?.getMonth() + 1)?.toString()?.padStart(2, '0')}`;
    console.log(yearMonth)
    const {finalMergedData, isLoading,refetch, refetchAcc, refetchFinalAcc, refetchPayroll, refetchVendor} = useCombineSalesAnalysis(month ? month : yearMonth);

    useEffect(() => {
        refetch()
        refetchAcc()
        refetchFinalAcc()
        refetchPayroll()
        refetchVendor()
    }, [month, refetch, refetchAcc, refetchFinalAcc, refetchPayroll, refetchVendor])
    
    return (
        <div className={salesRecord.main}>
            <div className={`${salesRecord.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('cash-flow-summery'))
                    dispatch(addCashFlowData(finalMergedData))
                }} title="print" className="uil uil-print"></i>
                <span>Total : </span>
               
               
                <label htmlFor="">Search By Month: </label>
                <input value={month} type="month" name="" id="" onChange={(e) => setMonth(e.target.value)}/>
               
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh',}}>
                <CashFlowSummeryTable tableScroll={false} paginatedDataContainer={finalMergedData} isLoading={isLoading} />
            </div>
           
        </div>
    );
};

export default CashFlowSummery;