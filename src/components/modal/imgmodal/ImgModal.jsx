import { useDispatch, useSelector } from 'react-redux';
import '../../../global_style/global_style.css';
import { closeModal, customerInfo } from './imgModalSlice';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import ImgContainer from './ImgContainer';
import BarcodeContainer from './BarcodeContainer';
import CustomerContainer from './CustomerContainer';
import StockModal from './StockModal';

const ImgModal = () => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

        const open = useSelector((state) => state.imgModal.open );
        const stockData = useSelector((state) => state.imgModal.stockData );
        const img = useSelector((state) => state.imgModal.img );
        const type = useSelector((state) => state.imgModal.type );
        const barcode = useSelector((state) => state.imgModal.barcode );
        const customerinfor = useSelector((state) => state.imgModal.customerInfo)
        console.log(customerinfor)
        const dispatch = useDispatch();

        
    return (
        <div>
            <ImgContainer open={open} type={type} dispatch={dispatch} closeModal={closeModal} img={img}/>

            <BarcodeContainer open={open} type={type} barcode={barcode} closeModal={closeModal} contentToPrint={contentToPrint} dispatch={dispatch} handlePrint={handlePrint}/>

            <CustomerContainer closeModal={closeModal} customerInfo={customerInfo} dispatch={dispatch} open={open} type={type}/>

            <StockModal open={open} type={type} dispatch={dispatch} closeModal={closeModal} stockData={stockData} contentToPrint={contentToPrint} handlePrint={handlePrint}/>
        </div>
    );
};

export default ImgModal;