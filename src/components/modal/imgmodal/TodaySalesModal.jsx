/* eslint-disable react/prop-types */
import { useRef } from 'react';
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import TodaySalesTable from '../../dashboard/salesModule/todaySales/TodaySalesTable';
import ReportTitle from '../../../ReportTitle/ReportTitle';

const TodaySalesModal = ({open, type, dispatch, closeModal }) => {

    const saleData = useSelector(state => state.imgModal.salesData)
    const totalSalesValue = useSelector(state => state.imgModal.totalSalesValue)
    const totalSalesItem = useSelector(state => state.imgModal.totalSalesItem)
    const totalPaid = useSelector(state => state.imgModal.totalPaid)
    const totalDiscount = useSelector(state => state.imgModal.totalDiscount)
    const totalCashValue = useSelector(state => state.imgModal.totalCash)
    const totalBankValue = useSelector(state => state.imgModal.totalBank)
    const totalBkashValue = useSelector(state => state.imgModal.totalBkash)
    const totalNogodValue = useSelector(state => state.imgModal.totalNogod)
    const totalCashPaidValue = useSelector(state => state.imgModal.totalCashPaid)
    const totalBankPaidValue = useSelector(state => state.imgModal.totalBankPaid)
    const totalBkashPaidValue = useSelector(state => state.imgModal.totalBkashPaid)
    const totalNogodPaidValue = useSelector(state => state.imgModal.totalNogodPaid)
    
    

   console.log(totalDiscount);
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'today-sales' ) ? imgmodal.open : imgmodal.close}`} >
                <section   className={`${imgmodal.container} ${imgmodal.sizeTodaySales}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Today Sale Data : {saleData?.length} </button>
                        <button 
                        onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                        }} 
                        className={imgmodal.todaySalesPrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i 
                        onClick={() => dispatch(closeModal())} 
                        className="uil uil-times"></i>
                    </div>
                    <div style={{marginTop:'10px', overflowX:'hidden', height:"450px", scrollbarWidth:'none', minHeight:'auto'}}  className={`${imgmodal.stockContainer}`}>
                        <div style={{padding: '0 10px'}} ref={contentToPrint}>
                            <ReportTitle/>
                            <TodaySalesTable paginatedDataContainer={saleData} totalSalesValue={totalSalesValue} totalSalesItem={totalSalesItem} totalTodayPaid={totalPaid} totalDiscount={totalDiscount} totalCashValue={totalCashValue} totalBankValue={totalBankValue} totalBkashValue={totalBkashValue} totalNogodValue={totalNogodValue} totalCashPaidValue={totalCashPaidValue} totalBankPaidValue={totalBankPaidValue} totalBkashPaidValue={totalBkashPaidValue} totalNogodPaidValue={totalNogodPaidValue}/>
                        </div>
                    </div>        
                </section>
        </div>
    );
};

export default TodaySalesModal;