/* eslint-disable react/prop-types */
import { useRef } from 'react';
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import SalesRecordTable from '../../dashboard/salesModule/salesRecord/salesRecordTable';
import { useSelector } from 'react-redux';

const SalesModal = ({open, type, dispatch, closeModal }) => {

   const saleData = useSelector(state => state.imgModal.salesData)
   const totalSalesValue = useSelector(state => state.imgModal.totalSalesValue)
   const totalSalesItem = useSelector(state => state.imgModal.totalSalesItem)
   const totalPaid = useSelector(state => state.imgModal.totalPaid)
   const totalDiscount = useSelector(state => state.imgModal.totalDiscount)
   const totalCashValue = useSelector(state => state.imgModal.totalCash)
    const totalBankValue = useSelector(state => state.imgModal.totalBank)
    const totalBkashValue = useSelector(state => state.imgModal.totalBkash)
    const totalNogodValue = useSelector(state => state.imgModal.totalNogod)

   
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
                        <button>Total Sale Data : {saleData?.length} </button>
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
                    <SalesRecordTable contentToPrint={contentToPrint} paginatedDataContainer={saleData} totalSalesValue={totalSalesValue} totalSalesItem={totalSalesItem} totalPaid={totalPaid} totalDiscount={totalDiscount} totalCashValue={totalCashValue} totalBankValue={totalBankValue} totalBkashValue={totalBkashValue} totalNogodValue={totalNogodValue}/>
                    </div>        
                </section>
        </div>
    );
};

export default SalesModal;