/* eslint-disable react/prop-types */
// import { useRef } from 'react';
import '../../../global_style/global_style.css'
import imgmodal from './ImgModal.module.scss';
// import { useReactToPrint } from 'react-to-print';
import CashFlowSummeryTable from '../../dashboard/accounts_module/CashFlowSummery/CashFlowSummeryTable';
import usePrint from '../../../print/usePrint';


const CashFlowSummeryModal = ({type, open, dispatch, closeModal, cashFlow, totalProfitAllocation}) => {
  
    const {contentToPrint, handlePrint} = usePrint()

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'cash-flow-summery') ? imgmodal.open : imgmodal.close}`} >
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
                    <div  ref={contentToPrint} className={`${imgmodal.stockContainer}`}>
                    <CashFlowSummeryTable tableScroll={true} contentToPrint={contentToPrint} paginatedDataContainer={cashFlow} totalProfitAllocation={totalProfitAllocation}/>
                    </div>        
                </section>
        </div>
    );
};

export default CashFlowSummeryModal;