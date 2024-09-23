import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useDispatch } from "react-redux";
import { openModal } from "../../../modal/imgmodal/imgModalSlice";

const SalesRecord = () => {
    const dispatch = useDispatch();

    return (
        <div className={salesRecord.main}>
            <div className={`${salesRecord.title} flex_left`}>
                <i onClick={() => {
                    dispatch(openModal('sales'))
                }} title="print" className="uil uil-print"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', minHeight:'auto', maxHeight:'700px'}}>
                <SalesRecordTable />
            </div>
        </div>
    );
};

export default SalesRecord;