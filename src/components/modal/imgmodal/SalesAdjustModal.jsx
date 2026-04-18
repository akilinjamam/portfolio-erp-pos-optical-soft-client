/* eslint-disable react/prop-types */
import imgmodal from './ImgModal.module.scss';
import adjust from './SalesAdjustModal.module.scss';
import { calculateTotalPrice } from "../../calculation/calculateSum";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useUpdateSaleData from '../../../data/saleData/useUpdateSaleData';
import moment from 'moment';
import useCancelAdjustmentSaleData from '../../../data/saleData/useCancelAdjustmentSaleData';
import useGetSalesByInvoice from '../../../data/saleData/useGetSalesByInvoice';

const SalesAdjustModal = ({dispatch, getCustomerInfo, closeModal, type, open, salesList}) => {
       
        const todayDate =  moment().format('YYYY-MM-DD');
        const [duePaymentMethod, setDuePaymentMethod] = useState('');
    
        const [payable, setPayable] = useState(0);
        const [discount, setDiscount] = useState(0);
        

        const {refetch} = useGetSalesByInvoice(getCustomerInfo?.invoiceBarcode)
    

      const arrayOfTotalPriceValue = salesList?.map(item => (item?.actualSalesPrice * item?.quantity))
      const totalPriceValue = calculateTotalPrice(arrayOfTotalPriceValue)
     
      
      useEffect(() => {
        setPayable(Number(totalPriceValue) - Number(getCustomerInfo?.advance || 0) - (Number(getCustomerInfo?.discount || 0)));
        setDiscount(Number(getCustomerInfo?.discount || 0));
       
      }, [totalPriceValue, getCustomerInfo]);

      useEffect(() => {
        setDuePaymentMethod(getCustomerInfo?.duePaymentMethod)
      },[getCustomerInfo])
     

      const {mutate:updateSaleData} = useUpdateSaleData(refetch)
      const {mutate: cancelSalesAdjustment} = useCancelAdjustmentSaleData(refetch)

      useEffect(() => {
        refetch
      },[refetch])
      
     const handleCancelAdjustment = (e) => {
        e.preventDefault()
        cancelSalesAdjustment(getCustomerInfo?._id)
        dispatch(closeModal())
    }

      const handleUpdate = (e) => {
            e.preventDefault();
            const payableAndDiscountAmount = (Number(payable) + Number(discount) + Number(getCustomerInfo?.advance));


            if(payable ===''){
                toast.error('Please enter payable amount')
                return
            }

            if(payableAndDiscountAmount > Number(totalPriceValue)){
                toast.error(`Dua and Discount price both can not across Sales Price ${totalPriceValue}`)
                return
            }

            if(duePaymentMethod === 'blank'){
                toast.error('Please select Due Payment Method')
                return
            }

            const totalAdvance = (Number(getCustomerInfo?.advance) + Number(payable)).toString();
            const totalDiscount = discount.toString();
            const id = getCustomerInfo?._id

            const data = {
                advance : totalAdvance,
                discount: totalDiscount,
                todayPaid: payable,
                paymentHistory: `${getCustomerInfo?.paymentHistory}+${payable}`,
                paymentMethodHistory: `${getCustomerInfo?.paymentMethodHistory}+${duePaymentMethod}`,
                paymentDate: todayDate,
                duePaymentMethod,
            }

            const updatedData = {
                id,
                data
            }

            updateSaleData(updatedData)
            dispatch(closeModal())
      }
    

    return (
        <div
            className={`${imgmodal.main} flex_center ${
            open && type === "salesAdjust" ? imgmodal.open : imgmodal.close
            }`}
        >
            <section className={`${imgmodal.container}`}>
            
            {/* 🔹 Header */}
            <div className={adjust.header}>
                <h3>Adjust Sales</h3>
                <i
                onClick={() => dispatch(closeModal())}
                className="uil uil-times"
                ></i>
            </div>

            {/* 🔹 Body */}
            <form className={adjust.form}>
                
                <div className={adjust.summary}>
                <p>Total Sales Amount</p>
                <h2>{totalPriceValue}</h2>
                </div>

                <div className={adjust.grid}>
                
                {/* LEFT SIDE */}
                <div className={adjust.formGroup}>
                    <label>Total Paid</label>
                    <input
                    value={getCustomerInfo?.advance}
                    type="number"
                    disabled
                    />
                </div>

                <div className={adjust.formGroup}>
                    <label>Pay Due Amount</label>
                    <input
                    value={payable}
                    type="number"
                    onChange={(e) => setPayable(e.target.value)}
                    />
                </div>

                <div className={adjust.formGroup}>
                    <label>Discount</label>
                    <input
                    value={discount}
                    type="number"
                    onChange={(e) => setDiscount(e.target.value)}
                    />
                </div>

                <div className={adjust.formGroup}>
                    <label>Payment Method</label>
                    <select
                    value={duePaymentMethod}
                    onChange={(e) => setDuePaymentMethod(e.target.value)}
                    >
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                    <option value="Bkash">Bkash</option>
                    <option value="Nogod">Nogod</option>
                    </select>
                </div>
                </div>

                {/* 🔹 Actions */}
                <div className={adjust.actions}>
                {payable !== 0 && (
                    <button
                    type="button"
                    onClick={handleUpdate}
                    className={adjust.primaryBtn}
                    >
                    Save Adjustment
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleCancelAdjustment}
                    className={adjust.dangerBtn}
                >
                    Cancel Adjustment
                </button>
                </div>
            </form>
            </section>
        </div>
);
};

export default SalesAdjustModal;