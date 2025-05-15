/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../../../global_style/global_style.css'
import StockTable from '../../dashboard/salesModule/stock/StockTable';
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';

const StockModal = ({type, open, dispatch, closeModal, stockData, stockTotalInfo}) => {

    console.log(stockTotalInfo)

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'stock' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeStock}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Stock Data : {stockData?.length} </button>
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
                    <StockTable paginatedDataContainer={stockData} stockTotalInfo={stockTotalInfo?.stockTotalInfo}/>
                    </div>        
                </section>
        </div>
    );
};

export default StockModal;