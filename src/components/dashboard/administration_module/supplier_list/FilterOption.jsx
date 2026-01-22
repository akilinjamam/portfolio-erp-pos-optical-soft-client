/* eslint-disable react/prop-types */
import supplierList from "./SupplierList.module.scss";

const FilterOption = ({dispatch, openModal, addSupplierList, supplierData, query, setQuery}) => {
    return (
        <section className={`${supplierList.navigationIcon} flex_between`}>
                    { 
                        <div className={`${supplierList.inputPart} flex_left`}>
                            <i
                            onClick={() => {
                            dispatch(openModal('supplier'))
                            dispatch(addSupplierList(supplierData))
                            }}
                            title="print" className="uil uil-print"></i>
                            <span>Total : {supplierData?.length} </span>
                            <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                            <i onClick={() => setQuery('')}  className="uil uil-times"></i>              
                        </div>
                    }
                    { 
                        <div className={`${supplierList.inputPartRes} flex_left`}>
                          
                            <span>Total : {supplierData?.length} </span>
                            <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                            <i onClick={() => setQuery('')}  className="uil uil-times"></i>              
                        </div>
                    }
                    
              </section>
    );
};

export default FilterOption;