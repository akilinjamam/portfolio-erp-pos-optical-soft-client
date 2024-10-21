/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import imgmodal from './ImgModal.module.scss';
import customerContainer from './CustomerContainer.module.scss';

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
                <section className={`${imgmodal.container}  ${imgmodal.sizeCustomerContainer}`}>
                    <div className={`${imgmodal.cancelBtn}  flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <form className={imgmodal.useFont} onSubmit={handleSubmit(onSubmit)}>
                        <h4>Add Customer Information:</h4>
                        <div className={`${customerContainer.main} flex_between `}>
                            <div className={`${customerContainer.partOne}`}>
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
                            </div>
                            <div className={`${customerContainer.partTwo}`}>
                                <br />
                                <label htmlFor="">Discount: </label>
                                <br />
                                <input type="number" name="" id="" {...register('discount')}/>
                                <br />
                                <br />
                                <label htmlFor="">advance: </label>
                                <br />
                                <input type="number" name="" id="" {...register('advance')}/>
                                <br />
                                <br />
                                <label htmlFor="">Due: </label>
                                <br />
                                <input type="number" name="" id="" {...register('due')}/>
                                <br />
                                <br />
                                <label htmlFor="">Comment:</label>
                                <br />
                                <textarea  name="" id="" {...register('comment')}/>
                                <br />
                                <br />
                            </div>
                        </div>
                        <h4>Add Glass Power:</h4>
                        <div className={`${customerContainer.main} flex_between `}>
                            <div className={`${customerContainer.partOne}`}>
                                <br />
                                <label htmlFor=""> Left Sph: </label>
                                <br />
                                <input type="number" name="" id="" {...register('leftSph')}/>
                                <br />
                                <br />
                                <label htmlFor="">Left Cyl:: </label>
                                <br />
                                <input type="number" name="" id="" {...register('leftCyl')}/>
                                <br />
                                <br />
                                <label htmlFor="">Left Axis: </label>
                                <br />
                                <input type="number" name="" id="" {...register('leftAxis')}/>
                                <br />
                                <br />
                                <label htmlFor="">Left Near:</label>
                                <br />
                                <input type="text" name="" id="" {...register('leftNear')}/>
                                <br />
                                <br />
                            </div>
                            <div className={`${customerContainer.partTwo}`}>
                                <br />
                                <label htmlFor="">Right Sph: </label>
                                <br />
                                <input type="number" name="" id="" {...register('discount')}/>
                                <br />
                                <br />
                                <label htmlFor="">Right Cyl: </label>
                                <br />
                                <input type="number" name="" id="" {...register('advance')}/>
                                <br />
                                <br />
                                <label htmlFor="">Right Axis: </label>
                                <br />
                                <input type="number" name="" id="" {...register('due')}/>
                                <br />
                                <br />
                                <label htmlFor="">Right Near:</label>
                                <br />
                                <input  name="" id="" {...register('rightNear')}/>
                                <br />
                                <br />
                            </div>
                        </div>
                        <input type="submit" value="save" />
                    </form>
                </section>
            </div>
    );
};

export default CustomerContainer;