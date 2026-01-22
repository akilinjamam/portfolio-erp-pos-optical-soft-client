/* eslint-disable react/prop-types */
import salesRecord from "./SalesRecord.module.scss";

const FilterOption = ({dispatch, openModal, addSalesData, modifiedProductDataWithIndexId, totalSalesItem, totalSalesValue, totalPaid, totalDiscount, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesQuantity, handleQuery, setHandleQuery, range, setRange}) => {
    return (
        <div className={`${salesRecord.title} flex_left`}>
               <div style={{marginBottom: "5px"}}>
                    <i onClick={() => {
                        dispatch(openModal('sales'))
                        dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCash: totalCashValue, totalBank: totalBankValue, totalBkash: totalBkashValue, totalNogod: totalNogodValue, totalSalesQuantity}))
                    }} title="print" className="uil uil-print"></i>
                    <span>Total : {totalSalesItem}</span>
                    <input value={handleQuery} type="text" name="" id="" onChange={(e) => {
                    
                        setHandleQuery(e.target.value)   
                    }}/>
                    <i onClick={() => setHandleQuery('')} className="uil uil-times"></i>
               </div>
               <div>
                    <label htmlFor="">From: </label>
                    <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    <label htmlFor="">To: </label>
                    <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
               </div>
            </div>
    );
};

export default FilterOption;