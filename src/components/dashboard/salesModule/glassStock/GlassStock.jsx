import glassStock from  './GlassStock.module.scss'
import { useMemo, useState } from "react";

import useGlassProductData from '../../../../data/productData/useProductGlassData';

import NewFilterOption from '../../administration_module/product_list/NewFilterOption';
import NewPagination from '../../pagination/NewPagination';
import NewStockTable from '../stock/NewStockTable';
import usePdfDownloader from '../../../../usePdfDownloader';
import { calculateTotalPrice } from '../../../calculation/calculateSum';


const GlassStock = () => {

    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [range, setRange] = useState({
        from: '',
        to: '',
        inStock: '',
        limit:50
    });
    const {products, isLoading} = useGlassProductData(query, range.from, range.to, '', '', pageNumber, range.limit, range.inStock);

     const allSales = calculateTotalPrice(products?.result?.map((item) => (Number(item?.salesPrice) * Number(item?.quantity))));
        const allPurchase = calculateTotalPrice(products?.result?.map((item) => (Number(item?.purchasePrice) * Number(item?.quantity))));
        const totalStock = calculateTotalPrice(products?.result?.map((item) => (Number(item?.stockAmount))));
        const availableStock = calculateTotalPrice(products?.result?.map((item) => (Number(item?.quantity))));
    
    const summary = {
        totalSalesPrice: allSales,
        totalPurchasePrice: allPurchase,
        totalStock,
        totalQuantity: availableStock
    }

    const productData = products?.result?.map((item, index) => {
        return {...item, sId: index+1 };
    })



    const dataForPdf = useMemo(() => {
            const result = productData?.map((product) => {
        
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
        }, [productData]);
      
        
        const summaryData = [
          { label: "Total Sales", value: allSales },
          { label: "Total Purchase", value: allPurchase },
          { label: "Total Stock", value: totalStock},
          { label: "Available Quantity", value: availableStock }
        ];
            
        const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Glass Stock", summaryData, 40)
      

    const [count, setCount] = useState(1);
    
    return (
        <div className={`${glassStock.main}`} >
            <NewFilterOption pdf={handleDownloadPDF}  data={products?.total} handleQuery={query} setHandleQuery={setQuery} range={range} setRange={setRange} />
            <div className={`${glassStock.titleBar} flex_left`}>
                {/* <FilterOption dispatch={dispatch} addStockData={addStockData} filteredStock={filteredStock} openModal={openModal} query={query} setQuery={setQuery} stocks={stocks} setStocks={setStocks} range={range} setRange={setRange} /> */}
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'70vh'}}>
                <NewStockTable isLoading={isLoading} paginatedDataContainer={productData} summary={summary} />
            </div>
            <NewPagination data={products} pageNumber={pageNumber} setPageNumber={setPageNumber} count={count} limit={50}  setCount={setCount} />
        </div>
    );
};

export default GlassStock;

