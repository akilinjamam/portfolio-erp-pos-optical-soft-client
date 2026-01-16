// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { useDispatch } from "react-redux";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import Pagination from "../../pagination/Pagination";
import {  textInput } from "../product_entry/productInput";
import glassList from './GlassList.module.scss';
import { openBarcode, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useGlassList from "./useGlassList";
import GlassListTable from "./GlassListTable";
import FilterOption from "./FilterOption";
const GlassList = () => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateProductData, setUdpateProductData,edit,setEdit,editProduct, initialProductData, uploading, setUploading,setImgHolder, imgHolder, fullScr, setFullScr, modifiedProductDataWithIndexId, setQuery,query, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, setStocks, range ,setRange} = useGlassList();
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
        <div  className={`${glassList.main} full_width`}>
             <div style={{display:`${fullScr ? 'none' : 'flex'}`, flexWrap: "wrap"}}  className={`flex_around`}>
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
           <FilterOption setQuery={setQuery} query={query} productData={productData} setStocks={setStocks} fullScr={fullScr} handlBarcode={handlBarcode}  handlePrint={handlePrint}  contentToPrint={contentToPrint} setFullScr={setFullScr} range={range} setRange={setRange} />
          <section style={{height: `${fullScr ? '80vh' : '35vh'}`}}  className={`${glassList.tableArea}`} ref={contentToPrint}>
              <GlassListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={productData} fullScr={fullScr}/>
          </section>
           {
            !isLoading && !fullScr 
            &&
            <Pagination showData={productData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
           }      
        </div>
    );
};

export default GlassList;