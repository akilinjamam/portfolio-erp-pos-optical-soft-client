/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import imgmodal from './ImgModal.module.scss';
import customerContainer from './CustomerContainer.module.scss';
import { calculateTotalPrice } from "../../calculation/calculateSum";
import moment from "moment";
import { useState } from "react";
import useGetEmployeeData from "../../../data/employeeData/useGetEmployeeData";

const CustomerContainer = ({dispatch, customerInfo, closeModal, type, open, salesList}) => {

    const {employeeData, isLoading} = useGetEmployeeData('', '', '');

    console.log();

    const glassTypeOption = [
        {
            name:'White',
        },
        {
            name:'ARC',
        },
        {
            name:'HMC',
        },
        {
            name:'Blue Cut',
        },
        {
            name:'Photo Chromic',
        },
        {
            name:'Hmc Blue Cut',
        },
        {
            name:'Photo Blue Cut',
        },
        {
            name:'Elements',
        },
        {
            name:'White Moon',
        },
        {
            name:'MC Moon',
        },
        {
            name:'Blue Cut Moon',
        },
        {
            name:'Photo Moon',
        },
        {
            name:'Photo Blue Cut Moon',
        },
        {
            name:'White DEE',
        },
        {
            name:'MC DEE',
        },
        {
            name:'Blue Cut DEE',
        },
        {
            name:'Photo DEE',
        },
        {
            name:'White Progressive',
        },
        {
            name:'MC Progressive',
        },
        {
            name:'Blue Cut Progressive',
        },
        {
            name:'Photo Progressive',
        },
        {
            name:'Photo Blue Cut Progressive',
        },
        {
            name:'HMC Blue Cut Progressive',
        },
        {
            name:'AO Progressive',
        },
        {
            name:'Hard Coat',
        },
        {
            name:'Polycarbonate',
        },
        {
            name:'Colour',
        },
    ]


    const [glassType, setGlassType] = useState('');
    const [salesBy,setSalesBy] = useState('');
    console.log(salesBy);
    const todayDate =  moment().format('YYYY-MM-DD');
    const {
        register,
        handleSubmit,
      } = useForm();

      const arrayOfTotalPriceValue = salesList?.map(item => (item?.actualSalesPrice * item?.quantity))
      const totalPriceValue = calculateTotalPrice(arrayOfTotalPriceValue)
      
    
      const onSubmit = (data) => {
       
        if(salesList.length < 1){
            toast.error('please add products to Sales list first')
            return
        }

        if(Number(data?.discount) > totalPriceValue){
            toast.error(`discount price can not be more than total sales price ${totalPriceValue}`)
            return
        }

        if(Number(data?.advance) > totalPriceValue){
            toast.error(` advance can not be more than total sales price ${totalPriceValue}`)
            return
        }
        
        if((Number(data?.advance) + Number(data?.discount)) > totalPriceValue){
            toast.error(`sum of advance and discount can not be more than total sales price ${totalPriceValue}`)
            return
        }
        
        const modifiedValue = {
            customerName: data?.customerName === '' ? undefined : data?.customerName,
            phoneNumber: data?.phoneNumber === '' ? undefined : data?.phoneNumber,
            address: data?.address === '' ? undefined : data?.address,
            referredBy: data?.referredBy === '' ? undefined : data?.referredBy,
            advance: data?.advance === '' ? undefined : data?.advance,
            todayPaid:data?.advance === '' ? undefined : data?.advance,
            paymentHistory: data?.advance === '' ? undefined : `+${data?.advance}`,
            paymentDate: todayDate,
            
            discount: data?.discount === '' ? undefined : data?.discount,
            leftAxis: data?.leftAxis === '' ? undefined : data?.leftAxis,
            leftCyl: data?.leftCyl === '' ? undefined : data?.leftCyl,
            leftSph: data?.leftSph === '' ? undefined : data?.leftSph,
            leftNear: data?.leftNear === '' ? undefined : data?.leftNear,
            rightAxis: data?.rightAxis === '' ? undefined : data?.rightAxis,
            rightCyl: data?.rightCyl === '' ? undefined : data?.rightCyl,
            rightSph: data?.rightSph === '' ? undefined : data?.rightSph,
            lense: data?.lense === '' ? undefined : data?.lense,
            glassType:glassType === '' ? undefined : glassType,
            rightNear: data?.rightNear === '' ? undefined : data?.rightNear,
            deliveryDate: data?.deliveryDate === '' ? undefined : data?.deliveryDate,
            delivered:data?.delivered === '' ? undefined : data?.delivered,
            recorderName: salesBy === '' ? undefined : salesBy,
            paymentMethod: data?.paymentMethod === '' ? undefined : data?.paymentMethod,
            comment:data?.comment === '' ? undefined : data?.comment,

        }
        console.log(modifiedValue)
        dispatch(customerInfo(modifiedValue))
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
                                <label htmlFor="">Dalivery Date: <span style={{color:'red'}}>*</span></label>
                                <br />
                                <input type="date" name="" id="" {...register('deliveryDate')} required/>
                                <br />
                                <br />
                                <label htmlFor=""> Delivered: <span style={{color:'red'}}>*</span></label>
                                <br />
                                <select name="" id="" {...register('delivered')} required>
                                    <option value="">Select Delivery Option</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Not-Delivered">Not Delivered</option>
                                </select>
                                <br />
                                <br />
                                <label htmlFor="">Sales By: <span style={{color:'red'}}>*</span> </label>
                                <br />
                                
                                <select name="" id="" onChange={(e) => setSalesBy(e.target.value)} required>
                                    <option value="">select employeeName</option>
                                    { !isLoading
                                        &&
                                        employeeData?.result?.map((employee,index) => <option key={index+1} value={employee?.employeeName}>{employee?.employeeName}</option> )
                                    }
                                    { isLoading &&
                                        <option value="">Loading...</option>
                                    }
                                </select>
                                <br />
                                <br />
                                <label htmlFor="">Lense: <span style={{color:'red'}}></span> </label>
                                <br />
                                <input type="text" name="" id="" {...register('lense')}/>
                                <br />
                                <br />
                                <label htmlFor="">Glass Type: <span style={{color:'red'}}></span> </label>
                                <br />
                                <select name="" id="" onChange={(e) => setGlassType(e.target.value)}>
                                    <option value="">select glass type</option>
                                    {
                                        glassTypeOption?.map((item, index) => <option key={index+1} value={item?.name}>{item?.name}</option> )
                                    }
                                </select>
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
                                <label htmlFor="">Comment:</label>
                                <br />
                                <textarea  name="" id="" {...register('comment')}/>
                                <br />
                                <br />
                                <label htmlFor="">Payment Method: <span style={{color:'red'}}>*</span></label>
                                <br />
                                <select name="" id="" {...register('paymentMethod')} required>
                                    <option value="">Select Payment Method</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bkash">Bkash</option>
                                    <option value="Nogod">Nogod</option>
                                    <option value="Rocket">Rocket</option>
                                </select>
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
                                <input type="number" name="" id="" step="0.01" {...register('leftSph')}/>
                                <br />
                                <br />
                                <label htmlFor="">Left Cyl:: </label>
                                <br />
                                <input type="number" name="" id="" step="0.01" {...register('leftCyl')}/>
                                <br />
                                <br />
                                <label htmlFor="">Left Axis: </label>
                                <br />
                                <input type="number" name="" id="" step="0.01" {...register('leftAxis')}/>
                                <br />
                                <br />
                                <label htmlFor="">Left Near:</label>
                                <br />
                                <input type="text" name="" id="" step="0.01" {...register('leftNear')}/>
                                <br />
                                <br />
                            </div>
                            <div className={`${customerContainer.partTwo}`}>
                                <br />
                                <label htmlFor="">Right Sph: </label>
                                <br />
                                <input type="number" name="" id="" step="0.01" {...register('rightSph')}/>
                                <br />
                                <br />
                                <label htmlFor="">Right Cyl: </label>
                                <br />
                                <input type="number" name="" id="" step="0.01" {...register('rightCyl')}/>
                                <br />
                                <br />
                                <label htmlFor="">Right Axis: </label>
                                <br />
                                <input type="number" name="" id="" step="0.01" {...register('rightAxis')}/>
                                <br />
                                <br />
                                <label htmlFor="">Right Near:</label>
                                <br />
                                <input  name="" id="" step="0.01" {...register('rightNear')}/>
                                <br />
                                <br />
                            </div>
                        </div>
                        <input style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '3px 5px', border:'none', cursor:'pointer'}} type="submit" value="save" />
                    </form>
                </section>
            </div>
    );
};

export default CustomerContainer;