/* eslint-disable react/prop-types */
import { useState } from "react";
import salesRecord from "../../salesModule/salesRecord/FilterOption.module.scss";

const FilterOption = ({downloadPdf,  month, setMonth,  total, allEmployeeData, setEmployeeId, employeeId }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className={salesRecord.filterWrapper}>
            <div className={salesRecord.mainToolbar}>
                <div className={salesRecord.leftGroup}>
                    {/* Print Button */}
                    <button className={salesRecord.printBtn} onClick={() => {
                        downloadPdf()        
                    }}>
                    <i className="uil uil-print"></i>
                       
                    </button>

                    {/* Search Input */}
                    <div className={salesRecord.searchContainer}>
                       
                        <input 
                            value={month} 
                            type="month" 
                            placeholder="Search records..." 
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        {month && <i style={{cursor: "pointer"}} onClick={() => setMonth('')} className="uil uil-times-circle"></i>}
                    </div>
                    
                    <div className={salesRecord.countBadge}>
                        Items: <span>{total}</span>
                    </div>
                </div>

                <div className={salesRecord.rightGroup}>
                    
                    {/* Drawer Toggle Button */}
                    <button 
                        className={`${salesRecord.filterToggle} ${isDrawerOpen ? salesRecord.active : ''}`} 
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    >
                        <i className="uil uil-calendar-alt"></i>
                        All Filters
                        <i className={`uil ${isDrawerOpen ? 'uil-angle-up' : 'uil-angle-down'}`}></i>
                    </button>
                </div>
            </div>

            {/* Collapsible Drawer */}
            <div className={`${salesRecord.drawer} ${isDrawerOpen ? salesRecord.show : ''}`}>
                <div className={salesRecord.drawerContent}>
                    <div className={salesRecord.dateInputGroup}>
                        <label htmlFor="">Name</label>
                        <select name="" id="" onChange={(e) => setEmployeeId(e.target.value) }>
                            <option value="">Select EmployeeName</option>
                                {
                                    allEmployeeData?.map((employee, index) => <option key={index+1} value={employee?._id}>{employee?.employeeName}</option> )
                                }
                            </select>
                    </div>
                    
                    {(employeeId) && (
                        <button className={salesRecord.resetBtn} onClick={() => setEmployeeId('')}>
                            <i className="uil uil-refresh"></i> Reset
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterOption;