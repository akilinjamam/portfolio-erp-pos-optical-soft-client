import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useDispatch } from "react-redux";
import { addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import FilterOption from "./FilterOption";
import useOneMonthSaleDataPaginated from "../../../../data/saleData/useOneMonthSalesDataPaginated";
import NewPagination from "../../pagination/NewPagination";
import usePdfDownloader from "../../../../usePdfDownloader";
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const SalesRecord = () => {

    const dispatch = useDispatch();
   
    const [handleQuery, setHandleQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [count, setCount] = useState(1);
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit: 30
    })

    // paginated data from server
    const {saleData, refetch, isLoading} = useOneMonthSaleDataPaginated(handleQuery, range.from, range.to, pageNumber, range.limit, '');
    const {saleData:saleDataForPdf} = useOneMonthSaleDataPaginated(handleQuery, range.from, range.to, pageNumber, 1200, '' );
    const summary = saleData?.summary;
    const {
    totalCash = 0,
    totalBank = 0,
    totalBkash = 0,
    totalNogod = 0,
    totalSalesValue = 0,
    totalDiscount = 0,
    total = 0,
    totalSoldQuantity = 0
} = summary || {};


    useEffect(() => {
        refetch()
        setPageNumber(1)
    },[refetch,handleQuery, range]);


    const dataForPdf = useMemo(() => {
    const result = saleDataForPdf?.result?.map((sale) => {

        const totalAmount = sale?.products?.reduce(
            (sum, item) => sum + (item?.quantity * item?.actualSalesPrice),
            0
        );

        const due = totalAmount - Number(sale?.advance || 0) - Number(sale?.discount || 0);

        return [
            sale?.sId,
            `${sale?.customerName}\n${sale?.phoneNumber}`,
            sale?.createdAt?.slice(0, 10),

            // Products (multi-line)
            sale?.products
                ?.map(item => `${item?.productName} (${item?.quantity}×${item?.actualSalesPrice})`)
                .join("\n"),

            // Summary (multi-line)
            `Total: ${totalAmount}\nPaid: ${sale?.advance}\nDue: ${due}\nDiscount: ${sale?.discount}`,

            sale?.delivered,
            sale?.referredBy,
            sale?.recorderName,
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
            "Referred By",
            "Sold By",
            "Invoice"
        ],
        result
    };
}, [saleDataForPdf?.result]);

    const summaryData = [
  { label: "Total Sales", value: totalSalesValue },
  { label: "Total Paid", value: total },
  { label: "Total Due", value: totalSalesValue - total - totalDiscount },
  { label: "Total Discount", value: totalDiscount },

  { label: "Sold Qty", value: totalSoldQuantity },
  { label: "Cash", value: totalCash },
  { label: "Bank", value: totalBank },
  { label: "Bkash", value: totalBkash },
  { label: "Nogod", value: totalNogod },
];

const today = new Date().toLocaleDateString();

const from =
  saleDataForPdf?.result?.length > 0
    ? saleDataForPdf.result[saleDataForPdf.result.length - 1]?.createdAt?.slice(0, 10)
    : "";

const to =
  saleDataForPdf?.result?.length > 0
    ? saleDataForPdf.result[0]?.createdAt?.slice(0, 10)
    : "";
    
const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, `Sales Record-${today}`, summaryData,60, from, to)

    return (
        <div className={salesRecord.main}>
            <FilterOption downloadPdf={handleDownloadPDF} dispatch={dispatch}  openModal={openModal} addSalesData={addSalesData} modifiedProductDataWithIndexId={saleData?.result} totalSalesItem={saleData?.total} totalSalesValue={totalSalesValue} totalPaid={total} totalDiscount={totalDiscount} totalCashValue={totalCash} totalBankValue={totalBank} totalBkashValue={totalBkash} totalNogodValue={totalNogod} totalSalesQuantity={totalSoldQuantity} handleQuery={handleQuery} setHandleQuery={setHandleQuery} range={range} setRange={setRange} />
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'68vh', width: "99%", margin:"auto"}}>
                <SalesRecordTable paginatedDataContainer={saleData?.result} isLoading={isLoading} saleData={saleData?.result} totalSalesValue={totalSalesValue} totalSalesItem={ saleData?.total} totalPaid={total} totalDiscount={totalDiscount} totalCashValue={totalCash} totalBankValue={totalBank} totalBkashValue={totalBkash} totalNogodValue={totalNogod} totalSalesQuantity={totalSoldQuantity} />
            </div>
            {
                !isLoading
                &&
                <NewPagination data={saleData} limit={range.limit} setPageNumber={setPageNumber} pageNumber={pageNumber} count={count} setCount={setCount} />
            }
        </div>
    );
};

export default SalesRecord;