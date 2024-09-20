import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import imgmodal from './ImgModal.module.scss';
import '../../../global_style/global_style.css';
import { closeModal, customerInfo } from './imgModalSlice';
import Barcode from 'react-barcode';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const ImgModal = () => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

        const open = useSelector((state) => state.imgModal.open );
        const img = useSelector((state) => state.imgModal.img );
        const type = useSelector((state) => state.imgModal.type );
        const barcode = useSelector((state) => state.imgModal.barcode );
        const customerinfor = useSelector((state) => state.imgModal.customerInfo)
        console.log(customerinfor)
        const dispatch = useDispatch();


        const {
            register,
            handleSubmit,
          } = useForm()
        
          const onSubmit = (data) => {
            console.log(data)
            dispatch(customerInfo(data))
            toast.success('customer info added successfully')
            dispatch(closeModal())
          }
        
    return (
        <div>
            <div className={`${imgmodal.main} flex_center  ${(open && type === 'img' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeImg}`}>
                    <div className={`${imgmodal.cancelBtn} flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <img width={530} height={330} src={img} alt="" />
                </section>
            </div>
            <div className={`${imgmodal.main} flex_center  ${(open && type === 'barcode' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeBarcode}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Barcode :{barcode?.length}</button>
                        <button 
                        onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                        }} 
                        className={imgmodal.barcodePrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <div  style={{ display: 'flex', flexWrap: 'wrap' }} ref={contentToPrint} className={`${imgmodal.barcodeContainer}`}>
                    {
                        barcode?.map((barcode, index) => {
                            return (
                                <div key={index+1}>
                                    <Barcode width={1} height={60} value={barcode?.barcode}/>
                                </div>
                            )
                        })
                    }
                    </div>
                </section>
            </div>
            <div className={`${imgmodal.main} flex_center  ${(open && type === 'customer' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeImg}`}>
                    <div className={`${imgmodal.cancelBtn}  flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <form className={imgmodal.useFont} onSubmit={handleSubmit(onSubmit)}>
                        <h4>Add Customer Information:</h4>
                        <br />
                        <label htmlFor="">Customer Name: </label>
                        <br />
                        <input type="text" name="" id="" {...register('customerName')}/>
                        <br />
                        <br />
                        <label htmlFor="">Phone Number: </label>
                        <br />
                        <input type="text" name="" id="" {...register('phoneNumber')}/>
                        <br />
                        <br />
                        <label htmlFor="">Address: </label>
                        <br />
                        <input type="text" name="" id="" {...register('address')}/>
                        <br />
                        <br />
                        <input type="submit" value="save" />
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ImgModal;