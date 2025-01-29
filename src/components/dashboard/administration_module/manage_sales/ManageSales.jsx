
import { useDispatch } from "react-redux";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import Pagination from "../../pagination/Pagination";
import { textInput } from "../add_supplier/supplierInput";
import manageSaleList from './ManageSales.module.scss';
import {addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import useManageSales from "./useManageSales";
import ManageSaleTable from "./ManageSalesTable";
import { manageSaleUpdateInput } from "./manageSalesUpdateInput";

const ManageSales = () => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateSupplierData, setUdpateSupplierData,edit,setEdit,editProduct, initialSupplierData, uploading, setUploading,setImgHolder, imgHolder, modifiedSupplierDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, query, setQuery, totalSalesValue, totalSalesItem, totalDiscount, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalPaid, range, setRange} = useManageSales()
    const supplierData = modifiedSupplierDataWithIndexId

    const dispatch = useDispatch();
    return (
        <div  className={`${manageSaleList.main} full_width`}>
             <div style={{display:'flex'}}  className={`flex_around`}>
                <div className={`${manageSaleList.inputAreaOne} flex_center`}>
                  <div className={`${manageSaleList.container} `}>
                        <div className={`${manageSaleList.titleName}`}>Manage Sale Update</div>
                        <div style={{width: '170px' }}  className={`${manageSaleList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  manageSaleUpdateInput?.slice(0,8).map((input, index) => {
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
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${manageSaleList.inputAreaTwo} flex_center`}>
                  <div className={`${manageSaleList.container} `}>
                        <div className={`${manageSaleList.titleName} flex_center`}>Update Image</div>
                        <div style={{width: '120px'}} className={`${manageSaleList.border_remover}`}></div>
                        <br />
                            <div className={`${manageSaleList.inputAreaTwoContainer}`}>
                            {updateSupplierData?.img ? <img height={125} width={125} src={imgHolder ? imgHolder : updateSupplierData?.img} alt="" /> :  <i className="uil uil-image-upload"></i> }
                                  {
                                        textInput?.slice(3,4).map((input, index) => {
                                          return (
                                            <div key={index+1} className={`${manageSaleList.inputFields}`}>
                                            
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

                                  <div className={`${manageSaleList.uploading}`}>
                                      {uploading ? 'uploading...' : ''}
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
          <section className={`${manageSaleList.navigationIcon} flex_between`}>
                { 
                <div className={`${manageSaleList.inputPart} flex_left`}>
                    <i
                    onClick={() => {
                      dispatch(openModal('sales'))
                      dispatch(addSalesData({modifiedData:supplierData, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCash: totalCashValue, totalBank: totalBankValue, totalBkash: totalBkashValue, totalNogod: totalNogodValue}))
                    }}
                    title="print" className="uil uil-print"></i>
                    <span>Total : {supplierData?.length} </span>
                    <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                    <i onClick={() => setQuery('')}  className="uil uil-times"></i>
                    <label htmlFor="">From: </label>
                <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                <label htmlFor="">To: </label>
                <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
                   
                </div>
                }
                
          </section>
          <section className={`${manageSaleList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '42vh'}}  className={`${manageSaleList.tableArea}`}>
              <ManageSaleTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={supplierData} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={supplierData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
           }      
        </div>
    );
};

export default ManageSales;