/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import imgmodal from './ImgModal.module.scss';
import customerContainer from './CustomerContainer.module.scss';
import { calculateTotalPrice } from "../../calculation/calculateSum";
import moment from "moment";
import { useEffect, useState } from "react";
import useGetEmployeeData from "../../../data/employeeData/useGetEmployeeData";
import { useDeleteGlassData, useGetGlassData, usePostGlassTypeData } from "../../../data/glassTypeData/useGlassTypeData";
import { addNewGlassType, removeKeyGuard, resetFormState } from "./imgModalSlice";
import { useSelector } from "react-redux";
import useSaleData from "../../../data/saleData/useSaleData";

const CustomerContainer = ({dispatch, customerInfo, closeModal, type, open, salesList}) => {

    const {employeeData, isLoading} = useGetEmployeeData('', '', '');
    
    const [addGlass, setAddGlass] = useState('');
    const [deleteGlass, setDeleteGlass] = useState('');
    const [itemName, setItemName] = useState('');
    const [addProductAndGlass, setAddProductAndGlass] = useState([]);

   
    const glassType = useSelector((state) => state.imgModal.glassType);
    const [glassTypeForProduct, setGlassTypeForProduct] = useState('');

    
  
    console.log(glassType)

    const [salesBy,setSalesBy] = useState('');
    console.log(salesBy);
    const todayDate =  moment().format('YYYY-MM-DD');
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        watch
      } = useForm();

     

      const arrayOfTotalPriceValue = salesList?.map(item => (item?.actualSalesPrice * item?.quantity))
      const totalPriceValue = calculateTotalPrice(arrayOfTotalPriceValue)
      
      const resetForm = useSelector((state) => state.imgModal.resetForm);

      useEffect(() => {
        if(resetForm){
            reset()
        }
      }, [reset, dispatch, resetForm])

      
      useEffect(() => {
        dispatch(addNewGlassType(addProductAndGlass?.join(',')))
      }, [addProductAndGlass, dispatch])

      
      const onSubmit = (data) => {
          dispatch(resetFormState())
        if(salesList.length < 1){
            toast.error('please add products to Sales list first')
            return
        }

        if(Number(data?.discount) > totalPriceValue){
            toast.error(`discount price can not be more than total sales price ${totalPriceValue}`)
            return
        }

        if(Number(!data?.advance)){
            toast.error(`please give advance amount`)
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
            paymentMethodHistory:data?.paymentMethod === '' ? undefined : `+${data?.paymentMethod}`,
            comment:data?.comment === '' ? undefined : `${data?.comment}=${data?.pd}`,
            totalQuantity:data?.totalQuantity === '' ? undefined : data?.totalQuantity,

        }
        console.log(modifiedValue)
        dispatch(customerInfo(modifiedValue))
        toast.success('customer info added successfully')
        dispatch(closeModal())
        dispatch(removeKeyGuard());
      }

      const {glassData, refetch} = useGetGlassData();
      const allGlass = glassData?.result?.sort((a, b) => a.glassType.toLowerCase() > b.glassType.toLowerCase() ? 1 : -1);
      const {mutate: addGlassType} = usePostGlassTypeData(refetch);

      const {mutate: deleteGlassType} = useDeleteGlassData(refetch)

      const handleAddGlass = () => {
            if(addGlass === ''){
                toast.error('please add glass type')
                return
            }
            addGlassType({glassType: addGlass})
            setAddGlass('')
      }

      const handleDelete = () => {
            if(deleteGlass === ''){
                toast.error('please select glass type')
                return
            }
            deleteGlassType(deleteGlass);
            setDeleteGlass('')
      }

    

     useEffect(() => {
        const handleKeyDown = (e) => {
    if ((e.altKey || e.metaKey) && e.key === 's') {
      e.preventDefault(); // prevent browser's default save
      handleSubmit(onSubmit)(); // trigger form submit
      dispatch(removeKeyGuard());
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
});


const {saleData} = useSaleData('', '', '');

const typedPhoneNumber = getValues('phoneNumber');
const phoneNumber = watch('phoneNumber');
useEffect(() => {
    if (!typedPhoneNumber) return;
    
    if(saleData?.result?.length > 0){
        const findCustomerNumber = saleData?.result?.find(item => item?.phoneNumber === typedPhoneNumber);

        if(findCustomerNumber){
            setValue('phoneNumber', findCustomerNumber?.phoneNumber);
            setValue('address', findCustomerNumber?.address);
            setValue('customerName', findCustomerNumber?.customerName);
            setValue('leftSph', findCustomerNumber?.leftSph);
            setValue('leftCyl', findCustomerNumber?.leftCyl);
            setValue('leftAxis', findCustomerNumber?.leftAxis);
            setValue('leftNear', findCustomerNumber?.leftNear);
            setValue('rightSph', findCustomerNumber?.rightSph);     
            setValue('rightCyl', findCustomerNumber?.rightCyl);
            setValue('rightAxis', findCustomerNumber?.rightAxis);
            setValue('rightNear', findCustomerNumber?.rightNear);
           
        }else{
            setValue('phoneNumber', typedPhoneNumber);
            setValue('address', '');
            setValue('customerName', '');
            setValue('leftSph', '');
            setValue('leftCyl', '');
            setValue('leftAxis', '');
            setValue('leftNear', '');
            setValue('rightSph', '');     
            setValue('rightCyl', '');
            setValue('rightAxis', '');
            setValue('rightNear', '');
        }
    }
},[typedPhoneNumber, setValue, saleData, phoneNumber]);



    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'customer' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeCustomerContainer}`}>
                    <div className={`${imgmodal.cancelBtn}  flex_right`}>
                        <i onClick={() => { 
                        dispatch(closeModal())
                        dispatch(resetFormState())
                        dispatch(removeKeyGuard())
                        } } className="uil uil-times"></i>
                    </div>
                    <br />
                    <label className={imgmodal.useFont} htmlFor="">Add Glass Type: <span style={{color:'red'}}></span> </label>
                    <br />
                    <input value={addGlass} type="text" name="" id="" onChange={(e) => setAddGlass(e.target.value)}/>
                    <button style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '1px 5px', border:'none', cursor:'pointer', marginLeft:'5px' }} onClick={handleAddGlass}>Add</button>
                    <br />
                    <br />
                    <label className={imgmodal.useFont} htmlFor="">Delete Glass Type: <span style={{color:'red'}}></span> </label>
                    <br />
                    <select name="" id="" onChange={(e) => setDeleteGlass(e.target.value)}>
                        <option value="">select glass type</option>
                            {   !isLoading
                                ?
                                allGlass?.map((item, index) => <option key={index+1} value={item?._id}>{item?.glassType}</option> )
                                :
                        <option value="">Loading...</option>
                            }
                    </select>
                    
                    <button style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '1px 5px', border:'none', cursor:'pointer', marginLeft:'5px', }} onClick={handleDelete}>Delete</button>
                    <br />
                    <br />
                   
                    <p style={{marginBottom:'5px'}} className={imgmodal.useFont} htmlFor="">Add Glass Type for Individual Product: </p>
                    
                    <label className={imgmodal.useFont} htmlFor="">Select Product: </label>
                    <select style={{marginRight: '10px'}} name="" id="" onChange={(e) => setItemName(e.target.value)}>
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
                                <input type="text" name="" id="" {...register('phoneNumber')} placeholder="if matches, auto fill-up exists"/>
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
                                        employeeData?.result?.sort((a, b) => a.employeeName.toLowerCase() > b.employeeName.toLowerCase() ? 1 : -1).map((employee,index) => <option key={index+1} value={employee?.employeeName}>{employee?.employeeName}</option> )
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
                                <select name="" id="" onChange={(e) => dispatch(addNewGlassType(e.target.value))}>
                                    <option value="">select glass type</option>
                                    {   !isLoading
                                        ?
                                        allGlass?.map((item, index) => <option key={index+1} value={item?.glassType}>{item?.glassType}</option> )
                                        :
                                        <option value="">Loading...</option>
                                    }
                                </select>
                                <br />
                                <br />
                                
                            </div>
                            <div className={`${customerContainer.partTwo}`}>
                                <br />
                                <label htmlFor="">Discount: </label>
                                <br />
                                <input type="number" name="" id="" {...register('discount')}  onWheel={(e) => e.target.blur()}/>
                                <br />
                                <br />
                                <label htmlFor="">Advance:
                                    <span style={{color:'red'}}>*</span> 
                                    <span style={{marginLeft:'10px', position:'relative'}}>
                                        <span>Full Advance</span>
                                        <input style={{position:'absolute', bottom:'2px', right:'-15px'}} type="checkbox" name="" id="" onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            console.log(isChecked)
                                            if(isChecked){
                                                const strValue = totalPriceValue?.toString();
                                                setValue('advance', strValue)
                                            }else{
                                                setValue('advance', '')
                                            }
                                        }} />
                                    </span>
                                </label>
                                <br />
                                <input     type="number" name="" id="" {...register('advance')}  onWheel={(e) => e.target.blur()}/>
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
                            
                        </div>
                        <input title="SHORTCUT: alt + s" onClick={() => dispatch(resetFormState())} style={{backgroundColor:'#0D2F3F', color:'white', fontWeight:'bold', padding: '3px 5px', border:'none', cursor:'pointer'}} type="submit" value="save" />
                    </form>
                </section>
            </div>
    );
};

export default CustomerContainer;