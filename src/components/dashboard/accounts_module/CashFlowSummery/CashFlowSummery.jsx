import salesRecord from './CashFlowSummery.module.scss';
import { useEffect, useMemo, useState } from "react";

// import useSaleData from "../../../../data/saleData/useSaleData";

import CashFlowSummeryTable from "./CashFlowSummeryTable";
import useCombineSalesAnalysis from '../../business_monitor/sales_analysis/useCombineSalesAnalysis';
import NewFilterOption from './NewFilterOption';
import usePdfDownloader from '../../../../usePdfDownloader';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const CashFlowSummery = () => {

    const [month, setMonth] = useState('');

    const date = new Date();
    const yearMonth = `${date?.getFullYear() + '-' + (date?.getMonth() + 1)?.toString()?.padStart(2, '0')}`;
    console.log(yearMonth)
    const {finalMergedData, isLoading,refetch, refetchAcc, refetchFinalAcc, refetchPayroll, refetchVendor} = useCombineSalesAnalysis(month ? month : yearMonth);

    const totalProfitAllocation = finalMergedData?.map((sale) => (sale?.bank + sale?.bkash + sale?.nogod + (sale?.profitAllocation - sale?.cashOver - sale?.deficit)) -(sale?.totalFixedExpense) -(sale?.payrollPaid) - (sale?.vendorPaid)).reduce((acc, item) => acc + item, 0);

    useEffect(() => {
        refetch()
        refetchAcc()
        refetchFinalAcc()
        refetchPayroll()
        refetchVendor()
    }, [month, refetch, refetchAcc, refetchFinalAcc, refetchPayroll, refetchVendor])

    const dataForPdf = useMemo(() => {
    const result = finalMergedData?.map((vendor, index) => {
        
                const bankDeposit = (vendor?.profitAllocation + vendor?.cashOver) - vendor?.deficit
                const otherPaymentMethod = `${vendor?.bank}+${vendor?.bkash}+${vendor?.nogod}\n=${vendor?.bank +vendor?.bkash + vendor?.nogod}` 
                const deficitAndCashover = `${vendor?.deficit}/${vendor.cashOver}`
                const profitAllocations = `${(vendor?.bank + vendor?.bkash + vendor?.nogod + (vendor?.profitAllocation - vendor?.cashOver - vendor?.deficit)) -(vendor?.totalFixedExpense) -(vendor?.payrollPaid) - (vendor?.vendorPaid)}`
        
                return [
                    `${index+1}`,
                    vendor?.date,
                    vendor?.sales,
                    `Cash: ${vendor?.cashSalesAmount}\nDue: ${vendor?.dueCollecction}`,
                    `Total Due: ${vendor?.totalDue}\nDiscount: ${vendor?.discount}`,
                    `Cash: ${vendor?.totalExpense}\nFixed: ${vendor?.totalFixedExpense}\nPayroll: ${vendor?.payrollPaid}\nVendor: ${vendor?.vendorPaid}`,
                    `Begining ${vendor?.beginingCash}\nEnding: ${vendor?.endingCash}`,
                    bankDeposit,
                    otherPaymentMethod,
                    vendor?.extraProfitAmount,
                    deficitAndCashover,
                    profitAllocations
                ];
            });
        
            return {
                header: [
                    "SL",
                    "Date",
                    "Total Sales",
                    "Collections",
                    "Due & Discount",
                    "Expenses",
                    "Cash Cycle",
                    "Bank Deposit",
                    "Cash/Bkash/Nogod",
                    "Extra Profit",
                    "Deficit/Cashover",
                    "Profit Allocation",
                ],
                result
            };
        }, [finalMergedData]);
        
           
            
            const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "C Flow", [], 30)

    
    return (
        <div className={salesRecord.main}>
            <NewFilterOption downloadPdf={handleDownloadPDF} setMonth={setMonth} month={month} total={finalMergedData?.length} />
           
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh',}}>
                <CashFlowSummeryTable tableScroll={false} paginatedDataContainer={finalMergedData} isLoading={isLoading} totalProfitAllocation={totalProfitAllocation} showReport={false}/>
            </div>
           
        </div>
    );
};

export default CashFlowSummery;