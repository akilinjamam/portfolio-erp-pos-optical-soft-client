import { useDispatch } from "react-redux";
import SupplierListModalTable from "../../administration_module/supplier_list/SupplierListModalTable";
import useSupplierList from "../../administration_module/supplier_list/useSupplierList";
import supplierListReport from "./SupplierListReport.module.scss"
import { addSupplierList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import CommonLoading from "../../../commonLoagin/CommonLoading";
import Pagination from "../../pagination/Pagination";


const SupplierListReport = () => {
   
  
    const dispatch = useDispatch();
    const {modifiedSupplierDataWithIndexId, query, setQuery, isLoading, paginatedDataContainer,setPaginatedDataContainer, setPaginatedIndex} = useSupplierList()
   

    if(isLoading){
        return <CommonLoading/>
    }

    return (
        <div className={`${supplierListReport.main}`}>
            <section style={{marginBottom:'15px', marginLeft:'15px'}} className={`${supplierListReport.navigationIcon} flex_between`}>
                { 
                    <div className={`${supplierListReport.inputPart} flex_left`}>
                    <i
                        onClick={() => {
                            dispatch(openModal('supplier'))
                            dispatch(addSupplierList(modifiedSupplierDataWithIndexId))
                        }}
                        title="print" className="uil uil-print"></i>
                        <span>Total : {modifiedSupplierDataWithIndexId?.length} </span>
                        <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                        <i onClick={() => setQuery('')}  className="uil uil-times"></i>
                                  
                    </div>
                }
                                
            </section>
            <SupplierListModalTable paginatedDataContainer={paginatedDataContainer} />
            {
            !isLoading
            &&
            <Pagination showData={modifiedSupplierDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }   
        </div>
    );
};

export default SupplierListReport;