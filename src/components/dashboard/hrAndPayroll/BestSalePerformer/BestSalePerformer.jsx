import bestSalePerfomer from './BestSalePerfomer.module.scss';


import { useMemo, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
// import useSaleData from "../../../../data/saleData/useSaleData";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import BestSalePerformerTable from "./BestSalePerfomerTable";
import FilterOption from '../../salesModule/salesRecord/FilterOption';
import usePdfDownloader from '../../../../usePdfDownloader';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const BestSalePerformer = () => {

  
   
    const [handleQuery, setHandleQuery] = useState('');
 
    const [range, setRange] = useState({
        from: '',
        to: ''
    })

    const {saleData,isLoading, refetch} = useOneMonthSaleData(handleQuery, range.from, range.to);

    const formatSalesData = (salesData) => {
        if (!salesData || !Array.isArray(salesData)) {
          return []; 
        }
      
        const salesBy = salesData.reduce((acc, sale) => {
          const recorder = sale?.recorderName;
      
          const totalSale = sale.products?.reduce((sum, product) => {
            return sum + (product.actualSalesPrice || 0) * (product.quantity || 0);
          }, 0);
          
      
          acc[recorder] = (acc[recorder] || 0) + totalSale;
          return acc;
        }, {});
      
        return Object.entries(salesBy).map(([salesBy, totalSale]) => ({
          salesBy,
          totalSale,
        }));
      };

      
      const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
      const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
      // eslint-disable-next-line no-unused-vars
      const [paginatedIndex,setPaginatedIndex] = useState()
   
    
    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    
    const totalSalesValue = calculateTotalPrice(total)
    
    useEffect(() => {
        const modified = formatSalesData(saleData?.result)?.sort((a,b) => b?.totalSale - a?.totalSale)?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [saleData?.result])

    useEffect(() => {
        refetch()
    },[refetch,handleQuery, range]);

     const dataForPdf = useMemo(() => {
        const result = modifiedProductDataWithIndexId?.map((sale) => {

            return [
                sale?.indexId,
                sale?.salesBy,
                sale?.totalSale,
            ];
        });
    
        return {
            header: [
                "SL",
                "Sales By",
                "Total Amount"
            ],
            result
        };
    }, [modifiedProductDataWithIndexId]);
    
    
    // ];
        
        const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Best Saler", [], 30)


    return (
        <div className={bestSalePerfomer.main}>
            <FilterOption downloadPdf={handleDownloadPDF} handleQuery={handleQuery} setHandleQuery={setHandleQuery} range={range} setRange={setRange} totalSalesItem={saleData?.result?.length} />
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <BestSalePerformerTable paginatedDataContainer={paginatedDataContainer} isLoading={isLoading}  totalSalesValue={totalSalesValue} />
            </div>
            {
                !isLoading
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={20}/>
            }
        </div>
    );
};

export default BestSalePerformer;