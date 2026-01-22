/* eslint-disable react/prop-types */
import payrollList from './PayrollList.module.scss'

const FilterOption = ({dispatch, openModal, addPayrollList, payrollData, setEmployeeId, month, setMonth, allEmployeeData}) => {
    return (
        <section className={`${payrollList.navigationIcon} flex_between`}>
            { 
                <div className={`${payrollList.inputPart} flex_left`}>
                        <div>
                            <i
                            onClick={() => {
                                dispatch(openModal('payroll'))
                                dispatch(addPayrollList(payrollData))
                            }}
                            title="print" className="uil uil-print">
                        </i>
                        <span>Total : {payrollData?.length} </span>
                        </div>
                            
                       <div>
                            <select name="" id="" onChange={(e) => setEmployeeId(e.target.value)}>
                                <option value="">Select EmployeeName</option>
                                {
                                    allEmployeeData?.map((employee, index) => <option key={index+1} value={employee?._id}>{employee?.employeeName}</option> )
                                }
                            </select>
                            <input value={month} type="month" name="" id="" onChange={(e) => setMonth(e.target.value)}/>
                       </div>
                </div>
            }
                        
        </section>
    );
};

export default FilterOption;