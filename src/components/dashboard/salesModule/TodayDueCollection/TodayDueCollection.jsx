import todaySales from './TodayDueCollection.module.scss';
import { useMemo, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";

import useGetDueCollectionSaleData from '../../../../data/saleData/useGetDueCollectionSaleData';
import useCurrentDate from '../../../../data/saleData/useCurrentDate';
import NewFilterOption from '../todaySales/NewFilterOption';
import NewDueCollectionTable from './NewDueCollectionTable';
import usePdfDownloader from '../../../../usePdfDownloader';

const TodayDueCollection = () => {

    const {today} = useCurrentDate()
   
    const [date, setDate] = useState(today);
    
    const {dueCollectionSaleData, isLoading, refetch} = useGetDueCollectionSaleData(date);
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
        const modified = dueCollectionSaleData?.result?.result?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [dueCollectionSaleData?.result])

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
          { label: "Total Today Paid", value: totalTodayPaid },
          { label: "Total Cash Due Collection", value: totalCashDueCollection },
          { label: "Total Bank Due Collection", value: totalBankDueCollection },
          { label: "Total Bkash Due Collection", value: totalBkashDueCollection },
          { label: "Total Nogod Due Collection", value: totalNogodDueCollection },
        ];
            
        const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Due Collection", summaryData, 50)

    return (
        <div className={todaySales.main}>
            <NewFilterOption pdf={handleDownloadPDF} date={date} setDate={setDate} totalCount={totalSalesItem}/>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
            <NewDueCollectionTable isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} totalSalesValue={totalSalesValue} totalSalesItem={totalSalesItem} totalPaid={totalPaid} totalDiscount={totalDiscount} totalBankValue={totalBankDueCollection} totalCashValue={totalCashDueCollection} totalBkashValue={totalBkashDueCollection} totalNogodValue={totalNogodDueCollection} totalTodayPaid={totalTodayPaid}/>

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