/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Pagination from "../../pagination/Pagination";
import payrollList from './PayrollList.module.scss';
import { addPayrollList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import usePayrollList from "./usePayrollList";
import PayrollListTable from "./PayrollListTable";
import { payrollListInput } from "./payrollListInput";
import FilterOption from "./FilterOption";
const PayrollList = ({hideSection, hideField}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateEmployeeData, setUdpateEmployeeData,edit,setEdit,editProduct, initialEmployeeData,  modifiedEmployeeDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,setMonth, setEmployeeId, employeeData, totalPaid, paidAmount, totalIncentive, totalOvertime, month, paymentMethod, setPaymentMethod, location} = usePayrollList();
    const payrollData = modifiedEmployeeDataWithIndexId

    const allEmployeeData = employeeData?.result?.sort((a, b) => a.employeeName.toLowerCase() > b.employeeName.toLowerCase() ? 1 : -1);
    const dispatch = useDispatch();

    return (
        <div  className={`${payrollList.main} full_width`}>
             <div style={{display:`${hideSection ? 'none' : 'flex'}`}}  className={`flex_around`}>

                <div className={`${payrollList.inputAreaOne} flex_center`}>
                  <div className={`${payrollList.container} `}>
                        <div className={`${payrollList.titleName}`}>Payroll Update</div>
                        <div style={{width: '135px' }}  className={`${payrollList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  payrollListInput?.map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${payrollList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateEmployeeData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateEmployeeData({...updateEmployeeData, [input.value]: e.target.value})}}
                                    
                                        />
                                    </div>
                                    )
                                  })
                                }
                                <div  className={`${payrollList.inputFields} flex_between`}>
                                        <label htmlFor="">Payment Method:</label>
                                        <select value={paymentMethod} name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
                                            <option value="">Select Payment Method</option>
                                            <option value="cash">cash</option>
                                            <option value="bank">bank</option>
                                            <option value="bkash">bkash</option>
                                            <option value="nogod">nogod</option>
                                        </select>
                                    </div>
                                
                                
                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${payrollList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${payrollList.inputAreaOne_footer_container} flex_around`}>                                            
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
                {/* <div className={`${payrollList.inputAreaTwo} flex_center`}>
                  <div className={`${payrollList.container} `}>
                        <div className={`${payrollList.titleName} flex_center`}></div>
                        <div style={{width: '0'}} className={`${payrollList.border_remover}`}></div>
                        <br />
                            <div className={`${payrollList.inputAreaTwoContainer}`}>
                            
                              
                            </div>
                  </div>
                </div> */}
              </div>
          <FilterOption dispatch={dispatch} openModal={openModal} addPayrollList={addPayrollList} payrollData={payrollData} setEmployeeId={setEmployeeId} month={month} setMonth={setMonth} allEmployeeData={allEmployeeData} />
          <section className={`${payrollList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: `${location === '/dashboard/hr_and_payroll_module/payroll_list' ? '42vh': '72vh'}`}}  className={`${payrollList.tableArea}`}>
              <PayrollListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={payrollData} paidAmount={paidAmount} totalIncentive={totalIncentive} totalOvertime={totalOvertime} totalPaid={totalPaid} hideField={hideField} fontsize='11.5px'/>
          </section>
           {
            !isLoading
            &&
            <Pagination showData={payrollData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default PayrollList;