/* eslint-disable react/prop-types */
import { useState } from "react";
import salesRecord from "../../salesModule/salesRecord/FilterOption.module.scss";

const NewFilterOption = ({pdf,handleQuery, setHandleQuery, range, setRange,  data, category, setCategory, totalCategory }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className={salesRecord.filterWrapper}>
            <div className={salesRecord.mainToolbar}>
                <div className={salesRecord.leftGroup}>
                    {/* Print Button */}
                    <button className={salesRecord.printBtn} onClick={() => {
                      pdf()
                    }}>
                        <i className="uil uil-print"></i>
                       
                    </button>

                    {/* Search Input */}
                    <div className={salesRecord.searchContainer}>
                        {!handleQuery && <i className="uil uil-search"></i>}
                        <input 
                            value={handleQuery} 
                            type="text" 
                            placeholder="Search products..." 
                            onChange={(e) => setHandleQuery(e.target.value)}
                        />
                        {handleQuery && <i style={{cursor: "pointer"}} onClick={() => setHandleQuery('')} className="uil uil-times-circle"></i>}
                    </div>
                    <div className={salesRecord.countBadge}>
                        Items: <span>{data}</span>
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
                        <label>Date</label>
                        <input value={range?.from} type="date" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    </div>
                    <div className={salesRecord.dateInputGroup}>
                        <label></label>
                        <input value={range?.to} type="date" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    </div>
                    {(range?.from || range?.to) && (
                        <button className={salesRecord.resetBtn} onClick={() => setRange({...range,from:'', to:''})}>
                            <i className="uil uil-refresh"></i> Reset
                        </button>
                    )}
                </div>
                
                <div className={salesRecord.drawerContent}>
                    <div className={salesRecord.dateInputGroup}>
                        <label htmlFor="">Stock</label>
                        <select style={{marginRight:'10px'}} name="" id="" value={category} onChange={(e) => {
                                    setCategory(e.target.value)   
                            }}>  
                            <option value=''>select category</option>
                                {
                                    totalCategory?.map((item, index) => {
                                            return(
                                                <option key={index + 1} value={item}>{item}</option>
                                            )
                                        }
                                    )   
                                }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFilterOption;