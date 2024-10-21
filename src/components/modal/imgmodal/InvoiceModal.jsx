/* eslint-disable react/prop-types */

import { toast } from "react-toastify";
import imgmodal from './ImgModal.module.scss';
import InvoiceForm from "./InvoiceForm";

const InvoiceModal = ({dispatch, customerInfo, closeModal, type, open,  }) => {

    
      const onSubmit = (data) => {
        console.log(data)
        dispatch(customerInfo(data))
        toast.success('customer info added successfully')
        dispatch(closeModal())
      }

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'invoice' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeInvoiceContainer}`}>
                    <div className={`${imgmodal.cancelBtn}  flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <div>
                        <InvoiceForm/>
                    </div>
                </section>
            </div>
    );
};

export default InvoiceModal;