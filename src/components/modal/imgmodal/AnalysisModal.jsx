/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../../../global_style/global_style.css'
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import ProfitCategoryAnalysisChart from '../../dashboard/business_monitor/profitCategoryAnalysis/ProfitCategoryAnalysisChart';
import ReportTitle from '../../../ReportTitle/ReportTitle';



const AnalysisModal = ({type, open, dispatch, closeModal, analysisData}) => {


    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'analysis' ) ? imgmodal.open : imgmodal.close}`} >
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
                        <ReportTitle/>
                        <ProfitCategoryAnalysisChart  analysisData={analysisData}/>
                    </div>        
                </section>
        </div>
    );
};

export default AnalysisModal;