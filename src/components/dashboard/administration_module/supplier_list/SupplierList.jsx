/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import Pagination from "../../pagination/Pagination";
import { textInput } from "../add_supplier/supplierInput";
import supplierList from './SupplierList.module.scss';
import {addSupplierList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import useSupplierList from "./useSupplierList";
import SupplierListTable from "./SupplierListTable";
import useHome from "../../home/useHome";
import FilterOption from "./FilterOption";

const SupplierList = ({hideField, hideSection}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateSupplierData, setUdpateSupplierData,edit,setEdit,editProduct, initialSupplierData, uploading, setUploading,setImgHolder, imgHolder, modifiedSupplierDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, query, setQuery} = useSupplierList();
    const supplierData = modifiedSupplierDataWithIndexId

    const dispatch = useDispatch();
    const {location} = useHome()
    return (
        <div  className={`${supplierList.main} full_width`}>
             <div style={{display:`${hideSection ? 'none' : 'flex'}`, flexWrap: "wrap"}}  className={`flex_around`}>
                <div className={`${supplierList.inputAreaOne} flex_center`}>
                  <div className={`${supplierList.container} `}>
                        <div className={`${supplierList.titleName}`}>Supplier Update</div>
                        <div style={{width: '135px' }}  className={`${supplierList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  textInput?.slice(0,3).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${supplierList.inputFields} flex_between`}>
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
                      
                            <div className={`${supplierList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${supplierList.inputAreaOne_footer_container} flex_around`}>                                            
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
                <div className={`${supplierList.inputAreaTwo} flex_center`}>
                  <div className={`${supplierList.container} `}>
                        <div className={`${supplierList.titleName} flex_center`}>Update Image</div>
                        <div style={{width: '120px'}} className={`${supplierList.border_remover}`}></div>
                        <br />
                            <div className={`${supplierList.inputAreaTwoContainer}`}>
                            {updateSupplierData?.img ? <img height={125} width={125} src={imgHolder ? imgHolder : updateSupplierData?.img} alt="" /> :  <i className="uil uil-image-upload"></i> }
                                  {
                                        textInput?.slice(3,4).map((input, index) => {
                                          return (
                                            <div key={index+1} className={`${supplierList.inputFields}`}>
                                            
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

                                  <div className={`${supplierList.uploading}`}>
                                      {uploading ? 'uploading...' : ''}
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
              <FilterOption dispatch={dispatch} openModal={openModal} addSupplierList={addSupplierList} supplierData={supplierData} query={query}  setQuery={setQuery}/>
              <section className={`${supplierList.navigationIcon} only_flex`}>
              
                    
              </section>
          <section style={{height: `${location === '/dashboard/administration_module/supplier_list' ? '42vh' : '72vh'}`}}  className={`${supplierList.tableArea}`}>
              <SupplierListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={supplierData} hideField={hideField} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={supplierData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default SupplierList;