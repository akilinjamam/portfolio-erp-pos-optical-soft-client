/* eslint-disable react/prop-types */
import moment from "moment";
import { calculateTotalPrice } from "../../calculation/calculateSum";
import useSalesRecord from "../../dashboard/salesModule/salesRecord/useSalesRecord";
import Barcode from "react-barcode";
import { invoiceCalculation } from "../../../invoiceCalculation/invoiceCalculation";
import { useEffect } from "react";

const InvoiceSlip = ({getCustomerInfo, salesList, copy='Copy will be added'}) => {

    const {saleData, refetch} = useSalesRecord();

    useEffect(() => {
      refetch()
    },[refetch])

    const invoiceNumber = invoiceCalculation(saleData)
    // const totalPriceArray = salesList?.map(item => (Number(item?.actualSalesPrice) * Number(item?.quantity)))
    // const totalPriceValue = calculateTotalPrice(totalPriceArray)
  
    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '10px', fontFamily: '"DM Sans", sans-serif', fontSize:'9px'}}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        <div>
            <h2> New AL-ARAFAT OPTICAL </h2>
        </div>
        <p style={{ fontSize: '10px' }}>
        
          Minhaz Complex (Ground Floor), 12-Jamal Khan Road, Chittagong<br />
          Cell: 01841 631667, 01729 435335
        </p>
      </div>

      {/* Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <div>
          {/* <p><strong>Sold By:</strong> {getCustomerInfo?.recorderName}</p> */}
          <p><strong>Invoice No:</strong></p>
          <p><strong>Order Date:</strong></p>
          <p><strong>Delivery Date:</strong></p>
          <p><strong>Name:</strong></p>
          <p><strong>Mobile:</strong></p>
          <p><strong>Glass:</strong></p>
          <p><strong>Payment Method:</strong></p>
        </div>
        <div style={{textAlign:"right"}}>
          <p>{getCustomerInfo?.invoiceBarcode ? getCustomerInfo?.invoiceBarcode?.slice(8) : invoiceNumber}</p>
          <p><strong></strong> {moment().format("YYYY-MM-DD")}</p>
          <p ><strong></strong> {getCustomerInfo?.deliveryDate ? getCustomerInfo?.deliveryDate : 'blank'}</p>
          <p >{getCustomerInfo?.customerName ? getCustomerInfo?.customerName : 'blank'}</p>
          <p >{getCustomerInfo?.phoneNumber ? getCustomerInfo?.phoneNumber : 'blank'}</p>
          <p >{getCustomerInfo?.glassType ? getCustomerInfo?.glassType : 'blank'}</p>
          <p >{getCustomerInfo?.paymentMethod ? getCustomerInfo?.paymentMethod : 'blank'}</p>
          {/* <p ><strong>Payment Staus:</strong> {(totalPriceValue === (Number(getCustomerInfo?.advance) + Number(getCustomerInfo?.discount))) ? 'Paid' : 'Not-Paid'}</p> */}
        </div>
      </div>

    
      {/* Eye Prescription Section */}
      <div style={{ marginTop: '5px' }}>
      
        <div style={{ width: '100%', marginLeft:'-5px' }}>
          <table style={{ borderCollapse: 'collapse' }} border="1">
            <thead>
              
              <tr>
                <th style={{ padding: '2px', fontSize:'10px', width:'20px' }}></th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Sph.</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Cyl.</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Axis</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Near</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center' }}>L</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftSph}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftCyl}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftAxis}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftNear}</td>
                
              </tr>
              <tr>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center' }}>R</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightSph}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightCyl}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightAxis}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightNear}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>

      {/* Instruction Section */}
      <div style={{ margin: '10px 0', fontSize:'9px' }}>
        <h3>PD:</h3>
        <h3>Remarks:</h3>
      </div>

      {/* Total Section */}
      <div style={{ width: '100%',marginTop: '5px',  marginLeft:'-5px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
          <tbody>
            <tr>
              <td style={{ padding: '2px', fontWeight:'bold', fontSize:'10px', width:'70%'}}>SUBTOTAL</td>
              <td style={{ padding: '2px', fontSize:'10px', textAlign:'right' }}>{calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'10px',  fontWeight:'bold' }}>DISCOUNT</td>
              <td style={{ padding: '2px', fontSize:'10px',  textAlign:'right'  }}>{getCustomerInfo?.discount !== undefined ? getCustomerInfo?.discount : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'10px', fontWeight:'bold' }}>PAID</td>
              <td style={{ padding: '2px', fontSize:'10px',  textAlign:'right'  }}>{getCustomerInfo?.advance !== undefined ? getCustomerInfo?.advance : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'10px', fontWeight:'bold' }}>TOTAL PAYABLE</td>
              <td style={{ padding: '2px',  textAlign:'right', fontSize:'10px'  }}>{(calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))) - (getCustomerInfo?.discount !== undefined ? Number(getCustomerInfo?.discount) : 0) - (getCustomerInfo?.advance !== undefined ? Number(getCustomerInfo?.advance) : 0)}  </td>
            </tr>
          </tbody>
        </table>

        <div style={{ width:"100%", display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'5px'}}>
            <Barcode  format="CODE128" fontSize={15} width={1.8} height={30} value={getCustomerInfo?.invoiceBarcode ? getCustomerInfo?.invoiceBarcode : `${moment().format("YYYYMMDD")}${invoiceNumber}`}/>   
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: '5px', textAlign: 'center', fontSize: '9px' }}>
        <p>বিঃদ্রঃ ডেলিভারি বিকাল ৫ টার পর। ১৫ দিনের মধ্যে ডেলিভারি না নিলে পরে হারানো গেলে অথবা পুরানো জিনিস মেরামতের সময় নষ্ট হলে কোম্পানি দায়ী থাকবে না।</p>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '10px', width:'100%', height:'30px', backgroundColor:'black', display:'flex', alignItems:'center', justifyContent:"space-between",color:'white', padding: '0 5px' }}>
            <p>{copy}</p>
            <p>Any Complain: 01521-484359</p>
      </div>
    </div>
    );
};

export default InvoiceSlip;