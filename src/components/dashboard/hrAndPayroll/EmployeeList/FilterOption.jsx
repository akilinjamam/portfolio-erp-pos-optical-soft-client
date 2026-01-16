/* eslint-disable react/prop-types */
import employeeList from './EmployeeList.module.scss';

const FilterOption = ({dispatch, openModal, addEmployeeList, employeeData, query, setQuery, range, setRange}) => {
    return (
         <section className={`${employeeList.navigationIcon} flex_between`}>
                { 
                <div className={`${employeeList.inputPart} flex_left`}>
                    <div style={{marginBottom: "3px"}}>
                        <i
                            onClick={() => {
                            dispatch(openModal('employee'))
                            dispatch(addEmployeeList(employeeData))
                        }}
                        title="print" className="uil uil-print"></i>
                        <span>Total : {employeeData?.length} </span>
                        <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                        <i onClick={() => setQuery('')}  className="uil uil-times"></i>
                    </div>
                    <div>
                        <label htmlFor="">From: </label>
                        <input style={{padding:'0 2px'}} placeholder="Basic Salary" value={range?.from}  type="number" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                        <label htmlFor="">To: </label>
                        <input style={{padding:'0 2px'}} placeholder="Basic Salary" value={range?.to}  type="number" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                        <i onClick={() => {
                        setRange({from: '', to: ''})
                        }}  className="uil uil-times"></i>
                   </div>
                </div>
                }
                
          </section>
    );
};

export default FilterOption;