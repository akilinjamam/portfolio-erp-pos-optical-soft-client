/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import Pagination from "../../pagination/Pagination";
import { textInput } from "../AddEmployee/employeeInput";
import employeeList from './EmployeeList.module.scss';
import { addEmployeeList, openModal } from "../../../modal/imgmodal/imgModalSlice";

import useEmployeeList from "./useEmployeeList";
import EmployeeListTable from "./EmployeeListTable";
const EmployeeList = ({hideField, hideSection}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateEmployeeData, setUdpateEmployeeData,edit,setEdit,editProduct, initialEmployeeData, uploading, setUploading,setImgHolder, imgHolder,  modifiedEmployeeDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, range, setRange, query, setQuery} = useEmployeeList();
    const employeeData = modifiedEmployeeDataWithIndexId

    const dispatch = useDispatch();

    return (
        <div  className={`${employeeList.main} full_width`}>
             <div style={{display:`${hideSection ? 'none': 'flex'}`}}  className={`flex_around`}>
                <div className={`${employeeList.inputAreaOne} flex_center`}>
                  <div className={`${employeeList.container} `}>
                        <div className={`${employeeList.titleName}`}>Employee Update</div>
                        <div style={{width: '135px' }}  className={`${employeeList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  textInput?.slice(0,6).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${employeeList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateEmployeeData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateEmployeeData({...updateEmployeeData, [input.value]: e.target.value})}}
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
                      
                            <div className={`${employeeList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${employeeList.inputAreaOne_footer_container} flex_around`}>                                            
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
                <div className={`${employeeList.inputAreaTwo} flex_center`}>
                  <div className={`${employeeList.container} `}>
                        <div className={`${employeeList.titleName} flex_center`}>Update Image</div>
                        <div style={{width: '120px'}} className={`${employeeList.border_remover}`}></div>
                        <br />
                            <div className={`${employeeList.inputAreaTwoContainer}`}>
                            {updateEmployeeData?.img ? <img height={125} width={125} src={imgHolder ? imgHolder : updateEmployeeData?.img} alt="" /> :  <i className="uil uil-image-upload"></i> }
                                  {
                                        textInput?.slice(7,8).map((input, index) => {
                                          return (
                                            <div key={index+1} className={`${employeeList.inputFields}`}>
                                            
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

                                  <div className={`${employeeList.uploading}`}>
                                      {uploading ? 'uploading...' : ''}
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
          <section className={`${employeeList.navigationIcon} flex_between`}>
                { 
                <div className={`${employeeList.inputPart} flex_left`}>
                    <i
                    onClick={() => {
                      dispatch(openModal('employee'))
                      dispatch(addEmployeeList(employeeData))
                    }}
                    title="print" className="uil uil-print"></i>
                    <span>Total : {employeeData?.length} </span>
                    <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                    <i onClick={() => setQuery('')}  className="uil uil-times"></i>
                    <label htmlFor="">From: </label>
                    <input style={{padding:'0 2px'}} placeholder="Basic Salary" value={range?.from}  type="number" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    <label htmlFor="">To: </label>
                    <input style={{padding:'0 2px'}} placeholder="Basic Salary" value={range?.to}  type="number" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    <i onClick={() => {
                      setRange({from: '', to: ''})
                    }}  className="uil uil-times"></i>
                </div>
                }
                
          </section>
          <section className={`${employeeList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '42vh'}}  className={`${employeeList.tableArea}`}>
              <EmployeeListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={employeeData} hideField={hideField} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={employeeData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default EmployeeList;