import manageSaleList from './ManageSales.module.scss';

import useManageSales from "./useManageSales";
import ManageSaleTable from "./ManageSalesTable";
import { manageSaleUpdateInput } from "./manageSalesUpdateInput";
import FilterOption from "../../salesModule/salesRecord/FilterOption";
import NewPagination from "../../pagination/NewPagination";
import usePdfDownloader from '../../../../usePdfDownloader';
import { useMemo } from 'react';

const ManageSales = () => {
    const {isLoading, updateSupplierData, setUdpateSupplierData,edit,setEdit,editProduct, initialSupplierData,   setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, query, setQuery, totalSalesItem, range, setRange, updatePaymentMethod, setUpdatePaymentMethod, updateProductData, setUpdateProductData, productId, setProductId, initialProductData, setSaleId, handleUpdateProduct, selectProduct, setSelectProduct, saleData, pageNumber, setPageNumber, count, setCount} = useManageSales()

    const summary = saleData?.summary;
    const {totalCash, totalBank, totalBkash, totalNogod, totalSalesValue, totalDiscount, total, totalSoldQuantity} = summary || {}
  
    const dataForPdf = useMemo(() => {
    const result = saleData?.result?.map((sale) => {

        const totalAmount = sale?.products?.reduce(
            (sum, item) => sum + (item.quantity * item.actualSalesPrice),
            0
        );

        const due = totalAmount - Number(sale?.advance) - Number(sale?.discount);

        return [
            sale?.sId,
            `${sale?.customerName}\n${sale?.phoneNumber}`,
            sale?.createdAt?.slice(0, 10),

            // Products (multi-line)
            sale?.products
                ?.map(item => `${item.productName} (${item.quantity}×${item.actualSalesPrice})`)
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
}, [saleData?.result]);

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
    
  const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Manage Sales", summaryData)
  
  
    return (
        <div  className={`${manageSaleList.main} full_width`}>
             <div style={{display:'flex', flexWrap: "wrap"}}  className={`flex_around`}>
                <div className={`${manageSaleList.inputAreaOne} flex_center`}>
                  <div className={`${manageSaleList.container} `}>
                        <div className={`${manageSaleList.titleName}`}>Manage Sale Update</div>
                        <div style={{width: '170px' }}  className={`${manageSaleList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  manageSaleUpdateInput?.slice(0,6).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${manageSaleList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateSupplierData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateSupplierData({...updateSupplierData, [input.value]: e.target.value})}}
                                            required
                                        />
                                      </div>
                                    )
                                  })
                                }
                                <div className={`${manageSaleList.inputFields} flex_between`}>
                                    <label htmlFor="">Payment Method:</label>
                                    <select value={updatePaymentMethod} onChange={(e) => setUpdatePaymentMethod(e.target.value)}>
                                      <option value="">Select Payment Method</option>
                                      <option value="Cash">Cash</option>
                                      <option value="Bank">Bank</option>
                                      <option value="Bkash">Bkash</option>
                                      <option value="Nogod">Nogod</option>
                                    </select>
                                </div>

                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${manageSaleList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${manageSaleList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateSupplierData(initialSupplierData)
                                          setEdit('')
                                          setUpdatePaymentMethod('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${manageSaleList.inputAreaTwo} flex_center`}>
                  <div className={`${manageSaleList.container} `}>
                        <div className={`${manageSaleList.titleName} flex_center`}>Product Update</div>
                        <div style={{width: '135px'}} className={`${manageSaleList.border_remover}`}></div>
                        <br />
                            <div className={`${manageSaleList.inputAreaTwoContainer}`}>
                           
                                  
                            {
                                  manageSaleUpdateInput?.slice(6,9).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${manageSaleList.productInputArea} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateProductData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUpdateProductData({...updateProductData, [input.value]: e.target.value})}}
                                            required
                                        />
                                      </div>
                                    )
                                  })
                            }

                            <div className={`${manageSaleList.inputAreaTwo_footer} flex_right`}>
                                  <div className={`${manageSaleList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {selectProduct ? <button onClick={handleUpdateProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {selectProduct ? <button onClick={() => {
                                          setUpdateProductData(initialProductData)
                                          setSelectProduct('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                             
                                  </div>
                          </div>
                                  
                                  
                            </div>
                  </div>
                </div>
              </div>
              
              <FilterOption downloadPdf={handleDownloadPDF} range={range} setRange={setRange} handleQuery={query} setHandleQuery={setQuery} totalSalesItem={totalSalesItem}/>
          <section className={`${manageSaleList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: "32vh"}}  className={`${manageSaleList.tableArea}`}>
              <ManageSaleTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={saleData?.result} setEdit={setEdit} edit={edit} showData={saleData?.result} setUpdateProductData={setUpdateProductData} productId={productId} setProductId={setProductId} setSaleId={setSaleId} selectProduct={selectProduct} setSelectProduct={setSelectProduct} />
          </section>
           {
            !isLoading
            &&
            <NewPagination data={saleData} limit={range.limit} pageNumber={pageNumber} setPageNumber={setPageNumber} count={count} setCount={setCount} />
           }      
        </div>
    );
};

export default ManageSales;