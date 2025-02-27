import { useDispatch } from "react-redux";
import Pagination from "../../pagination/Pagination";
import vendorList from './VendorList.module.scss';
import {  addVendorList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import useVendorList from "./useVendorList";
import { vendorInput } from "../AddVendor/addVendorInput";
import VendorListTable from "./VendorlistTable";


const VendorList = () => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateEmployeeData, setUdpateEmployeeData,edit,setEdit,editProduct, initialEmployeeData,  modifiedEmployeeDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,setMonth, setEmployeeId, supplierData, totalPaid} = useVendorList();
    const vendorData = modifiedEmployeeDataWithIndexId

    const allEmployeeData =supplierData?.result;

    const dispatch = useDispatch();

    return (
        <div  className={`${vendorList.main} full_width`}>
             <div style={{display:'flex'}}  className={`flex_around`}>
                <div className={`${vendorList.inputAreaOne} flex_center`}>
                  <div className={`${vendorList.container} `}>
                        <div className={`${vendorList.titleName}`}>Employee Update</div>
                        <div style={{width: '135px' }}  className={`${vendorList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  vendorInput?.map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${vendorList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateEmployeeData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateEmployeeData({...updateEmployeeData, [input.value]: e.target.value})}}
                                    
                                        />
                                    </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${vendorList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${vendorList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateEmployeeData(initialEmployeeData)
                                          setEdit('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${vendorList.inputAreaTwo} flex_center`}>
                  <div className={`${vendorList.container} `}>
                        <div className={`${vendorList.titleName} flex_center`}></div>
                        <div style={{width: '0'}} className={`${vendorList.border_remover}`}></div>
                        <br />
                            <div className={`${vendorList.inputAreaTwoContainer}`}>
                            
                              
                            </div>
                  </div>
                </div>
              </div>
          <section className={`${vendorList.navigationIcon} flex_between`}>
                { 
                <div className={`${vendorList.inputPart} flex_left`}>
                    <i
                    onClick={() => {
                      dispatch(openModal('vendor'))
                      dispatch(addVendorList(vendorData))
                    }}
                    title="print" className="uil uil-print"></i>
                    <span>Total : {vendorData?.length} </span>
                
                    <select name="" id="" onChange={(e) => setEmployeeId(e.target.value)}>
                        <option value="">Select SupplierName</option>
                        {
                            allEmployeeData?.map((employee, index) => <option key={index+1} value={employee?._id}>{employee?.supplierName}</option> )
                        }
                    </select>
                    <input type="month" name="" id="" onChange={(e) => setMonth(e.target.value)}/>
                </div>
                }
                
          </section>
          <section className={`${vendorList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '42vh'}}  className={`${vendorList.tableArea}`}>
              <VendorListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={vendorData} totalPaid={totalPaid}/>
          </section>
           {
            !isLoading
            &&
            <Pagination showData={vendorData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default VendorList;