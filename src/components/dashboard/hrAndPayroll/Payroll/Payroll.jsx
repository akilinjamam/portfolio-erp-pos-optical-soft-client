import '../../../../global_style/global_style.css'
import addEmployee from './Payroll.module.scss';
import { payrollInput } from './payrollInput';
import useAddPayroll from './useAddPayroll';

const Payroll = () => {
  const {payrollData, setPayrollData, handleSubmit, allEmployees, setEmployeeId, allPayroll, setPaymentMethod, findEmployee, isPending} = useAddPayroll()
  
    return (
        <div className={`${addEmployee.main} full_width`}>
          <div style={{flexWrap: "wrap"}}  className={`flex_around`}>
            <div className={`${addEmployee.inputAreaOne} flex_center`}>
              <div className={`${addEmployee.container} `}>
                    <div className={`${addEmployee.titleName}`}>Add Payroll</div>
                    <div style={{width: '100px'}}  className={`${addEmployee.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            <div  className={`${addEmployee.inputFields} flex_between`}>
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
                              payrollInput?.map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addEmployee.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input placeholder={input.placeholder} value={payrollData[input.name]}   type={input.type} 
                                        onChange={(e) => {setPayrollData({...payrollData, [input.value]: e.target.value})}}
                                        
                                    />
                                </div>
                                )
                              })
                            }


                            <div  className={`${addEmployee.inputFields} flex_between`}>
                                    <label htmlFor="">Payment Method:</label>
                                    <select name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option value="cash">cash</option>
                                        <option value="bank">bank</option>
                                        <option value="bkash">bkash</option>
                                        <option value="nogod">nogod</option>
                                        <option value="rocket">rocket</option>
                                    </select>
                            </div>
                            <div className={`${addEmployee.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addEmployee.inputAreaOne_footer} flex_right`}>
                              <div className={`${addEmployee.inputAreaOne_footer_container} flex_right`}>
                                <button type='submit' name='submit' className={`commonButton btnColor_orange`}>{isPending ? 'LOADING...': 'ADD'}</button>
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${addEmployee.inputAreaTwo} flex_center`}>
              <div className={`${addEmployee.container} `}>
                    <div className={`${addEmployee.titleName} flex_center`}>
                      Calculation Board
                    </div>
                    <div style={{width: '150px'}} className={`${addEmployee.border_remover}`}>

                    </div>
                    <div className={`${addEmployee.inputAreaTwoContainer}`}>
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

export default Payroll;