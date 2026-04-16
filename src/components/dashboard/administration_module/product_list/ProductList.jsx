// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { optionField, textInput } from "../product_entry/productInput";
import productList from './ProductList.module.scss';
import useProductList from "./useProductList";

import NewPagination from "../../pagination/NewPagination";
import NewFilterOption from "./NewFilterOption";
import NewProductListTable from "./NewProductListTable";
import CommonLoading from "../../../commonLoagin/CommonLoading";
import { useMemo } from "react";
import usePdfDownloader from "../../../../usePdfDownloader";
const ProductList = () => {
    const {products,isLoading, updateProductData, setUdpateProductData,edit,setEdit,editProduct, initialProductData, uploading, setUploading,setImgHolder, imgHolder,   setQuery,query, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,  range ,setRange, data, pageNumber, setPageNumber, count, setCount,} = useProductList();
    const productData = data

    const summary = {
      totalPurchasePrice: products?.totalPurchasePrice,
      totalSalesPrice: products?.totalSalesPrice,
      totalStock: products?.totalStock,
      totalQuantity: products?.totalQuantity,
    }


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

const {totalSalesPrice, totalPurchasePrice, totalStock, totalQuantity} = summary || {}


const summaryData = [
  { label: "Total Sales", value: totalSalesPrice },
  { label: "Total Purchase", value: totalPurchasePrice },
  { label: "Total Stock", value: totalStock},
  { label: "Available Quantity", value: totalQuantity }
];
    
  const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Product List", summaryData)

  
    return (
        <div  className={`${productList.main} full_width`}>
            {/* just make change here only UI */}
             <div style={{display:"flex", flexWrap:"wrap"}}  className={`flex_around`}>
                <div className={`${productList.inputAreaOne} flex_center`}>
                  <div className={`${productList.container} `}>
                        <div className={`${productList.titleName}`}>Product Update</div>
                        <div style={{width: '135px' }}  className={`${productList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  textInput?.slice(0,7).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${productList.inputFields} flex_between`}>
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
                                {(updateProductData?.category === 'Optical Frame') &&
                                  optionField?.map((select, index) => {
                                    return (
                                    <div key={index+1} className={`${productList.inputFields} flex_between`} >
                                          <label htmlFor="">{select?.placeholder}:</label>
                                          <select value={updateProductData[select.variable]}  name="" id="" 
                                          onChange={(e) => {setUdpateProductData({...updateProductData, [select.variable] : e.target.value})}}
                                          required
                                          >
                                            <option value="">{select?.placeholder}</option>
                                            {
                                              Object.keys(select.options).map((objectKey, objectIndex) => (
                                                <option value={select.options[objectKey]} key={objectIndex}>
                                                  {select?.options[objectKey]}
                                                </option>
                                              ))
                                            }
                                          </select>
                                    </div>
                                    )
                                  })
                                }
                                {(updateProductData?.category === 'Glass') &&
                                  textInput?.slice(8,9)?.map((select, index) => {
                                    return (
                                    <div key={index+1} className={`${productList.inputFields} flex_between`} >
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
                      
                            <div className={`${productList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${productList.inputAreaOne_footer_container} flex_around`}>                                            
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
                <div className={`${productList.inputAreaTwo} flex_center`}>
                  <div className={`${productList.container} `}>
                        <div className={`${productList.titleName} flex_center`}>Update Image</div>
                        <div style={{width: '120px'}} className={`${productList.border_remover}`}></div>
                        <br />
                            <div className={`${productList.inputAreaTwoContainer}`}>
                            {updateProductData?.img ? ( updateProductData?.img !== 'not added' ? <img height={125} width={125} src={imgHolder ? imgHolder : updateProductData?.img } alt="" /> : <i className="uil uil-image-upload"></i> ) :  <i className="uil uil-image-upload"></i> }
                                  {
                                        textInput?.slice(8,9).map((input, index) => {
                                          return (
                                            <div key={index+1} className={`${productList.inputFields}`}>
                                            
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

                                  <div className={`${productList.uploading}`}>
                                      {uploading ? 'uploading...' : ''}
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
              {/* just make change here only UI */}
          <NewFilterOption pdf={handleDownloadPDF} setHandleQuery={setQuery} handleQuery={query} data={products} range={range} setRange={setRange} />
    
          {
            !isLoading
            ?
            <section style={{height: "32vh", width:'99%', margin:'auto', overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' }}>
              <NewProductListTable paginatedDataContainer={productData} isLoading={isLoading} edit={edit} idsForDelete={idsForDelete} selectDeleted={selectDeleted} setEdit={setEdit} setIdsForDelete={setIdsForDelete} setSelectDeleted={setSelectDeleted} summary={summary} />
              
          </section>
          :
          <div className='flex_top' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
          </div>
          }
           {
            !isLoading  
            &&
            <NewPagination data={products} limit={range.limit} setPageNumber={setPageNumber} pageNumber={pageNumber} count={count} setCount={setCount} />
           }      
        </div>
    );
};

export default ProductList;