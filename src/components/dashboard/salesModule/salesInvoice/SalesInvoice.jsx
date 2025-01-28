
import { useEffect, useState } from 'react';
import useSaleData from '../../../../data/saleData/useSaleData';
import salesInvoice from './SalesInvoice.module.scss';
import SalesInvoicTable from "./SalesInvoiceTable";
import { useDispatch } from 'react-redux';
import { addSalesListForSalesInvoice, customerInfoForSalesInvoice, openModal } from '../../../modal/imgmodal/imgModalSlice';
import { toast } from 'react-toastify';
import useUpdateSaleData from '../../../../data/saleData/useUpdateSaleData';


const SalesInvoice = () => {
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const [query, setQuery] = useState('')
    const [barcodeId, setBarcodeId] = useState('');
    const {saleData, refetch} = useSaleData('', '', '');

    const dispatch = useDispatch();

    const findSalesByInvoiceNumber = saleData?.result?.find(f => f?.invoiceBarcode === query);
  
    useEffect(() => {
        refetch
    },[refetch])

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
            barcode += e.key
            interval = setInterval(() => barcode = '', 20)
       }
      })
   
       const handleBarcode = (scanned_barcode) => {
         
           setBarcodeId(scanned_barcode)
       }
    });

    useEffect(() => {
        setQuery(barcodeId)
    },[barcodeId]);

    useEffect(() => {
        setDeliveryStatus(findSalesByInvoiceNumber?.delivered);
    },[findSalesByInvoiceNumber])


    const {products, ...getCustomerInfo} = findSalesByInvoiceNumber || {};
    

    const {mutate:updateDeliveryStatus} = useUpdateSaleData(refetch)

    const updateDelivery = (status) => {
        const updateData = {
            id: findSalesByInvoiceNumber?._id,
            data: {
                delivered: status
            }
        }
        updateDeliveryStatus(updateData)
    }
    
    return (
        <div className={`${salesInvoice.main}`} >
            <div className={`${salesInvoice.titleBar} flex_left`}>
                <div className={`${salesInvoice.titleBarContainer}`}>
                    <i 
                    title="print preview"
                    className="uil uil-print"
                    onClick={() => {
                        if(findSalesByInvoiceNumber){
                            dispatch(addSalesListForSalesInvoice(products))
                            dispatch(customerInfoForSalesInvoice(getCustomerInfo))
                            dispatch(openModal('salesInvoice'))
                        }else{
                            toast.error('please scan or type invoice number first')
                        }
                    }}
                    ></i>
                    <input value={query} style={{padding: '0 2px'}} placeholder='search by invoice number' type="text" name="" id="" onChange={(e) => setQuery(e.target.value)} />
                    <i onClick={() => {
                        setQuery('')
                        setBarcodeId('')
                    }}  className="uil uil-times"></i>
                    
                </div>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'70vh'}}>
                <SalesInvoicTable data={findSalesByInvoiceNumber}/>
            </div>
            <div className={`${salesInvoice.adjust} flex_right`}>
                {
                    findSalesByInvoiceNumber
                    &&
                    <div>
                        <button style={{marginRight:'10px'}} onClick={() => {
                        dispatch(addSalesListForSalesInvoice(products))
                        dispatch(customerInfoForSalesInvoice(getCustomerInfo))
                        dispatch(openModal('salesAdjust'))
                    } } className={salesInvoice.adjustBtn}>Adjust Payment</button>

                        <select style={{marginRight:'10px'}} value={deliveryStatus} name="" id="" onChange={(e) => setDeliveryStatus(e.target.value)}>
                            
                            <option onClick={() => updateDelivery("Delivered")}>Delivered</option>
                            <option onClick={() => updateDelivery("Not-Delivered")} >Not-Delivered</option>
                        </select>
                        <button style={{marginRight:'10px'}} onClick={() => {
                        updateDelivery(deliveryStatus)
                    } } className={salesInvoice.adjustBtn}>Adjust Delivery Status</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default SalesInvoice;

