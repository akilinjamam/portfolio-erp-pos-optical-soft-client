/* eslint-disable react/prop-types */

import imgmodal from './ImgModal.module.scss';
import InvoiceForm from "./InvoiceForm";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useSelector } from 'react-redux';

const InvoiceModal = ({dispatch, customerInfo, closeModal, type, open,  }) => {
    console.log(customerInfo)
    
    //   const onSubmit = (data) => {
    //     console.log(data)
    //     dispatch(customerInfo(data))
    //     toast.success('customer info added successfully')
    //     dispatch(closeModal())
    //   }

    const salesList = useSelector(state => state.imgModal.salesList)
  

    const totalSalesList = useSelector(state => state.imgModal.salesList);
    const getCustomerInfo = useSelector(state => state.imgModal.customerInfo);
    console.log(totalSalesList)

      const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Invoice",
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