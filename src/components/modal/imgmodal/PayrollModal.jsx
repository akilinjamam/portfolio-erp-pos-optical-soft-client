/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../../../global_style/global_style.css'
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import PayrollListTable from '../../dashboard/hrAndPayroll/PayrollList/PayrollListTable';
import usePayrollList from '../../dashboard/hrAndPayroll/PayrollList/usePayrollList';
import ReportTitle from '../../../ReportTitle/ReportTitle';

const PayrollModal = ({type, open, dispatch, closeModal, payrollData}) => {

    const {totalPaid, totalIncentive, totalOvertime, paidAmount} = usePayrollList();

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    
    
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'payroll' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizePayroll}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total payroll Data : {payrollData?.length} </button>
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
                        <PayrollListTable  paginatedDataContainer={payrollData} totalPaid={totalPaid} totalIncentive={totalIncentive} totalOvertime={totalOvertime} paidAmount={paidAmount} hideField={true} fontsize=''/>
                    </div>        
                </section>
        </div>
    );
};

export default PayrollModal;