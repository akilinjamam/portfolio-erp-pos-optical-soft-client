/* eslint-disable react/prop-types */
import { useState } from "react";
import salesRecord from "../../salesModule/salesRecord/FilterOption.module.scss";

const NewFilterOption = ({pdf,handleQuery, setHandleQuery, range, setRange,  data }) => {
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
                        Items: <span>{data?.total}</span>
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
                        <label>Price</label>
                        <input placeholder="MIN" value={range?.priceFrom} type="text" onChange={(e) => setRange({...range, priceFrom: e.target.value})}/>
                    </div>
                    <div className={salesRecord.dateInputGroup}>
                        <label></label>
                        <input placeholder="MAX" value={range?.priceTo} type="text" onChange={(e) => setRange({...range, priceTo: e.target.value})}/>
                    </div>
                    {(range?.priceFrom || range?.priceTo) && (
                        <button className={salesRecord.resetBtn} onClick={() => setRange({...range, priceTo :'', priceFrom:''})}>
                            <i className="uil uil-refresh"></i> Reset
                        </button>
                    )}
                </div>
                <div className={salesRecord.drawerContent}>
                    <div className={salesRecord.dateInputGroup}>
                        <label htmlFor="">Stock</label>
                        <select name="" id="" onChange={(e) => {
                            if(e.target.value === 'true' || e.target.value === 'false'){
                            setRange({...range, inStock: e.target.value})
                            }
                            if(e.target.value === ''){
                            setRange({...range, inStock: ''})
                            }
                        } }>
                            <option value="">stock-in & stock-out</option>
                            <option value="true">stock-in</option>
                            <option value="false">stock-out</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFilterOption;