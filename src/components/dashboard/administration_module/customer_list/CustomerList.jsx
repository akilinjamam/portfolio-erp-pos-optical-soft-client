import customerLists from './CustomerList.module.scss';
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import CustomerListTable from "./CutomerListTable";
import useOneMonthSaleDataPaginated from '../../../../data/saleData/useOneMonthSalesDataPaginated';
import NewPagination from '../../pagination/NewPagination';
import FilterOption from '../../salesModule/salesRecord/FilterOption';
import usePdfDownloader from '../../../../usePdfDownloader';

const CustomerList = () => {

    const [query, setQuery] = useState('');
    const [count, setCount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit:30
    })
    const {saleData, isLoading, refetch} = useOneMonthSaleDataPaginated(query, range.from, range.to, pageNumber, range.limit, '');

    const {saleData:saleDataForPdf} = useOneMonthSaleDataPaginated(query, range.from, range.to, pageNumber, 1000, '');

   
    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalSalesValue = calculateTotalPrice(total)

    useEffect(() => {
        refetch()
    },[refetch, query, range ]);


    const dataForPdf = useMemo(() => {
    const result = saleDataForPdf?.result?.map((customer) => {
        const { rightSph, rightCyl, rightAxis, leftSph, leftCyl, leftAxis, rightNear, leftNear } = customer || {};
        
        const totalAmount = customer?.products?.reduce(
            (sum, item) => sum + (item.quantity * item.actualSalesPrice),
            0
        );
        const due = totalAmount - Number(customer?.advance) - Number(customer?.discount);

        // FORMULATE THE STRING HERE
        const eyePower = `R:${rightSph === 'blank' ? '0' : rightSph}×${rightCyl === 'blank' ? '0' : rightCyl}×${rightAxis === 'blank' ? '0' : rightAxis}\nL:${leftSph === 'blank' ? '0' : leftSph}×${leftCyl === 'blank' ? '0' : leftCyl}×${leftAxis === 'blank' ? '0' : leftAxis}\nNear:${rightNear === 'blank' ? '0' : rightNear}×${leftNear === 'blank' ? '0' : leftNear}`;

        
        return [
            customer?.sId,                                 
            `${customer?.customerName}\n${customer?.phoneNumber}\n${customer?.createdAt?.slice(0,10)}`,
            customer?.address,                              
            customer?.invoiceBarcode,                      
            totalAmount,                                  
            customer?.advance,                              
            due,                                            
            eyePower                                     
        ];
    });

    return {
        header: [
            "SL",
            "Name & phone",
            "Customer Address",
            "Invoice Number",
            "Total Sales",
            "Paid",
            "Due",
            "Sph×Cyl×Axis"
        ],
        result
    };
}, [saleDataForPdf]);

    const today = new Date().toLocaleDateString();
    const summaryData = [
        {label: "Total Sales", value: saleData?.summary?.totalSalesValue},
    ];

    const from =
  saleDataForPdf?.result?.length > 0
    ? saleDataForPdf.result[saleDataForPdf.result.length - 1]?.createdAt?.slice(0, 10)
    : "";

const to =
  saleDataForPdf?.result?.length > 0
    ? saleDataForPdf.result[0]?.createdAt?.slice(0, 10)
    : "";

    const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, `Customer List-${today}`, summaryData, 35, from, to);


    return (
        <div  className={customerLists.main}>
            <FilterOption downloadPdf={handleDownloadPDF} range={range} setRange={setRange} setHandleQuery={setQuery} handleQuery={query} totalSalesItem={saleData?.total} />
            
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'vh',height:'65vh' }}>
                <CustomerListTable paginatedDataContainer={saleData?.result} isLoading={isLoading} saleData={saleData} totalSalesValue={totalSalesValue} />
            </div>
            <div style={{display: `${isLoading ? 'none' :  'block'}`}}>
                <NewPagination data={saleData} pageNumber={pageNumber} setPageNumber={setPageNumber} count={count} setCount={setCount}  limit={50}/>
            </div>
        </div>
    );
};

export default CustomerList;