/* eslint-disable react/prop-types */
import salesRecord from "../../salesModule/salesRecord/FilterOption.module.scss";

const NewFilterOption = ({pdf,handleQuery, setHandleQuery, data }) => {
   

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
                    
                   
                </div>
            </div>

            
        </div>
    );
};

export default NewFilterOption;