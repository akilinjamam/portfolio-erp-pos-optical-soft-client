import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useDispatch } from "react-redux";
import { openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import useSalesRecord from "./useSalesRecord";
import { useEffect } from "react";

const SalesRecord = () => {
    const dispatch = useDispatch();
    const {saleData} = useSalesRecord('');
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    const [paginatedIndex,setPaginatedIndex] = useState()
    console.log(paginatedIndex)
    console.log(paginatedDataContainer)


    useEffect(() => {
        const modified = saleData?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    },[saleData])

    return (
        <div className={salesRecord.main}>
            <div className={`${salesRecord.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('sales'))
                }} title="print" className="uil uil-print"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'700px'}}>
                <SalesRecordTable paginatedDataContainer={paginatedDataContainer} />
            </div>
            <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
        </div>
    );
};

export default SalesRecord;