import soldProducts from './SoldProduct.module.scss';
import { useMemo, useState } from "react";
import SoldProductTable from "./SoldProductTable";
import useOneMonthSaleDataPaginated from '../../../../data/saleData/useOneMonthSalesDataPaginated';
import NewPagination from '../../pagination/NewPagination';
import NewFilterOption from './NewFilterOption';
import usePdfDownloader from '../../../../usePdfDownloader';

const SoldProduct = () => {

   
   
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [count , setCount] = useState(1);
    
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit:50
    })
    const {saleData, isLoading} = useOneMonthSaleDataPaginated(query, range.from, range.to, pageNumber, range.limit, category );
   
    
   
    
    const totalSalesItem = saleData?.total;
    const totalQuantity = saleData?.summary?.totalSoldQuantity;

     const allProducts = saleData?.result?.flatMap((item,) => item?.products?.map((product) => ({...product, recorderName: item?.recorderName, invoiceBarcode: item?.invoiceBarcode}) ) );
    
  
    const totalCategory = saleData?.totalProductCateogories?.slice().sort((a, b) =>
    a.localeCompare(b)
     
) || [];


     const dataForPdf = useMemo(() => {
        const result = allProducts?.map((product) => {
            
            const profit = Number(product?.actualSalesPrice) - Number(product?.purchasePrice);
    
            return [
                '',
                product?.productName,
                product?.recorderName,
                product?.category,
                `Purchase: ${product?.purchasePrice}\nSale: ${product?.actualSalesPrice}\nQty: ${product?.quantity}\nProfit: ${profit}`,
                `Frame: ${product?.frameType}\nMaterial: ${product?.material}\nSize: ${product?.size}\nShape: ${product?.shape}`,
                product?.barcode,
                product?.invoiceBarcode
            ];
        });
    
        return {
            header: [
                "",
                "Product",
                "Sales By",
                "Category",
                "prices & Qty",
                "Features",
                "Barcode",
                "Invoice"
            ],
            result
        };
    }, [allProducts]);
    
        const summaryData = [
      { label: "Total Sold Quantity", value: totalSalesItem },
      
    ];

    
        
    const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Sold Product", summaryData, 40)



    return (
        <div className={soldProducts.main}>
            <NewFilterOption pdf={handleDownloadPDF} category={category} data={totalSalesItem} handleQuery={query} setHandleQuery={setQuery} range={range} setRange={setRange} setCategory={setCategory} totalCategory={totalCategory} />
            
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'65vh'}}>
                <SoldProductTable paginatedDataContainer={allProducts} isLoading={isLoading} totalSaleQuantity={totalQuantity} />
            </div>
            {
                !isLoading
                &&
                <NewPagination data={saleData} count={count} setCount={setCount} pageNumber={pageNumber} setPageNumber={setPageNumber} limit={50}/>
            }
        </div>
    );
};

export default SoldProduct;