/* eslint-disable react/prop-types */
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { invoiceCalculation } from '../../../invoiceCalculation/invoiceCalculation';
import useSaleData from '../../../data/saleData/useSaleData';
import InvoiceSlipForSaleV2 from './InvoiceSlipForSaleV2';

const InvoiceModal = ({dispatch,closeModal, type, open}) => {
   
    const getSalesInfo = localStorage.getItem('salesInfo');
    const salesInfo = JSON.parse(getSalesInfo);
    const {saleData} = useSaleData();

      const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: `invoice-${invoiceCalculation(saleData)}`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'invoice' ) ? imgmodal.open : imgmodal.close}`} >
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
                    <div ref={contentToPrint} style={{width:'250px', margin:'auto'}}>
                        <br />
                        <div style={{marginBottom:'300px'}}>
                            <InvoiceSlipForSaleV2 getCustomerInfo={salesInfo} salesList={salesInfo?.products} copy='Customer Copy' updateCustomerInfo={false}/>
                        </div>
                        <br />
                       
                        <div>
                            <InvoiceSlipForSaleV2 getCustomerInfo={salesInfo} salesList={salesInfo?.products} copy='Branch Copy' updateCustomerInfo={false}/>
                        </div>
                    </div>
                    
                </section>
            </div>
    );
};

export default InvoiceModal;