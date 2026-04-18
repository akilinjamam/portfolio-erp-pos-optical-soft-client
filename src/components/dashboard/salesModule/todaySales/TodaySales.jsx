import todaySales from './TodaySales.module.scss';
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";

import useGetLastSalesAndAccountsData from "../../../../data/accountsData/useGetLastSalesAccountsData";

import useCurrentDate from '../../../../data/saleData/useCurrentDate';
import NewFilterOption from './NewFilterOption';
import usePdfDownloader from '../../../../usePdfDownloader';
import NewTodaySalesTable from './TodaySalesTable';

const TodaySales = () => {


    const {today} = useCurrentDate()
   
    const [date, setDate] = useState(today);
    

    const {lastSaleAndAccountsData, totalBankValue, totalBkashValue, totalNogodValue, totalCashValue, totalCashPaidValue, totalBankPaidValue, totalBkashPaidValue, totalNogodPaidValue, isLoading, refetch} = useGetLastSalesAndAccountsData(date);
    
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars

    const total = lastSaleAndAccountsData?.result?.allSalesDetail?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const soldQty = lastSaleAndAccountsData?.result?.allSalesDetail?.map(sale => calculateTotalPrice(sale?.products?.map(item => Number(item?.quantity))));
    const totalSoldQty = calculateTotalPrice(soldQty);
    const totalPaid = calculateTotalPrice(lastSaleAndAccountsData?.result?.allSalesDetail?.map(sale => Number(sale?.advance)))
    const totalDiscount = calculateTotalPrice(lastSaleAndAccountsData?.result?.allSalesDetail?.map(sale => Number(sale?.discount)))

    const totalTodayPaid = calculateTotalPrice(lastSaleAndAccountsData?.result?.allSalesDetail?.map(sale => Number(sale?.advance)))

    
  
    const totalSalesValue = calculateTotalPrice(total)
    const totalSalesItem = lastSaleAndAccountsData?.result?.allSalesDetail?.length;
    
    
    useEffect(() => {
        const modified = lastSaleAndAccountsData?.result?.allSalesDetail?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        if(lastSaleAndAccountsData?.result?.allSalesDetail?.length > 0) {
            setModifiedProductDataWithIndexId(modified)
        }else{
            setModifiedProductDataWithIndexId([])
        }
    }, [lastSaleAndAccountsData?.result])


    useEffect(() => {
        refetch()
    },[refetch, date])


     const dataForPdf = useMemo(() => {
        const result = modifiedProductDataWithIndexId?.map((sale) => {
    
            const totalAmount = sale?.products?.reduce(
                (sum, item) => sum + (item.quantity * item.actualSalesPrice),
                0
            );
    
            const due = totalAmount - Number(sale?.advance) - Number(sale?.discount);
    
            return [
                sale?.indexId,
                `${sale?.customerName}\n${sale?.phoneNumber}`,
                sale?.createdAt?.slice(0, 10),
    
                // Products (multi-line)
                sale?.products
                    ?.map(item => `${item.productName} (${item.quantity}×${item.actualSalesPrice})`)
                    .join("\n"),
    
                // Summary (multi-line)
                `Total: ${totalAmount}\nPaid: ${sale?.advance}\nDue: ${due}\nDiscount: ${sale?.discount}`,
                sale?.delivered,
                `ReferredBy: ${sale?.referredBy}\nSold By: ${sale?.recorderName}`,
                sale?.invoiceBarcode
            ];
        });
    
        return {
            header: [
                "SL",
                "Customer",
                "Date",
                "Products",
                "Summary",
                "Status",
                "Engaged By",
                "Invoice"
            ],
            result
        };
    }, [modifiedProductDataWithIndexId]);
    
        const summaryData = [
      { label: "Total Sales", value: totalSalesValue },
      { label: "Total Paid", value: totalPaid },
      { label: "Total Due", value: totalSalesValue - totalPaid - totalDiscount },
      { label: "Total Discount", value: totalDiscount },
    ];
        
            const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Sales Record", summaryData, 40)

    return (
        <div className={todaySales.main}>
            {/* filter option start */}
            <NewFilterOption pdf={handleDownloadPDF} date={date} setDate={setDate} totalCount={lastSaleAndAccountsData?.result?.allSalesDetail?.length}  />
            {/* filter option end */}
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <NewTodaySalesTable totalSold={totalSoldQty} paginatedDataContainer={lastSaleAndAccountsData?.result?.allSalesDetail} isLoading={isLoading} totalSalesValue={totalSalesValue} totalSalesItem={ totalSalesItem} totalPaid={totalPaid} totalDiscount={totalDiscount} totalTodayPaid={totalTodayPaid} totalCashValue={totalCashValue} totalBankValue={totalBankValue} totalBkashValue={totalBkashValue} totalNogodValue={totalNogodValue} totalCashPaidValue={totalCashPaidValue} totalBankPaidValue={totalBankPaidValue} totalBkashPaidValue={totalBkashPaidValue} totalNogodPaidValue={totalNogodPaidValue}/>
            </div>
        </div>
    );
};

export default TodaySales;