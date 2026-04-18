/* eslint-disable react/prop-types */
import { useState } from "react";
import salesRecord from "./FilterOption.module.scss";

const FilterOption = ({downloadPdf, dispatch, addSalesData, modifiedProductDataWithIndexId, totalSalesItem = 0, totalSalesValue = 0, totalPaid = 0, totalDiscount=0, totalCashValue=0, totalBankValue=0, totalBkashValue=0, totalNogodValue=0, totalSalesQuantity=0, handleQuery, setHandleQuery, range, setRange}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className={salesRecord.filterWrapper}>
            <div className={salesRecord.mainToolbar}>
                <div className={salesRecord.leftGroup}>
                    {/* Print Button */}
                    <button className={salesRecord.printBtn} onClick={() => {
                        downloadPdf()
                        // dispatch(openModal('sales'))
                        dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCash: totalCashValue, totalBank: totalBankValue, totalBkash: totalBkashValue, totalNogod: totalNogodValue, totalSalesQuantity}))
                    }}>
                        <i className="uil uil-print"></i>
                       
                    </button>

                    {/* Search Input */}
                    <div className={salesRecord.searchContainer}>
                        {!handleQuery && <i className="uil uil-search"></i>}
                        <input 
                            value={handleQuery} 
                            type="text" 
                            placeholder="Search records..." 
                            onChange={(e) => setHandleQuery(e.target.value)}
                        />
                        {handleQuery && <i style={{cursor: "pointer"}} onClick={() => setHandleQuery('')} className="uil uil-times-circle"></i>}
                    </div>
                    <div className={salesRecord.countBadge}>
                        Items: <span>{totalSalesItem}</span>
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
                        <label>From</label>
                        <input value={range?.from} type="date" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    </div>
                    <div className={salesRecord.dateInputGroup}>
                        <label>To</label>
                        <input value={range?.to} type="date" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    </div>
                    {(range?.from || range?.to) && (
                        <button className={salesRecord.resetBtn} onClick={() => setRange({...range,from:'', to:''})}>
                            <i className="uil uil-refresh"></i> Reset
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterOption;