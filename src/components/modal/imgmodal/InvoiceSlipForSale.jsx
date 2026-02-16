/* eslint-disable react/prop-types */
import moment from "moment";
import { calculateTotalPrice } from "../../calculation/calculateSum";

import Barcode from "react-barcode";



const InvoiceSlipForSale = ({getCustomerInfo, salesList, copy='Copy will be added', updateCustomerInfo}) => {

   

    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '10px', fontFamily: '"DM Sans", sans-serif', fontSize:'9px'}}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        <div>
            <h2>  </h2>
        </div>
        <p style={{ fontSize: '10px' }}>
        
        
        </p>
      </div>

      {/* Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <div>
          {/* <p><strong>Sold By:</strong> {getCustomerInfo?.recorderName}</p> */}
          <p style={{ fontSize:'10px'}}><strong>Invoice No:</strong></p>
          <p><strong>Order Date:</strong></p>
          <p><strong>Delivery Date:</strong></p>
          <p><strong>Name:</strong></p>
          <p><strong>Mobile:</strong></p>
          {/* <p><strong>Glass:</strong></p> */}
          <p><strong>Lense:</strong></p>
          <p><strong>Payment Method:</strong></p>
        </div>
        <div style={{textAlign:"right"}}>
          <p style={{fontWeight:'bold', fontSize:'10px'}}>{getCustomerInfo?.invoiceBarcode?.toString()?.slice(8)}</p>
          <p><strong></strong> {updateCustomerInfo ? getCustomerInfo?.createdAt?.slice(0,10) :moment().format("YYYY-MM-DD") }</p>
          <p ><strong></strong> {getCustomerInfo?.deliveryDate ? getCustomerInfo?.deliveryDate : 'blank'}</p>
          <p >{getCustomerInfo?.customerName ? getCustomerInfo?.customerName : 'blank'}</p>
          <p >{getCustomerInfo?.phoneNumber ? getCustomerInfo?.phoneNumber : 'blank'}</p>
          {/* <p >{getCustomerInfo?.glassType ? getCustomerInfo?.glassType : 'blank'}</p> */}
          <p >{getCustomerInfo?.paymentMethod ? getCustomerInfo?.lense : 'blank'}</p>
          <p >{getCustomerInfo?.paymentMethod ? getCustomerInfo?.paymentMethod : 'blank'}</p>
          {/* <p ><strong>Payment Staus:</strong> {(totalPriceValue === (Number(getCustomerInfo?.advance) + Number(getCustomerInfo?.discount))) ? 'Paid' : 'Not-Paid'}</p> */}
        </div>
      </div>

    
      {/* Eye Prescription Section */}
      <div style={{ width:'100%',marginTop: '5px' }}>
      
        <div style={{ width: '100%' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }} border="1">
            <thead>         
              <tr>
                <th style={{ padding: '3px', fontSize:'10px', width:'20px' }}></th>
                <th style={{ padding: '3px', fontSize:'10px', textAlign:'center'  }}>Sph.</th>
                <th style={{ padding: '3px', fontSize:'10px', textAlign:'center'  }}>Cyl.</th>
                <th style={{ padding: '3px', fontSize:'10px', textAlign:'center'  }}>Axis</th>
                <th style={{ padding: '3px', fontSize:'10px', textAlign:'center'  }}>Near</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center' }}>R</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.rightSph}</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.rightCyl}</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.rightAxis}</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.rightNear}</td>
              </tr>
              <tr>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center' }}>L</td>
                <td style={{ height:'20px', fontSize:'10px' , textAlign:'center' }}>{getCustomerInfo?.leftSph}</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.leftCyl}</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.leftAxis}</td>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center'  }}>{getCustomerInfo?.leftNear}</td>
                
              </tr>
              
              
            </tbody>
          </table>
        </div>
      </div>

      {/* Instruction Section */}
      <div style={{ margin: '10px 0', fontSize:'9px' }}>
        <h3>PD: {getCustomerInfo?.comment?.split('=')?.[1]}</h3>
        <h3>Remarks: {getCustomerInfo?.comment?.split('=')?.[0]}</h3>
        <h3>Glass Type: <span>{getCustomerInfo?.glassType}</span></h3>
      </div>

      {/* Total Section */}
      <div style={{ width: '100%',marginTop: '5px' }}>
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
            <Barcode  format="CODE128" fontSize={15} width={1.8} height={30} value={getCustomerInfo?.invoiceBarcode}/>   
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

export default InvoiceSlipForSale;