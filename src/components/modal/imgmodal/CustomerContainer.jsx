/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import imgmodal from './ImgModal.module.scss';

const CustomerContainer = ({dispatch, customerInfo, closeModal, type, open,  }) => {

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
                        <label htmlFor="">Reffered By:</label>
                        <br />
                        <input type="text" name="" id="" {...register('referredBy')}/>
                        <br />
                        <br />
                        <input type="submit" value="save" />
                    </form>
                </section>
            </div>
    );
};

export default CustomerContainer;