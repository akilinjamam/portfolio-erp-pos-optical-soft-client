/* eslint-disable react/prop-types */
import imgmodal from './ImgModal.module.scss';
import customerContainer from './CustomerContainer.module.scss';
import { calculateTotalPrice } from "../../calculation/calculateSum";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useUpdateSaleData from '../../../data/saleData/useUpdateSaleData';
import useSaleData from '../../../data/saleData/useSaleData';
import moment from 'moment';
import useCancelAdjustmentSaleData from '../../../data/saleData/useCancelAdjustmentSaleData';

const SalesAdjustModal = ({dispatch, getCustomerInfo, closeModal, type, open, salesList}) => {

        const todayDate =  moment().format('YYYY-MM-DD');
    
    
        const [payable, setPayable] = useState(0);
        const [discount, setDiscount] = useState(0);
        

        const {refetch} = useSaleData()
    

      const arrayOfTotalPriceValue = salesList?.map(item => (item?.actualSalesPrice * item?.quantity))
      const totalPriceValue = calculateTotalPrice(arrayOfTotalPriceValue)
     
      
      useEffect(() => {
        setPayable(Number(totalPriceValue) - Number(getCustomerInfo?.advance || 0) - (Number(getCustomerInfo?.discount || 0)));
        setDiscount(Number(getCustomerInfo?.discount || 0));
       
      }, [totalPriceValue, getCustomerInfo]);

     

      const {mutate:updateSaleData} = useUpdateSaleData(refetch)
      const {mutate: cancelSalesAdjustment} = useCancelAdjustmentSaleData(refetch)

      useEffect(() => {
        refetch
      },[refetch])
      
     const handleCancelAdjustment = (e) => {
        e.preventDefault()
        cancelSalesAdjustment(getCustomerInfo?._id)
        }

      const handleUpdate = (e) => {
            e.preventDefault();
            const payableAndDiscountAmount = (Number(payable) + Number(discount) + Number(getCustomerInfo?.advance));

            if(payableAndDiscountAmount > Number(totalPriceValue)){
                toast.error(`Dua and Discount price both can not across Sales Price ${totalPriceValue}`)
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
                paymentDate: todayDate
            }

            const updatedData = {
                id,
                data
            }

            updateSaleData(updatedData)

            console.log(updatedData)
      }
    

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'salesAdjust' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeCustomerContainer}`}>
                    <div className={`${imgmodal.cancelBtn}  flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <form className={imgmodal.useFont}>
                        <h4>Adjust Sales:</h4>
                        <br />
                        <h4>Total Sales Amount: {totalPriceValue}</h4>
                        <div className={`${customerContainer.main} flex_between `}>
                            <div className={`${customerContainer.partOne}`}>
                               <br /><br />
                               <label htmlFor="">Total Paid :</label>
                               <br />
                               <br />
                               <input 
                                value={getCustomerInfo?.advance} 
                                type="number" 
                               
                                />
                               <br /><br />
                               <div className='only_flex'>
                                    <label htmlFor="">Pay Total Due :</label>
                               </div>
                               
                               <br />
                               <input 
                                value={payable} 
                                type="number" 
                                onChange={(e) => setPayable(e.target.value)} 
                                />
                               <br /><br />
                               <label htmlFor="">Total Discount :</label>
                               <br />
                               <br />
                               <input 
                                value={discount} 
                                type="number" 
                                onChange={(e) => setDiscount(e.target.value)} 
                                />
                                
                            </div>
                            <div className={`${customerContainer.partTwo}`}>
                                <br />
                                <br />
                            </div>
                        </div>
                        <br /><br />
                        {
                            payable !== 0
                            &&
                            <input onClick={handleUpdate} style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '3px 5px', border:'none', cursor:'pointer'}} type="submit" value="save" />
                        }

                        <button onClick={handleCancelAdjustment} style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '3px 5px', marginLeft:'10px', border:'none', cursor:'pointer'}} >
                            Cancel Adjustment
                        </button>
                    </form>
                </section>
            </div>
    );
};

export default SalesAdjustModal;