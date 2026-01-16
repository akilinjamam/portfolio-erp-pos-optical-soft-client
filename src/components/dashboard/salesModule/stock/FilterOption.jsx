/* eslint-disable react/prop-types */
import stock from "./Stock.module.scss";

const FilterOption = ({dispatch, addStockData, filteredStock, addStockTotalInfo, stockTotalInfo, openModal, query, setQuery, newRefetch, stocks, setStocks, range, setRange}) => {
    return (
        <div className={`${stock.titleBarContainer}`}>
                    <div style={{marginBottom:"3px"}}>
                        <i 
                        title="print preview"
                        className="uil uil-print"
                        onClick={() => {
                            dispatch(addStockData(filteredStock))
                            dispatch(addStockTotalInfo({stockTotalInfo}))
                            dispatch(openModal('stock'))
                        }}
                        ></i>
                        <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                        <i onClick={() => {
                        newRefetch()
                        setQuery('')
                        }} className="uil uil-times"></i>
                        <select value={stocks} name="" id="" onChange={(e) => {
                            console.log(e.target.value)
                            if(e.target.value === 'both'){
                                setStocks(undefined)
                            }else{
                                setStocks(e?.target?.value === 'true')
                            }
                            
                        } }>
                            <option value={'both'}>stock-in-out</option>
                            <option value={true}>stock-in</option>
                            <option value={false}>stock-out</option>
                        </select>
                    </div>
                   <div>
                        <label htmlFor="">From :</label>
                        <input value={range.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>

                        <label htmlFor="">To :</label>
                        <input value={range.to} type="date" name="" id=""  onChange={(e) => setRange({...range, to: e.target.value})}/>
                        <i onClick={() => setRange({from: '', to: ''})} className="uil uil-times"></i>
                   </div>
        </div>
    );
};

export default FilterOption;