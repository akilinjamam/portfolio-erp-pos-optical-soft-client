/* eslint-disable react/prop-types */
import { useRef } from 'react';
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import SalesRecordTable from '../../dashboard/salesModule/salesRecord/salesRecordTable';
import useSalesRecord from '../../dashboard/salesModule/salesRecord/useSalesRecord';


const SalesModal = ({open, type, dispatch, closeModal }) => {

    const {saleData} = useSalesRecord()

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });


    
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'sales' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeStock}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Sale Data : {saleData?.result?.length} </button>
                        <button 
                        onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                        }} 
                        className={imgmodal.stockPrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i 
                        onClick={() => dispatch(closeModal())} 
                        className="uil uil-times"></i>
                    </div>
                    <div style={{marginTop:'10px'}}  className={`${imgmodal.stockContainer}`}>
                    <SalesRecordTable contentToPrint={contentToPrint}/>
                    </div>        
                </section>
        </div>
    );
};

export default SalesModal;