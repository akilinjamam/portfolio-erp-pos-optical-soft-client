/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import imgmodal from './ImgModal.module.scss';
import customerContainer from './CustomerContainer.module.scss';
import { calculateTotalPrice } from "../../calculation/calculateSum";
// import moment from "moment";
import { useEffect, useState } from "react";
import useGetEmployeeData from "../../../data/employeeData/useGetEmployeeData";
import useUpdateCustomerInfo from "../../../data/saleData/useUpdateCustomerInfo";
import useSaleData from "../../../data/saleData/useSaleData";
import { toast } from "react-toastify";
import { useGetGlassData } from "../../../data/glassTypeData/useGlassTypeData";

const UpdateCustomerInfo = ({dispatch,  salesList,closeModal, type, open, getCustomerInfo}) => {
   
   
    const totalPrice = calculateTotalPrice(salesList?.map(sale => sale?.actualSalesPrice * sale?.quantity))
   
    const {employeeData, isLoading} = useGetEmployeeData('', '', '');

    const {glassData} = useGetGlassData();
         const allGlass = glassData?.result;

     const [glassTypeForProduct, setGlassTypeForProduct] = useState('');
    const [itemName, setItemName] = useState('');
    const [addProductAndGlass, setAddProductAndGlass] = useState([]);
    const [glassType, setGlassType] = useState('');
    const [salesBy,setSalesBy] = useState('');
    console.log(salesBy);
    // const todayDate =  moment().format('YYYY-MM-DD');
    const {
        register,
        handleSubmit,
        reset,
      } = useForm();

     
    useEffect(() => {
        setSalesBy(getCustomerInfo?.recorderName);
    }, [getCustomerInfo]);
  
  
    useEffect(() => {
        const isEqualAvailable = getCustomerInfo?.glassType?.split(',')?.some(str => str.includes('='));
        if(isEqualAvailable){
            setAddProductAndGlass([getCustomerInfo?.glassType])
        }else{
            setGlassType(getCustomerInfo?.glassType);
        }
    }, [getCustomerInfo]);

    useEffect(() => {
        setGlassType(addProductAndGlass?.join(','))
    }, [addProductAndGlass])
    console.log(getCustomerInfo?.glassType?.split('=')?.[0])

      useEffect(() => {
        if (getCustomerInfo) {
          reset({
            customerName: getCustomerInfo?.customerName || '',
            phoneNumber: getCustomerInfo?.phoneNumber || '',
            address: getCustomerInfo?.address || '',
            referredBy: getCustomerInfo?.referredBy || '',
            deliveryDate: getCustomerInfo?.deliveryDate || '',
            delivered: getCustomerInfo?.delivered || '',
            lense: getCustomerInfo?.lense || '',
            discount: getCustomerInfo?.discount || '',
            advance: getCustomerInfo?.advance || '',
            comment: getCustomerInfo?.comment?.split('=')?.[0] || '',
            pd: getCustomerInfo?.comment?.split('=')?.[1] || '',
            paymentMethod: getCustomerInfo?.paymentMethod || '',
            totalQuantity: getCustomerInfo?.totalQuantity || '',
            duePaymentMethod: getCustomerInfo?.duePaymentMethod || '',
            leftSph: getCustomerInfo?.leftSph || '',
            leftCyl: getCustomerInfo?.leftCyl || '',
            leftAxis: getCustomerInfo?.leftAxis || '',
            leftNear: getCustomerInfo?.leftNear || '',
            rightSph: getCustomerInfo?.rightSph || '',
            rightCyl: getCustomerInfo?.rightCyl || '',
            rightAxis: getCustomerInfo?.rightAxis || '',
            rightNear: getCustomerInfo?.rightNear || '',
          });
        }
      }, [getCustomerInfo, reset]);
      const {refetch} = useSaleData()
      const {mutate: updateCustomerData} = useUpdateCustomerInfo(refetch)
      
    
      const onSubmit = (data) => {

        if(data?.advance > totalPrice){
            toast.error('advance amount can not be more than total Price')
            return
        }

        if(data.discount > totalPrice){
            toast.error('discount price can not be more than given price')
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
            // paymentDate: todayDate,
            
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
            duePaymentMethod: data?.paymentMethod === '' ? undefined : data?.duePaymentMethod,
            totalQuantity: data?.totalQuantity === '' ? undefined : data?.totalQuantity,
            comment:data?.comment === '' ? undefined : `${data?.comment}=${data?.pd}`,
        }
       
        const newData = {
            id: getCustomerInfo?._id,
            data: modifiedValue
        }
        updateCustomerData(newData)
        dispatch(closeModal())
      }

      console.log(getCustomerInfo?.paymentHistory?.split('+')?.[2])

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'updateCustomer' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeCustomerContainer}`}>
                    <div className={`${imgmodal.cancelBtn}  flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                     <p style={{marginBottom:'5px'}} className={imgmodal.useFont} htmlFor="">Add Glass Type for Individual Product: </p>
                                        
                                        <label className={imgmodal.useFont} htmlFor="">Select Product: </label>
                                        <select   style={{marginRight: '10px'}} name="" id="" onChange={(e) => setItemName(e.target.value)}>
                                        <option value="">select product</option>
                                           {
                                            salesList?.map( (item, index) =>  <option key={index+1} value={`${item?.productName}=`}>{item?.productName}</option>)
                                           }
                                          
                                        </select>
                                        <label className={imgmodal.useFont} htmlFor="">Select Glass Type: </label>
                                        <select name="" id="" onChange={(e) => setGlassTypeForProduct(e.target.value)}>
                                            <option value="">select glass type</option>
                                                {   !isLoading
                                                    ?
                                                    allGlass?.map((item, index) => <option key={index+1} value={`${item?.glassType}`}>{item?.glassType}</option> )
                                                    :
                                            <option value="">Loading...</option>
                                                }
                                        </select>
                                        <button onClick={() => {
                                             if(!itemName){
                                                toast.error('please select productName')
                                                return 
                                            }
                                            if(!glassTypeForProduct){
                                                toast.error('plase select glass type')
                                                return
                                            }
                                            setAddProductAndGlass(prev => [...prev, `${itemName}${glassTypeForProduct}`] )
                                           
                                        }} style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '1px 5px', border:'none', cursor:'pointer', marginLeft:'5px' }}>Add</button>
                                        <br />
                                        <br />
                                        <div>
                                            {
                                                addProductAndGlass?.map((item,index) => <span className={imgmodal.useFont} key={index+1}> {index+1}: {item} <i onClick={() => {
                                                    const deletedItem =addProductAndGlass?.filter((_, i)  => i !== index )
                                                    setAddProductAndGlass(deletedItem)
                                                }} style={{cursor: 'pointer'}} className="uil uil-times"></i>,</span> )
                                            }
                    
                                        </div>
                                        <br />
                                        <hr />
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
                                <label htmlFor="">Dalivery Date:</label>
                                <br />
                                <input type="date" name="" id="" {...register('deliveryDate')} required/>
                                <br />
                                <br />
                                <label htmlFor=""> Delivered:</label>
                                <br />
                                <select name="" id="" {...register('delivered')} required>
                                    <option value="">Select Delivery Option</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Not-Delivered">Not Delivered</option>
                                </select>
                                <br />
                                <br />
                                <label htmlFor="">Sales By: </label>
                                <br />
                                
                                <select value={salesBy} name="" id="" onChange={(e) => setSalesBy(e.target.value)} >
                                    <option value="">select employeeName</option>
                                    { !isLoading
                                        &&
                                        employeeData?.result?.map((employee,index) => <option key={index+1} value={employee?.employeeName}>{employee?.employeeName}</option> )
                                    }
                                    {
                                        <option value="">Developer</option>
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
                                <select value={glassType} name="" id="" onChange={(e) => setGlassType(e.target.value)}>
                                    <option value="">select glass type</option>
                                    {
                                        allGlass?.map((item, index) => <option key={index+1} value={item?.glassType}>{item?.glassType}</option> )
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
                                <label htmlFor="">advance:</label>
                                <br />
                                <input type="number" name="" id="" {...register('advance')}/>
                                <br />
                                <br />
                                <label htmlFor="">Comment:</label>
                                <br />
                                <textarea  name="" id="" {...register('comment')}/>
                                <br />
                                <label htmlFor="">PD:</label>
                                <br />
                                <input type="text"  name="" id="" {...register('pd')}/>
                                <br />
                               
                                <br />
                                <label htmlFor="">Total Quantity:</label>
                                <br />
                                <input type="text"  name="" id="" {...register('totalQuantity')}/>
                                <br />
                                <br />
                                <label htmlFor="">Payment Method:</label>
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
                               
                                { getCustomerInfo?.paymentHistory?.split('+')?.[2] !== undefined
                                    && <label htmlFor="">Due Payment Method:</label>}
                                <br />
                                {
                                    getCustomerInfo?.paymentHistory?.split('+')?.[2] !== undefined
                                    &&
                                    <select name="" id="" {...register('duePaymentMethod')} required>
                                        <option value="">Select Due Payment Method</option>
                                        <option value="Bank">Bank</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Bkash">Bkash</option>
                                        <option value="Nogod">Nogod</option>
                                        <option value="Rocket">Rocket</option>
                                    </select>
                                }
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

export default UpdateCustomerInfo;