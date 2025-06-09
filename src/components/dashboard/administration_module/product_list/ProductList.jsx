// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { useDispatch } from "react-redux";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import Pagination from "../../pagination/Pagination";
import { optionField, textInput } from "../product_entry/productInput";
import productList from './ProductList.module.scss';
import ProductListTable from "./ProductListTable";
import useProductList from "./useProductList";
import { openBarcode, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
const ProductList = () => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateProductData, setUdpateProductData,edit,setEdit,editProduct, initialProductData, uploading, setUploading,setImgHolder, imgHolder, fullScr, setFullScr, modifiedProductDataWithIndexId, setQuery,query, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, setStocks, range ,setRange} = useProductList();
    const productData = modifiedProductDataWithIndexId

    const dispatch = useDispatch();

    const handlBarcode = () => {
      dispatch(openModal('barcode'));
      dispatch(openBarcode(productData))
    }

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    return (
        <div  className={`${productList.main} full_width`}>
             <div style={{display:`${fullScr ? 'none' : 'flex'}`}}  className={`flex_around`}>
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
          <section className={`${productList.navigationIcon} flex_between`}>
                { 
                  <div className={productList.inputPart}>
                  
                      <input type="text" name="query" id="" value={query} placeholder="search" onChange={(e) => setQuery(e.target.value)} />
                      <i onClick={() => setQuery('')} className="uil uil-times"></i>
                      <span>Total Products : {productData?.length}</span>

                      <select name="" id="" onChange={(e) => {
                        if(e.target.value === 'true' || e.target.value === 'false'){
                          setStocks(e.target.value === 'true')
                        }
                        if(e.target.value === ''){
                          setStocks('')
                        }
                      } }>
                        <option value="">stock-in & stock-out</option>
                        <option value="true">stock-in</option>
                        <option value="false">stock-out</option>
                      </select>
                </div>
                }
                <div className={productList.btnPart}>
                    {fullScr ? <i title="barcode" onClick={handlBarcode} className="uil uil-qrcode-scan"></i> : ''}
                    {fullScr ? <i onClick={() => {handlePrint(null, () => contentToPrint.current)}} title="print" className="uil uil-print"></i> : ''}
                    { fullScr ? <i title="exit full screen" onClick={() => setFullScr(false)} className="uil uil-compress-arrows"></i> : <i title="full screen" onClick={() => setFullScr(true)} className="uil uil-expand-arrows-alt"></i>}
                </div>
          </section>
          <section className={`${productList.navigationIcon} only_flex`}>
                { 
                  <div className={productList.inputPart}>
                      <label htmlFor="">From: </label>
                      <input value={range.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                      <label htmlFor="">To: </label>
                      <input value={range.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                      <i onClick={() => setRange({from:'', to:''})} className="uil uil-times"></i>
                </div>
                }
                { 
                  <div className={productList.inputPart}>
                      <label htmlFor="">From: </label>
                      <input placeholder="price" value={range.priceFrom} type="text" name="" id="" onChange={(e) => setRange({...range, priceFrom: e.target.value})} style={{padding: '0 2px'}}/>
                      <label htmlFor="">To: </label>
                      <input placeholder="price" value={range.priceTo} type="text" name="" id="" onChange={(e) => setRange({...range, priceTo: e.target.value})} style={{padding: '0 2px'}}/>
                      <i onClick={() => setRange({priceFrom:'', priceTo:''})} className="uil uil-times"></i>
                </div>
                }
                
          </section>
          <section style={{height: `${fullScr ? '80vh' : '45vh'}`}}  className={`${productList.tableArea}`} ref={contentToPrint}>
              <ProductListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={productData} fullScr={fullScr}/>
          </section>
           {
            !isLoading && !fullScr 
            &&
            <Pagination showData={productData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
           }      
        </div>
    );
};

export default ProductList;