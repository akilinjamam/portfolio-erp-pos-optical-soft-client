
import { useEffect, useState } from 'react';
import useSaleData from '../../../../data/saleData/useSaleData';
import salesInvoice from './SalesInvoice.module.scss';
import SalesInvoicTable from "./SalesInvoiceTable";
import { useDispatch } from 'react-redux';
import { addSalesListForSalesInvoice, customerInfoForSalesInvoice, openModal } from '../../../modal/imgmodal/imgModalSlice';
import { toast } from 'react-toastify';


const SalesInvoice = () => {
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


    const {products, ...getCustomerInfo} = findSalesByInvoiceNumber || {};
    console.log(barcodeId)
    
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
                    <button onClick={() => {
                        dispatch(addSalesListForSalesInvoice(products))
                        dispatch(customerInfoForSalesInvoice(getCustomerInfo))
                        dispatch(openModal('salesAdjust'))
                    } } className={salesInvoice.adjustBtn}>Adjust</button>
                }
            </div>
        </div>
    );
};

export default SalesInvoice;

