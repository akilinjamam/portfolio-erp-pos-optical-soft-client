/* eslint-disable react/prop-types */
import manageSaleList from "./ManageSales.module.scss"

const FilterOption = ({dispatch, openModal, addSalesData, supplierData, totalSalesItem, totalSalesValue, totalPaid, totalDiscount, totalBankValue, totalBkashValue, totalNogodValue, totalCashValue, setQuery, setRange, query, range }) => {
    return (
        <section className={`${manageSaleList.navigationIcon} flex_between`}>
                    { 
                    <div className={`${manageSaleList.inputPart} flex_left`}>
                        <i
                        onClick={() => {
                          dispatch(openModal('sales'))
                          dispatch(addSalesData({modifiedData:supplierData, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCash: totalCashValue, totalBank: totalBankValue, totalBkash: totalBkashValue, totalNogod: totalNogodValue}))
                        }}
                        title="print" className="uil uil-print"></i>
                        <span>Total : {supplierData?.length} </span>
                        <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                        <i onClick={() => setQuery('')}  className="uil uil-times"></i>
                        <label htmlFor="">From: </label>
                    <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    <label htmlFor="">To: </label>
                    <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
                      
                    </div>
                    }
                    { 
                    <div className={`${manageSaleList.inputPartRes} flex_left`}>
                       
                        <span>Total : {supplierData?.length} </span>
                        <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                        <i onClick={() => setQuery('')}  className="uil uil-times"></i>
                        <br />
                        <label htmlFor="">From: </label>
                    <input value={range?.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    <label htmlFor="">To: </label>
                    <input value={range?.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    <i onClick={() =>setRange({from:'', to:''})} className="uil uil-times"></i>
                      
                    </div>
                    }
                    
              </section>
    );
};

export default FilterOption;