/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../../../global_style/global_style.css'
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import SalesAnalysisChart from '../../dashboard/business_monitor/sales_analysis/SalesAnalysisChart';

const SalesAnalysisModal = ({type, open, dispatch, closeModal, analysisData, salesDetail}) => {
    console.log(salesDetail)
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'sales-analysis' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeStock}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        
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
                    <div style={{marginTop:'10px'}} ref={contentToPrint} className={`${imgmodal.stockContainer}`}>
                    <SalesAnalysisChart allSalesPriceData={analysisData} highestSale={salesDetail?.highestSale} lowestSale={salesDetail?.lowestSale} totalSales={salesDetail?.totalSales} netSales={salesDetail?.netSales} totalDiscount={salesDetail?.totalDiscount} totalPaid={salesDetail?.totalPaid} totalDue={salesDetail?.totalDue} />
                    </div>        
                </section>
        </div>
    );
};

export default SalesAnalysisModal;