
import stock from  './Stock.module.scss'
import { useMemo, useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { useEffect } from "react";
import NewPagination from "../../pagination/NewPagination";
import NewFilterOption from "../../administration_module/product_list/NewFilterOption";
import NewStockTable from "./NewStockTable";
import usePdfDownloader from '../../../../usePdfDownloader';


const Stock = () => {

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
        priceFrom:'',
        priceTo:'',
        inStock: '',
        limit: 50
    });
    const [pageNumber, setPageNumber] = useState(1)
    const {products, isLoading, refetch} = useProductData(query, range.from, range.to, range.priceFrom, range.priceTo, pageNumber, range.limit, range.inStock);

    
    // eslint-disable-next-line no-unused-vars
    const [count, setCount] = useState(1);
    

    useEffect(() => {
        refetch()
    }, [query, range.from, range.to, range.inStock,refetch]);

    const summary = {
      totalPurchasePrice: products?.totalPurchasePrice,
      totalSalesPrice: products?.totalSalesPrice,
      totalStock: products?.totalStock,
      totalQuantity: products?.totalQuantity,
    }

     const dataForPdf = useMemo(() => {
    const result = products?.result?.map((product) => {

        return [
            product?.sId,
            `${product?.productName}\n${product?.createdAt?.slice(0, 10)}`,
            `Total: ${product?.stockAmount}\nStockout: ${Number(product?.stockAmount) - Number(product?.quantity)}\nAvailable: ${product?.quantity}`,
            `Sales Price: ${product?.salesPrice}\nPurchase Price: ${product?.purchasePrice}\nCategory: ${product?.category}`,
            `Size: ${product?.size}\nMaterial: ${product?.material}\nFrame Type: ${product?.frameType}\nFrame Shape: ${product?.shape}\nPower: ${product?.power}`,
            `Supplier: ${product?.supplierName}\nCollector: ${product?.collectorName}\nRecorder: ${product?.recorderName}`,
            product?.barcode
        ];
    });

    return {
        header: [
            "SL",
            "Product Details",
            "Stock",
            "Pricing & Category",
            "Features",
            "Engaged By",
            "Barcode"
        ],
        result
    };
}, [products]);

const {totalSalesPrice, totalPurchasePrice, totalStock, totalQuantity} = summary || {}


const summaryData = [
  { label: "Total Sales", value: totalSalesPrice },
  { label: "Total Purchase", value: totalPurchasePrice },
  { label: "Total Stock", value: totalStock},
  { label: "Available Quantity", value: totalQuantity }
];
    
  const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Stock List", summaryData)
   
    
    return (
        <div className={`${stock.main}`} >
                <NewFilterOption pdf={handleDownloadPDF} setHandleQuery={setQuery} handleQuery={query} data={products} range={range} setRange={setRange} />
            <div className={`${stock.titleBar} flex_left`}>
            
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'65vh'}}>
                <NewStockTable isLoading={isLoading}  paginatedDataContainer={products?.result} summary={summary} />
            </div>
             {
            !isLoading  
            &&
            <NewPagination data={products} limit={range.limit} setPageNumber={setPageNumber} pageNumber={pageNumber} count={count} setCount={setCount} />
           }  
        </div>
    );
};

export default Stock;

