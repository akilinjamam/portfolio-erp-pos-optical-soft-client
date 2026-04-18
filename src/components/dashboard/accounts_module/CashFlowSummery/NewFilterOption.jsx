/* eslint-disable react/prop-types */
import salesRecord from "../../salesModule/salesRecord/FilterOption.module.scss";

const NewFilterOption = ({downloadPdf,  month, setMonth,  total }) => {
    

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

                
            </div>

            {/* Collapsible Drawer */}
            
        </div>
    );
};

export default NewFilterOption;