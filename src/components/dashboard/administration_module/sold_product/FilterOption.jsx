/* eslint-disable react/prop-types */
import soldProducts from "./SoldProduct.module.scss";

const FilterOption = ({totalSalesItem, handleQuery, setHandleQuery,setCategory, category,totalCategory, setRange, range}) => {
    return (
        <div style={{flexWrap: "wrap"}} className={`${soldProducts.title} flex_left`}>
                        {/* <i onClick={() => {
                            dispatch(openModal('sales'))
                            dispatch(addSalesData({modifiedData:modifiedProductDataWithIndexId}))
                        }} title="print" className="uil uil-print"></i> */}
                        <div>
                            <span>Total : {totalSalesItem}</span>
                            <input style={{width: '230px'}} placeholder='Product Name / Barcode' value={handleQuery} type="text" name="" id="" onChange={(e) => {
                           
                            setHandleQuery(e.target.value)   
                            }}/>
                            <i onClick={() => setHandleQuery('')} className="uil uil-times"></i>
                        </div>
                        
                       <div>
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
                            <i onClick={() => setCategory('')} className="uil uil-times"></i>
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