// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { useDispatch } from "react-redux";
import Pagination from "../../pagination/Pagination";

import employeeList from './ProfitExpenseList.module.scss';
import {  addProfitExpenseData, openModal } from "../../../modal/imgmodal/imgModalSlice";

import { profitExpenseList } from "./profitExpenseListInput";

import ProfitExpenseListTable from "./ProfitExpenseListTable";
import useProfitexpenseList from "./useProfitExpenseList";
const ProfitExpenseList = () => {
    
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateEmployeeData, setUdpateEmployeeData,edit,setEdit,editProduct, initialEmployeeData, modifiedEmployeeDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,date, setDate} = useProfitexpenseList()
    const employeeData = modifiedEmployeeDataWithIndexId

    const dispatch = useDispatch();

    return (
        <div  className={`${employeeList.main} full_width`}>
             <div style={{display:'flex'}}  className={`flex_around`}>
                <div className={`${employeeList.inputAreaOne} flex_center`}>
                  <div className={`${employeeList.container} `}>
                        <div className={`${employeeList.titleName}`}>Expense Profit Update</div>
                        <div style={{width: '185px' }}  className={`${employeeList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  profitExpenseList?.map((input, index) => {
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
                {/* <div className={`${employeeList.inputAreaTwo} flex_center`}>
                  <div className={`${employeeList.container} `}>
                        <div className={`${employeeList.titleName} flex_center`}></div>
                        <div style={{width: '0px'}} className={`${employeeList.border_remover}`}></div>
                        <br />
                            <div className={`${employeeList.inputAreaTwoContainer}`}>
                           
                                
                                  
                            </div>
                  </div>
                </div> */}
              </div>
          <section className={`${employeeList.navigationIcon} flex_between`}>
                { 
                <div className={`${employeeList.inputPart} flex_left`}>
                    <i
                    onClick={() => {
                      dispatch(openModal('profit-expense'))
                      dispatch(addProfitExpenseData(employeeData))
                    }}
                    title="print" className="uil uil-print"></i>

                    <p style={{fontSize:'13px'}}>Total: {employeeData?.length}</p>
                
                    <input style={{padding:'0 2px'}} placeholder="Date" value={date}  type="month" name="" id="" onChange={(e) => setDate(e.target.value)}/>
                   
                </div>
                }
                
          </section>
          <section className={`${employeeList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '42vh'}}  className={`${employeeList.tableArea}`}>
              <ProfitExpenseListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={employeeData} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={employeeData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default ProfitExpenseList;