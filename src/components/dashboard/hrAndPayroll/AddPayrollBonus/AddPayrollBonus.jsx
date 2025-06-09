import '../../../../global_style/global_style.css'
import addPayrollBonus from './AddPayrollBonus.module.scss';
import { addPayrollBonusInput } from './addPayrollBonusInput';
import useAddPayrollBonus from './useAddPayrollBonus';

const AddPayrollBonus = () => {
  const {payrollData, setPayrollData, handleSubmit, allEmployees, setEmployeeId, allPayroll, setPaymentMethod, findEmployee, isPending} = useAddPayrollBonus()
  
    return (
        <div className={`${addPayrollBonus.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${addPayrollBonus.inputAreaOne} flex_center`}>
              <div className={`${addPayrollBonus.container} `}>
                    <div className={`${addPayrollBonus.titleName}`}>Add Payroll</div>
                    <div style={{width: '100px'}}  className={`${addPayrollBonus.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            <div  className={`${addPayrollBonus.inputFields} flex_between`}>
                                    <label htmlFor="">Employee Name:</label>
                                    <select name="" id="" onChange={(e) => setEmployeeId(e.target.value)}>
                                      <option value="">Select Employee</option>
                                        {
                                          allEmployees?.map((employee, index) => {
                                            return (
                                              <option key={index+1} value={employee?._id}>{employee?.employeeName}</option>
                                            )
                                          })
                                        }
                                    </select>
                            </div>            
                            {
                              addPayrollBonusInput?.map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addPayrollBonus.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input value={payrollData[input.name]}   type={input.type} 
                                        onChange={(e) => {setPayrollData({...payrollData, [input.value]: e.target.value})}}
                                        
                                    />
                                </div>
                                )
                              })
                            }


                            <div  className={`${addPayrollBonus.inputFields} flex_between`}>
                                    <label htmlFor="">Payment Method:</label>
                                    <select name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option value="cash">cash</option>
                                        <option value="bank">bank</option>
                                        <option value="bkash">bkash</option>
                                        <option value="nogod">nogod</option>
                                        <option value="rocket">rocket</option>
                                    </select>
                            </div>
                            <div className={`${addPayrollBonus.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addPayrollBonus.inputAreaOne_footer} flex_right`}>
                              <div className={`${addPayrollBonus.inputAreaOne_footer_container} flex_right`}>
                                <button type='submit' name='submit' className={`commonButton btnColor_orange`}>{isPending ? 'LOADING...': 'ADD'}</button>
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${addPayrollBonus.inputAreaTwo} flex_center`}>
              <div className={`${addPayrollBonus.container} `}>
                    <div className={`${addPayrollBonus.titleName} flex_center`}>
                      Calculation Board
                    </div>
                    <div style={{width: '150px'}} className={`${addPayrollBonus.border_remover}`}>

                    </div>
                    <div className={`${addPayrollBonus.inputAreaTwoContainer}`}>
                        <p>Basic Salary: {findEmployee?.basicSalary}</p>
                        <p>Total Paid: {allPayroll?.totalPaid}</p>
                        <p>Due: {allPayroll?.due}</p>
                        <p>Advance: {allPayroll?.advance}</p>
                        <p>Last Incentive: {allPayroll?.incentive}</p>
                        <p>Last Overtime: {allPayroll?.overtime}</p>
                        <p>Net Salary (after advance): {allPayroll?.netSalary}</p>
                        <p>Last Payment Date: {allPayroll?.date}</p>
                    </div>
              </div>
            </div>
          </div> 
        </div>
    );
};

export default AddPayrollBonus;