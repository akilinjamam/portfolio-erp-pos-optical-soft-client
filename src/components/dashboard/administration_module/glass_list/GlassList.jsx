// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import {  textInput } from "../product_entry/productInput";
import glassList from './GlassList.module.scss';
import useGlassList from "./useGlassList";
import NewFilterOption from "../product_list/NewFilterOption";
import NewPagination from "../../pagination/NewPagination";
import NewProductListTable from "../product_list/NewProductListTable";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import usePdfDownloader from "../../../../usePdfDownloader";
import { useMemo } from "react";
const GlassList = () => {
    const {  updateProductData, setUdpateProductData,edit,setEdit,editProduct, initialProductData, uploading, setUploading,setImgHolder, imgHolder,  setQuery,query, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,  range ,setRange, pageNumber, setPageNumber, count, setCount, products, isLoading} = useGlassList();

    const allSales = calculateTotalPrice(products?.result?.map((item) => (Number(item?.salesPrice) * Number(item?.quantity))));
    const allPurchase = calculateTotalPrice(products?.result?.map((item) => (Number(item?.purchasePrice) * Number(item?.quantity))));
    const totalStock = calculateTotalPrice(products?.result?.map((item) => (Number(item?.stockAmount))));
    const availableStock = calculateTotalPrice(products?.result?.map((item) => (Number(item?.quantity))));
    
   
    
  const summary = {
    totalSalesPrice : allSales,
    totalPurchasePrice : allPurchase,
    totalStock: totalStock,
    totalQuantity: availableStock
  }

    const productData = products?.result?.map((item, index) => {
      return {...item, sId:index+1}
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
        
      const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Glass List", summaryData)

    // const dispatch = useDispatch();

    // const handlBarcode = () => {
    //   dispatch(openModal('barcode'));
    //   dispatch(openBarcode(productData))
    // }

    // const contentToPrint = useRef(null);
    // const handlePrint = useReactToPrint({
    //     documentTitle: "Print This Document",
    //     onBeforePrint: () => console.log("before printing..."),
    //     onAfterPrint: () => console.log("after printing..."),
    //     removeAfterPrint: true,
    // });
    return (
        <div  className={`${glassList.main} full_width`}>
             <div style={{display:'flex', flexWrap: "wrap"}}  className={`flex_around`}>
                <div className={`${glassList.inputAreaOne} flex_center`}>
                  <div className={`${glassList.container} `}>
                        <div className={`${glassList.titleName}`}>Product Update</div>
                        <div style={{width: '135px' }}  className={`${glassList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  textInput?.slice(0,6).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${glassList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateProductData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateProductData({...updateProductData, [input.value]: e.target.value})}}
                                            required
                                        />
                                    </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'49%', marginLeft:'15px'}}>
                                
                                {(updateProductData?.category === 'Glass') &&
                                  textInput?.slice(8,12)?.map((select, index) => {
                                    return (
                                    <div key={index+1} className={`${glassList.inputFields} flex_between`} >
                                          <label htmlFor="">{select?.placeholder}:</label>
                                          <input value={updateProductData[select.value]} type="text" name="" id="" 
                                          onChange={(e) => {setUdpateProductData({...updateProductData, [select.value] : e.target.value})}}
                                          required
                                          />
                                    </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                      
                            <div className={`${glassList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${glassList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateProductData(initialProductData)
                                          setEdit('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${glassList.inputAreaTwo} flex_center`}>
                  <div className={`${glassList.container} `}>
                        <div className={`${glassList.titleName} flex_center`}>Update Image</div>
                        <div style={{width: '120px'}} className={`${glassList.border_remover}`}></div>
                        <br />
                            <div className={`${glassList.inputAreaTwoContainer}`}>
                            {updateProductData?.img ? <img height={125} width={125} src={imgHolder ? imgHolder : updateProductData?.img} alt="" /> :  <i className="uil uil-image-upload"></i> }
                                  {
                                        textInput?.slice(7,8).map((input, index) => {
                                          return (
                                            <div key={index+1} className={`${glassList.inputFields}`}>
                                            
                                              {
                                                edit 
                                                ?
                                                <input className='custom-file-input'  type={input?.type} 
                                                  onChange={(e) => {
                                                    const img = e.target.files[0];
                                                  updloadCloudinaryImage(img,setImgHolder,setUploading)
                                                    
                                                  }
                                              }
                                              />
                                              :
                                              ''
                                              }
                                          </div>
                                          )
                                        })
                                  }

                                  <div className={`${glassList.uploading}`}>
                                      {uploading ? 'uploading...' : ''}
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
          <NewFilterOption pdf={handleDownloadPDF}  setHandleQuery={setQuery} handleQuery={query} data={products} range={range} setRange={setRange}  />
          
          <section style={{height: '35vh'}}  className={`${glassList.tableArea}`}>
              <NewProductListTable edit={edit} idsForDelete={idsForDelete} paginatedDataContainer={productData} selectDeleted={selectDeleted} setEdit={setEdit} setIdsForDelete={setIdsForDelete} setSelectDeleted={setSelectDeleted} summary={summary} />
              
          </section>
           {
            !isLoading
            &&
            <NewPagination data={products} count={count} setCount={setCount} pageNumber={pageNumber} setPageNumber={setPageNumber} limit={range.limit} />
           }      
        </div>
    );
};

export default GlassList;