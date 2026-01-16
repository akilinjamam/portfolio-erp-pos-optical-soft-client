/* eslint-disable react/prop-types */
import glassStock from './GlassStock.module.scss';
const FilterOption = ({dispatch, addStockData, filteredStock, openModal, query, setQuery, stocks, setStocks, range, setRange}) => {
    return (
       <div className={`${glassStock.titleBarContainer}`}>
                           <div style={{marginBottom: "6px"}}>
                                <i 
                                title="print preview"
                                className="uil uil-print"
                                onClick={() => {
                                    dispatch(addStockData(filteredStock))
                                    dispatch(openModal('glass-stock'))
                                }}
                                ></i>
                                <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                                <i onClick={() => setQuery('')} className="uil uil-times"></i>
                             <select value={stocks} name="" id="" onChange={(e) => setStocks(e?.target?.value === 'true') }>
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