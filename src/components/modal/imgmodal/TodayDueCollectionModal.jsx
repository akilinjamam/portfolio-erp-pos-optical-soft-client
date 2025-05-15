/* eslint-disable react/prop-types */
import { useRef } from 'react';
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import TodayDueCollectionTable from '../../dashboard/salesModule/TodayDueCollection/TodayDueCollectionTable';


const TodayDueCollectionModal = ({open, type, dispatch, closeModal }) => {

   const saleData = useSelector(state => state.imgModal.salesData)
   const totalSalesValue = useSelector(state => state.imgModal.totalSalesValue)
   const totalSalesItem = useSelector(state => state.imgModal.totalSalesItem)
   const totalPaid = useSelector(state => state.imgModal.totalPaid)
   const totalDiscount = useSelector(state => state.imgModal.totalDiscount)

    const totalTodayPaid = useSelector(state => state.imgModal.totalTodayPaid)
    const totalDueCollection = useSelector(state => state.imgModal.totalDueCollection)   
    const totalCashDueCollection = useSelector(state => state.imgModal.totalCashDueCollection)
    const totalBankDueCollection = useSelector(state => state.imgModal.totalBankDueCollection)
    const totalBkashDueCollection = useSelector(state => state.imgModal.totalBkashDueCollection)
    const totalNogodDueCollection = useSelector(state => state.imgModal.totalNogodDueCollection)    

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'today-due-collection' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeTodaySales}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Today Due Collection Data : {saleData?.length} </button>
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
                    <div  style={{marginTop:'10px', overflowX: 'hidden', overflowY:'scroll', height:'499px', scrollbarWidth: "none", msOverflowStyle: "none"}}  className={`${imgmodal.stockContainer}`}>
                    
                    <TodayDueCollectionTable contentToPrint={contentToPrint} showReportTitle={true} paginatedDataContainer={saleData} totalSalesValue={totalSalesValue} totalSalesItem={totalSalesItem} totalPaid={totalPaid} totalDiscount={totalDiscount} totalTodayPaid={totalTodayPaid} totalDueCollection={totalDueCollection} totalCashDueCollection={totalCashDueCollection} totalBankDueCollection={totalBankDueCollection} totalBkashDueCollection={totalBkashDueCollection} totalNogodDueCollection={totalNogodDueCollection}/>
                    </div>        
                </section>
        </div>
    );
};

export default TodayDueCollectionModal;