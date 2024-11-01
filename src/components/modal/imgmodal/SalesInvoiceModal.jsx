/* eslint-disable react/prop-types */

import imgmodal from './ImgModal.module.scss';
import InvoiceForm from "./InvoiceForm";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { invoiceCalculationWithoutIncreament } from '../../../invoiceCalculation/invoiceCalculation';
import useSaleData from '../../../data/saleData/useSaleData';

const InvoiceModal = ({dispatch,closeModal, type, open, salesList, getCustomerInfo  }) => {
    
    const {saleData} = useSaleData()

      const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: `Sales-Invoice-${invoiceCalculationWithoutIncreament(saleData)}`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'salesInvoice' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeInvoiceContainer}`}>
                <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button 
                        style={{cursor:'pointer'}}
                        onClick={() => {
                            handlePrint(null, () => contentToPrint.current);
                            }} 
                        className={imgmodal.stockPrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i 
                        onClick={() => dispatch(closeModal())} 
                        className="uil uil-times"></i>
                    </div>
                    <br />
                    <div ref={contentToPrint} style={{width:'566px', margin:'auto'}}>
                        <br />
                        <div style={{marginBottom:'320px'}}>
                            <InvoiceForm getCustomerInfo={getCustomerInfo} salesList={salesList} copy='Customer Copy'/>
                        </div>
                        <br />
                       
                        <div>
                            <InvoiceForm getCustomerInfo={getCustomerInfo} salesList={salesList} copy='Office Copy'/>
                        </div>
                    </div>
                    
                </section>
            </div>
    );
};

export default InvoiceModal;