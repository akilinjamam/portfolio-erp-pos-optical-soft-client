// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import pos from './Pos.module.scss';
import usePos from './usePos';
import { toast } from 'react-toastify';
import PosListTable from './posListTable/PosListTable';
import { useDispatch, useSelector } from 'react-redux';
import {   addKeyGuard, addSalesList, clearCustomerInfo, closeModal, openModal, removeKeyGuard, removeNewGlassType } from '../../../modal/imgmodal/imgModalSlice';
import { useMutation } from '@tanstack/react-query';
import { fetchPostSaleData } from '../../../../data/fetchedData/fetchSaleData';
import moment from 'moment';
import useSaleData from '../../../../data/saleData/useSaleData';
import { invoiceCalculation } from '../../../../invoiceCalculation/invoiceCalculation';
import useSalesRecord from '../salesRecord/useSalesRecord';
const Pos = () => {
    
    const keyGruard = useSelector(state => state.imgModal.keyGuard);
    const {saleData} = useSaleData()
    const [inInput, setInInput] = useState(false)

    const invoiceNumber = invoiceCalculation(saleData)
    
    const {refetch} = useSalesRecord('', '', '')
    let customerInfo = useSelector(state => state.imgModal.customerInfo)
    console.log(customerInfo)
    
    const invoice = `${moment().format("YYYYMMDD")}${invoiceNumber}`
    console.log(invoice);
    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            console.log(data);
            return await fetchPostSaleData(data)
        },
        onSuccess: (data) => {  
            console.log(data?.data?.result?.[0]?.invoiceBarcode)
            

            if(data?.data?.success){
                localStorage.setItem('salesInfo', JSON.stringify(data?.data?.result?.[0]));
                dispatch(openModal('invoice'))
                toast.success('product added to sale list')
                refetch()
                refetchProduct
                setListOfSalesItem([])
                dispatch(clearCustomerInfo())
                dispatch(removeNewGlassType())
            }
        },
        onError: (data) => {
            toast.error('something went wrong')
            console.log('failed to add to sale list: ', data)
        }
    })


    const lock = useSelector(state => state.imgModal.lock)
    const dispatch = useDispatch();
    const {allProducts, priceArray, setPriceArray, quantityArray, setQuantityArray, refetch: refetchProduct} = usePos()

    useEffect(() => {
        refetch()
    },[refetch])
    useEffect(() => {
        refetchProduct   
    },[refetchProduct])
    
   
    const [barcodeId, setBarcodeId] = useState();
    const [searchByBarcode, setSearchByBarcode] = useState(false);
    const [isScanned, setIsScanned] = useState(false)
    const [price, setPrice] = useState(false)
    const [quantity, setQuantity] = useState(false)
    const finProduct = allProducts?.find(f => f?.barcode === barcodeId)
    console.log(finProduct?.img);
    
    if(priceArray?.length > 0) {
        if(quantityArray?.length === 0) {
           if(!quantity){
                setQuantityArray([1])
           }
        }
    }
  
   
  useEffect(() => {
      let barcode = '';
      let interval;
      
    document.addEventListener('keydown', function(e){
        
        if(interval){
         clearInterval(interval)
     }
     if(e.code === 'Enter'){
         if(barcode){
             handleBarcode(barcode)
             barcode = '';
             return
         }    
     }
     if(e.key != 'Shift'){
        if(isScanned){
            barcode += e.key
            interval = setInterval(() => barcode = '', 20)
        }
     }
    })
 
     const handleBarcode = (scanned_barcode) => {
       
         setBarcodeId(scanned_barcode)
     }
  },[isScanned])
  

  const calculationValue = [1,2,3,4,5,6,7,8,9,'Delete',0,'Add Item']
  useEffect(() => {
    const handleKeyPress = (e) => {
        console.log(e.key)
       if(!lock){
        if(quantity){
            if(quantityArray.length === 13){
                setQuantityArray([])
            }
            let key = parseInt(e.key);
            const findKey = calculationValue.find(value => value === key);
    
            if (findKey !== undefined) {
              
                setQuantityArray(prevArray => [...prevArray, findKey]);
            }
    
            if(e.key === 'Delete' || e.key === 'Backspace'){
                let lastValue = [...quantityArray];
                lastValue.pop()
                setQuantityArray(lastValue)
            }
            if(e.key === 'a'){
                setQuantityArray([])
            }
           }
           if(price){
            if(priceArray.length === 13){
                setPriceArray([])
            }
            let key = parseInt(e.key);
            const findKey = calculationValue.find(value => value === key);
    
            if (findKey !== undefined) {
               
                setPriceArray(prevArray => [...prevArray, findKey]);
            }
    
            if(e.key === 'Delete' || e.key === 'Backspace'){
                let lastValue = [...priceArray];
                lastValue.pop()
                setPriceArray(lastValue)
            }
            if(e.key === 'a'){
                setPriceArray([])
            }
        }
       }
       
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
        document.removeEventListener('keydown', handleKeyPress);
    };
});

    useEffect(() => {
        const handleQuantityAndPrice = (e) => {
            if(!lock){
                if(e.key === 'Enter'){
                    setQuantity(false)
                    setPrice(false)
                    setIsScanned(true)
                }
                if(e.key === 'q' || e.key === 'Q' ){
                    setQuantity(true)
                    setPrice(false)
                    setIsScanned(false)
                    setSearchByBarcode(false)
                    setInInput(false)
                }
                if(e.key === 'p' || e.key === 'P'){
                    setPrice(true)
                    setQuantity(false)
                    setIsScanned(false)
                    setSearchByBarcode(false)
                    setInInput(false)
                }
                if(e.key === 's' || e.key === 'S'){
                    setIsScanned(true)
                    setPrice(false)
                    setQuantity(false)
                    setPriceArray([])
                    setQuantityArray([])
                    setSearchByBarcode(false)
                    setInInput(false)
                }
            }
        }

        document.addEventListener('keydown', handleQuantityAndPrice)

        return () => {
            document.removeEventListener('keydown', handleQuantityAndPrice)
        }

    },[setQuantityArray,setPriceArray, lock,])
    
    const salesItem = {
        id: finProduct?._id,
        productName: finProduct?.productName,
        actualSalesPrice: Number(priceArray?.join('')),
        purchasePrice: finProduct?.purchasePrice,
        category: finProduct?.category,
        quantity: Number(quantityArray?.join('')),
        remainingQuantity: Number(finProduct?.quantity) - Number(quantityArray?.join('')),
        material: finProduct?.material,
        frameType: finProduct?.frameType,
        size: finProduct?.size,
        shape: finProduct?.shape,
        barcode: finProduct?.barcode,
        inStock: Number(quantityArray.join('')) === Number(finProduct?.quantity) ? false : true
    }

    const [listOfSalesItem, setListOfSalesItem] = useState([])
   

    const isExistsId = listOfSalesItem?.find(f => f?.id === finProduct?._id);

    const handleNumber = (value) => {
        if(price){
            if((typeof value) === 'number' ){
                setPriceArray(prev => [...prev,value])
            } 
        }
        if(quantity){
            if((typeof value) === 'number' ){
                setQuantityArray(prev => [...prev,value])
            } 
        }
        if(value === 'Delete' && price){
            let lastValue = [...priceArray];
            lastValue.pop()
            setPriceArray(lastValue)
        }
        if(value === 'Delete' && quantity){
            let lastValue = [...quantityArray];
            lastValue.pop()
            setQuantityArray(lastValue)
        }
    
        if(value === 'Add Item'){
            if(barcodeId){
                if(!isExistsId?.id){
                     if(Number(priceArray?.join('')) > 0 && Number(quantityArray?.join('')) > 0 ){
                         if(Number(quantityArray?.join('')) <= Number(finProduct?.quantity)){
                             setListOfSalesItem((prevItem => [...prevItem, salesItem ]))
                             
                         }else{
                             toast.error('given quantity is out of stock')
                         }
                     }else{
                         toast.error('please add price and quantity')
                     }
                }else{
                 toast.error('this item already listed to sales item')
                }
             }else{
                 toast.error('please scan first')
             }
        }
    }

    useEffect(() => {
     document.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            setPriceArray([])
            setQuantityArray([])
        }
     })   
    },[setQuantityArray, setPriceArray])


    useEffect(() => {
        const salesItemForKeyDown = {
            id: finProduct?._id,
            productName: finProduct?.productName,
            actualSalesPrice: Number(priceArray?.join('')),
            purchasePrice: finProduct?.purchasePrice,
            category: finProduct?.category,
            quantity: Number(quantityArray?.join('')),
            remainingQuantity: Number(finProduct?.quantity) - Number(quantityArray?.join('')),
            material: finProduct?.material,
            frameType: finProduct?.frameType,
            size: finProduct?.size,
            shape: finProduct?.shape,
            barcode: finProduct?.barcode,
            inStock: Number(quantityArray.join('')) === Number(finProduct?.quantity) ? false : true
        }

        console.log(quantityArray);

        const handleKeyDowns = (e) => {

            if(!lock){
                if(e.key === 'l' || e.key === 'L'){
                    if(barcodeId){
                       if(!isExistsId?.id){
                            if(Number(priceArray?.join('')) > 0 && Number(quantityArray?.join('')) > 0 ){
                                if(Number(quantityArray?.join('')) <= Number(finProduct?.quantity)){
                                    setListOfSalesItem((prevItem => [...prevItem, salesItemForKeyDown ]))
                                    
                                }else{
                                    toast.error('given quantity is out of stock')
                                }
                            }else{
                                toast.error('please add price and quantity')
                            }
                       }else{
                        toast.error('this item already listed to sales item')
                       }
                    }else{
                        toast.error('please scan first')
                    }
                }
            }
        };
    
        // Add event listener
        document.addEventListener('keydown', handleKeyDowns);
    
        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDowns);
        };
    }, [finProduct, priceArray, quantityArray, barcodeId, isExistsId, lock,listOfSalesItem, dispatch]);  // Add relevant dependencies here

    const handleDeleteSale = (deletedId) => {
        const restItems = listOfSalesItem?.filter(f => f?.id !== deletedId);
        setListOfSalesItem(restItems)
    }

    const handleSale = () => {
        if(customerInfo?.delivered && customerInfo?.deliveryDate && customerInfo?.recorderName && customerInfo?.paymentMethod){

            const saleData = {
                customerName:customerInfo?.customerName === undefined ? 'unknown' : customerInfo?.customerName,
                phoneNumber:customerInfo?.phoneNumber === undefined ? 'blank' : customerInfo?.phoneNumber,
                address:customerInfo?.address === undefined ? 'blank' : customerInfo?.address,
                products: listOfSalesItem,
                referredBy:customerInfo?.referredBy === undefined ? 'blank' : customerInfo?.referredBy,
                advance:customerInfo?.advance === undefined ? '0' : customerInfo?.advance,
                todayPaid:customerInfo?.todayPaid === undefined ? '0' : customerInfo?.todayPaid,
                paymentHistory:customerInfo?.paymentHistory === undefined ? '+0' : customerInfo?.paymentHistory,
                paymentDate:customerInfo?.paymentDate,
                lense: customerInfo?.lense === undefined ? 'blank' : customerInfo?.lense,
                glassType: customerInfo?.glassType === undefined ? 'blank' : customerInfo?.glassType,
                
                
                discount:customerInfo?.discount === undefined ? '0' : customerInfo?.discount,
                leftAxis:customerInfo?.leftAxis === undefined ? 'blank' : customerInfo?.leftAxis,
                leftCyl:customerInfo?.leftCyl === undefined ? 'blank' : customerInfo?.leftCyl,
                leftSph:customerInfo?.leftSph === undefined ? 'blank' : customerInfo?.leftSph,
                leftNear:customerInfo?.leftNear === undefined ? 'blank' : customerInfo?.leftNear,
                rightAxis:customerInfo?.rightAxis === undefined ? 'blank' : customerInfo?.rightAxis,
                rightCyl:customerInfo?.rightCyl === undefined ? 'blank' : customerInfo?.rightCyl,
                rightSph:customerInfo?.rightSph === undefined ? 'blank' : customerInfo?.rightSph,
                rightNear:customerInfo?.rightNear === undefined ? 'blank' : customerInfo?.rightNear,        
                deliveryDate:customerInfo?.deliveryDate === undefined ? 'blank' : customerInfo?.deliveryDate,      
                delivered:customerInfo?.delivered === undefined ? 'blank' : customerInfo?.delivered,      
                comment:customerInfo?.comment === undefined ? 'blank' : customerInfo?.comment,      
                recorderName:customerInfo?.recorderName === undefined ? 'blank' : customerInfo?.recorderName,      
                paymentMethod:customerInfo?.paymentMethod === undefined ? 'blank' : customerInfo?.paymentMethod,
                paymentMethodHistory: customerInfo?.paymentMethodHistory === undefined ? '+Blank' : customerInfo?.paymentMethodHistory,      
                invoiceBarcode:invoice === undefined ? 'blank' : invoice,
                totalQuantity: customerInfo?.totalQuantity === undefined ? '0' : customerInfo?.totalQuantity,      
            }
            if(listOfSalesItem?.length > 0){
                mutate(saleData)
            }else{
                toast.error('please add products to sale')
            }

        }else{
            toast.error('please select add customer info')
        }
        
    }

    useEffect(() => {
        const handleSalePress = (e) => {
            if(!lock){
                if(!isPending){
                    if(e.key === 'i' || e.key === 'I'){
                        if(customerInfo?.delivered && customerInfo?.deliveryDate && customerInfo?.recorderName && customerInfo?.paymentMethod){
                        const saleData = {
                            customerName:customerInfo?.customerName === undefined ? 'unknown' : customerInfo?.customerName,
                            phoneNumber:customerInfo?.phoneNumber === undefined ? 'blank' : customerInfo?.phoneNumber,
                            address:customerInfo?.address === undefined ? 'blank' : customerInfo?.address,
                            products: listOfSalesItem,
                            referredBy:customerInfo?.referredBy === undefined ? 'blank' : customerInfo?.referredBy,
                            advance:customerInfo?.advance === undefined ? '0' : customerInfo?.advance,
                            todayPaid:customerInfo?.todayPaid === undefined ? '0' : customerInfo?.todayPaid,
                            paymentHistory:customerInfo?.paymentHistory === undefined ? '+0' : customerInfo?.paymentHistory,
                            paymentDate:customerInfo?.paymentDate,
                            lense: customerInfo?.lense === undefined ? 'blank' : customerInfo?.lense,
                            glassType: customerInfo?.glassType === undefined ? 'blank' : customerInfo?.glassType,
                           
                           
                            discount:customerInfo?.discount === undefined ? '0' : customerInfo?.discount,
                            leftAxis:customerInfo?.leftAxis === undefined ? 'blank' : customerInfo?.leftAxis,
                            leftCyl:customerInfo?.leftCyl === undefined ? 'blank' : customerInfo?.leftCyl,
                            leftSph:customerInfo?.leftSph === undefined ? 'blank' : customerInfo?.leftSph,
                            leftNear:customerInfo?.leftNear === undefined ? 'blank' : customerInfo?.leftNear,
                            rightAxis:customerInfo?.rightAxis === undefined ? 'blank' : customerInfo?.rightAxis,
                            rightCyl:customerInfo?.rightCyl === undefined ? 'blank' : customerInfo?.rightCyl,
                            rightSph:customerInfo?.rightSph === undefined ? 'blank' : customerInfo?.rightSph,
                            rightNear:customerInfo?.rightNear === undefined ? 'blank' : customerInfo?.rightNear,
                            deliveryDate:customerInfo?.deliveryDate === undefined ? 'blank' : customerInfo?.deliveryDate,
                            delivered:customerInfo?.delivered === undefined ? 'blank' : customerInfo?.delivered,      
                            comment:customerInfo?.comment === undefined ? 'blank' : customerInfo?.comment,      
                            recorderName:customerInfo?.recorderName === undefined ? 'blank' : customerInfo?.recorderName,      
                            paymentMethod:customerInfo?.paymentMethod === undefined ? 'blank' : customerInfo?.paymentMethod,
                            paymentMethodHistory: customerInfo?.paymentMethodHistory === undefined ? '+Blank' : customerInfo?.paymentMethodHistory,
                            invoiceBarcode:invoice === undefined ? 'blank' : invoice,
                             totalQuantity: customerInfo?.totalQuantity === undefined ? '0' : customerInfo?.totalQuantity,
                        }

                        if(listOfSalesItem?.length > 0){
                            console.log(saleData)
                            mutate(saleData)
                        }else{
                            toast.error('please add products to sale')
                        }
                    }else{
                        toast.error('please select add customer info')
                    }
                    
                }
                }
            }
            
        }

        document.addEventListener('keydown', handleSalePress);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleSalePress);
        };
    },[customerInfo,listOfSalesItem, lock, mutate, invoice, isPending])


    useEffect(() => {
        dispatch(addSalesList(listOfSalesItem))
    },[listOfSalesItem, dispatch])

    useEffect(() => {
        const handlePrintPress = (e) => {
            if(e.key ==='j' || e.key === 'J'){
                 refetch()
                    if (listOfSalesItem?.length > 0) {
                        toast.error('print invoice after add to sale')
                        return 
                    }    
                dispatch(openModal('invoice'))
            }

            if(e.key === 'Escape'){
                dispatch(closeModal())
            }
        }
        document.addEventListener('keydown', handlePrintPress);
        return () => {
            document.removeEventListener('keydown', handlePrintPress);
        }
    })

    console.log(inInput)

    useEffect(() => {
        const handleCustoemerInfoPress = (e) => {
            console.log(e.key)
            if(e.key === 'Control'){
                if(!inInput){
                    dispatch(addKeyGuard())
                    dispatch(openModal('customer'))
                }
            }
            if(e.key === 'Escape'){
                dispatch(closeModal())
                dispatch(removeKeyGuard())
               
            }
        }

        document.addEventListener('keydown', handleCustoemerInfoPress);
        return () => {
            document.removeEventListener('keydown', handleCustoemerInfoPress);
        }
    },[keyGruard, dispatch, inInput])

    console.log(keyGruard)

    useEffect(() => {
        const handleSearchPress = (e) => {
            if(e.key === 'b' || e.key === 'B'){
                if(!keyGruard){
                     setSearchByBarcode(!searchByBarcode)
                }
            }
        }
        document.addEventListener('keydown', handleSearchPress);
        return () => {  
            document.removeEventListener('keydown', handleSearchPress);
        }
    })

// html part--------------------------------------------------------------------------------
    return (
      <div className={pos.superMain}>
         <div onDoubleClick={() => {
        setQuantity(false)
        setPrice(false)
        setIsScanned(false)
       }} className={`${pos.main}`}>
         <div  className={`flex_around`}>
            <div className={`${pos.inputAreaOne} flex_center`}>
                <div className={`${pos.container} flex_between`}>
                    <div className={`${pos.product_info} flex_between`}>
                        <div>
                            <p>Product Name: </p>
                            <p>Quantity: </p>
                            <p>Purchase price: </p>
                            <p>Category: </p>
                            <p>Barcode NO: </p>
                            <p>Material: </p>
                            <p>Frame: </p>
                            <p>Size: </p>
                            <p>Shape: </p>
                        </div>
                        <div>
                            <p>{finProduct?.productName}</p>
                            <p>{finProduct?.quantity}</p>
                            <p>{finProduct?.purchasePrice}</p>
                            <p>{finProduct?.category}</p>
                            <p>{finProduct?.barcode}</p>
                            <p>{finProduct?.material }</p>
                            <p>{finProduct?.frameType}</p>
                            <p>{finProduct?.size}</p>
                            <p>{finProduct?.shape}</p>
                
                        </div>
                    </div>
                   { (price || quantity)
                        &&
                        <div  className={`${pos.showQuantityAndPrice}`}>
                            <div className={`${pos.showQuantityAndPriceContainer}`}>
                                    <div>
                                            <p>Sales Price: </p>
                                            <p>Quantity: </p>
                                    </div>
                                    <div>
                                            <p>{priceArray?.length === 0 ? 0 : priceArray.join('')}</p>
                                            <p>{quantityArray?.length === 0 ? 0 : quantityArray.join('')}</p>
                                    </div>
                            </div>
                            <hr />
                            <div className={`${pos.totalPriceQuantityValue} flex_between`}>
                                <p>Total :</p>
                                <p>{(priceArray?.length !== 0 && quantityArray?.length !== 0) ? (parseInt(quantityArray.join('')) * parseInt(priceArray.join(''))) : 0}</p> 
                            </div>
                        </div>
                   }
                    <div className={`${pos.calculationAndSubmit}`}>
                       <div className={`${pos.productCalculation} flex_between`}>
                            <div className={`${pos.priceQuantityCalculation}`}>
                                <div title='SHORTCUT: Q' onClick={(e) => {
                                    e.stopPropagation()
                                    setQuantity(true)
                                    setPrice(false)
                                    setIsScanned(false)
                                    setSearchByBarcode(false)
                                    setInInput(false)
                                }} style={{border: `${quantity ? '2px solid black' : 'none'}`, cursor:'pointer'}} className={`${pos.quantityBtn} flex_center`}>
                                    Quantity
                                </div>
                                <div title='SHORTCUT: P' onClick={(e) => {
                                    e.stopPropagation()
                                    setPrice(true)
                                    setQuantity(false)
                                    setIsScanned(false)
                                    setSearchByBarcode(false)
                                    setInInput(false)
                                }} style={{border: `${price ? '2px solid black' : 'none'}`, cursor:'pointer'}} className={`${pos.priceBtn} flex_center`}>
                                    Price
                                </div>
                                <div title='SHORTCUT: S' onClick={(e) => {
                                    e.stopPropagation()
                                    setIsScanned(true)
                                    setPrice(false)
                                    setQuantity(false)
                                    setPriceArray([])
                                    setQuantityArray([])
                                    setSearchByBarcode(false)
                                    setInInput(false)
                                }} style={{border: `${isScanned ? '2px solid black' : 'none'}`, cursor:'pointer'}} className={`${pos.scanBtn} flex_center`}>
                                    Scan
                                </div>
                            </div>
                            <div style={{backgroundColor: `${quantity ? 'orange': 'green'}`}} className={`${pos.numberCalculation}`}>
                                { !searchByBarcode
                                    ?
                                    calculationValue.map((item, index) => {
                                        return (
                                        <div onClick={() => handleNumber(item)} key={index+1}><p title={item === 'Delete' && 'SHORTCUT: D' || item === 'Add Item' && 'SHORTCUT: L'}>{item}</p></div>
                                    )
                                    })
                                    :
                                    <input onClick={() => setInInput(true)} onBlur={() => setInInput(false)} onMouseLeave={() => setInInput(false)} placeholder='search by typing barcode' style={{height:'20px', border:'none', outline:'none', padding:'0 5px', borderRadius:'5px'}} type="number" name="" id="" onChange={(e) => setBarcodeId(e.target.value)}/>
                                }
                            </div>
                       </div>
                       <div className={`${pos.submitSale} flex_between`}>
                            <button title='SHORTCUT: PRESS CONTROL' onClick={() => {
                                dispatch(openModal('customer'))
                            }} className={`${pos.submitSaleAddCustomer}`}>Add Customer Info</button>
                            <button title='SHORTCUT: J' onClick={() => {
                                refetch()
                                if (listOfSalesItem?.length > 0) {
                                    toast.error('print invoice after add to sale')
                                    return 
                                } 
                                dispatch(openModal('invoice'))
                            }} className={`${pos.submitInvoice}`}>Print Invoice</button>
                       </div>
                       <div className={`${pos.submitSale} flex_between`}>
                            {
                                isPending
                                ? 
                                <button className={`${pos.submitSaleAddSale}`}>Loading...</button>
                                :
                                <button onClick={handleSale}  title='SHORTCUT: I' className={`${pos.submitSaleAddSale}`}>
                                Add to Sale
                                </button>
                            }
                            <button onClick={() => setSearchByBarcode(!searchByBarcode) } title='search by barcode | SHORTCUT: B' className={`${pos.submitSale_switch} flex_center`}><i className="uil uil-search"></i></button>
                       </div>
                    </div>
                    
                </div>
            </div>
            <div className={`${pos.inputAreaTwo} flex_center`}>
                <div id='last-barcode' className={`${pos.container} flex_center`}>
                    {
                        (finProduct?.img !== 'not added') ? (finProduct?.img !== undefined ? <img width={200} height={160} src={finProduct?.img} alt="" /> : '') : barcodeId ? <p>Image not added !</p> : ''
                    }
                </div>
            </div>
        </div>
        <PosListTable listOfSalesItem={listOfSalesItem} handleDeleteSale={handleDeleteSale}/>
        </div>
        <div className={pos.mobileMain}>
                Only Available for Desktop Version
        </div>
      </div>
    );
};

export default Pos;

