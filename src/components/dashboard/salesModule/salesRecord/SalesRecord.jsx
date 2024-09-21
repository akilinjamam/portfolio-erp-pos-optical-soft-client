import SalesRecordTable from "./salesRecordTable";
import salesRecord from './SalesRecord.module.scss';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SalesRecord = () => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    return (
        <div className={salesRecord.main}>
            <div className={`${salesRecord.title} flex_left`}>
                <i onClick={() => {handlePrint(null, () => contentToPrint.current)}} title="print" className="uil uil-print"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', height:'700px'}}>
                <SalesRecordTable contentToPrint={contentToPrint}/>
            </div>
        </div>
    );
};

export default SalesRecord;