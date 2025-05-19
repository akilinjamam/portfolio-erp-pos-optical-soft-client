/* eslint-disable react/prop-types */
import moment from "moment";
import { calculateTotalPrice } from "../../calculation/calculateSum";
import glassImg from '../../../images/Vector.png'
import Barcode from "react-barcode";



const InvoiceSlipForSaleV2 = ({getCustomerInfo, salesList, copy='Copy will be added', updateCustomerInfo}) => {

   

    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '10px', fontFamily: '"inter", sans-serif', fontSize:'9px', position:'relative'}}>
        <div>
            <img src={glassImg} alt="glass" style={{ width: '40%', height: 'auto', marginBottom: '10px', position:'absolute',top:'-1px', left:'-3px' }} />
        </div>
      {/* Header Section */}
      <div style={{ textAlign: 'center',  paddingBottom: '10px' }}>
        <div>
            <h5 style={{textAlign:'left', width:'86%', margin:'auto',fontWeight:'bolder'}}>NEW</h5>
            <h2 style={{fontWeight:'bolder', fontSize:'19px', marginBottom:'-4px', marginTop:'-3px'}}> AL-ARAFAT OPTICAL </h2>
        </div>
        <div>
            <h5 style={{textAlign:'left', width:'85%', margin:'auto',fontWeight:'bold'}}>নিউ</h5>
            <h2 style={{fontWeight:'bolder', fontSize:'15px', marginTop:'-3px'}}> আল-আরাফাত অপটিক্যাল </h2>
        </div>
        <p style={{ fontSize: '9px', fontWeight:'bolder', margin:'5px 0' }}>
        
          Minhaz Complex (Ground Floor),<br /> 12-Jamal Khan Road, Chittagong<br />
          Cell: 01841 631667, 01729 435335
        </p>
        
        <p style={{ fontSize: '17px', fontWeight:'bolder' }}>
          INVOICE: <span style={{ fontSize:'17px', }}>{getCustomerInfo?.invoiceBarcode?.toString()?.slice(8)}</span>
        </p>
      </div>

      {/* Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize:'11px' }}>
        <div style={{width:'50%', textAlign:"left"}}>
          {/* <p><strong>Sold By:</strong> {getCustomerInfo?.recorderName}</p> */}
          {/* <p style={{ fontSize:'10px'}}><strong>Invoice No:</strong></p> */}
          <p style={{letterSpacing:'1px'}}><strong>Order Date:</strong></p>
          <p style={{letterSpacing:'1px'}}><strong>Delivery Date:</strong></p>
          <p style={{letterSpacing:'1px'}}><strong>Total Quantity:</strong></p>
          <br />
          <p style={{letterSpacing:'1px'}}><strong>Name:</strong></p>
          <p style={{letterSpacing:'1px'}}><strong>Mobile:</strong></p>
          <p style={{letterSpacing:'1px'}}><strong>Payment Method:</strong></p>
          <p style={{letterSpacing:'1px'}}><strong>Lense:</strong></p>
          {/* <p><strong>Glass:</strong></p> */}
         
        </div>
        <div style={{textAlign:"right", width:'50%'}}>
          {/* <p style={{fontWeight:'bold', fontSize:'10px'}}>{getCustomerInfo?.invoiceBarcode?.toString()?.slice(8)}</p> */}
          <p><strong></strong> {updateCustomerInfo ? getCustomerInfo?.createdAt?.slice(8,10)?.split('')?.join(' ') + ' '+'/'+ ' ' + getCustomerInfo?.createdAt?.slice(5,7)?.split('')?.join(' ')+' '+ '/' + ' ' + getCustomerInfo?.createdAt?.slice(0,4)?.split('')?.join(' ') :moment().format("DD/MM/YYYY")?.split("")?.join(" ") }</p>
          <p ><strong></strong> {getCustomerInfo?.deliveryDate ? getCustomerInfo?.deliveryDate?.slice(8)?.split("")?.join(" ")+' '+'/'+' ' + getCustomerInfo?.deliveryDate?.slice(5,7)?.split("")?.join(" ")+' '+
          '/'+' '+getCustomerInfo?.deliveryDate?.slice(0,4)?.split("")?.join(" ") : '--'}</p>
          <p ><strong></strong> {(getCustomerInfo?.totalQuantity === '0' || getCustomerInfo?.totalQuantity === undefined) ? calculateTotalPrice(salesList?.map(amount => Number(amount?.quantity))) : getCustomerInfo?.totalQuantity}</p>
          <br />
          <p >{getCustomerInfo?.customerName ? (getCustomerInfo?.customerName?.length > 18 ? getCustomerInfo?.customerName?.slice(0,18)+'..' : getCustomerInfo?.customerName) : 'blank'}</p>
          <p >{getCustomerInfo?.phoneNumber === 'blank' ? '--' : getCustomerInfo?.phoneNumber?.split('')?.join(' ')}</p>
          {/* <p >{getCustomerInfo?.glassType ? getCustomerInfo?.glassType : 'blank'}</p> */}
         <p>{getCustomerInfo?.paymentMethod === 'blank' ? '--': getCustomerInfo?.paymentMethod}</p>
        <p> {getCustomerInfo?.lense === 'blank' ? '--' :getCustomerInfo?.lense }</p>
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
                <th style={{ padding: '3px', fontSize:'10px', textAlign:'center', width:'55px'  }}>Near Add</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center' }}>R</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center',fontWeight:'bold'  }}>{getCustomerInfo?.rightSph === 'blank' ? '--' : (getCustomerInfo?.rightSph?.indexOf('-') === 0 ? getCustomerInfo?.rightSph : `+${getCustomerInfo?.rightSph}`)}</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.rightCyl === 'blank' ? '--' : (getCustomerInfo?.rightCyl?.indexOf('-') === 0 ? getCustomerInfo?.rightCyl : `+${getCustomerInfo?.rightCyl}`)}</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.rightAxis === 'blank' ? '--' : getCustomerInfo?.rightAxis}</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.rightNear === 'blank' ? '--' : `+${getCustomerInfo?.rightNear}` }</td>
              </tr>
              <tr>
                <td style={{ height:'20px', fontSize:'10px', textAlign:'center' }}>L</td>
                <td style={{ height:'20px', fontSize:'12px' , textAlign:'center', fontWeight:'bold' }}>{getCustomerInfo?.leftSph === 'blank' ? '--' : getCustomerInfo?.leftSph?.indexOf('-') === 0 ? getCustomerInfo?.leftSph : `+${getCustomerInfo?.leftSph}`}</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.leftCyl === 'blank' ? '--' : (getCustomerInfo?.leftCyl?.indexOf('-') === 0 ? getCustomerInfo?.leftCyl : `+${getCustomerInfo?.leftCyl}`)}</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.leftAxis === 'blank' ? '--' : getCustomerInfo?.leftAxis}</td>
                <td style={{ height:'20px', fontSize:'12px', textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.leftNear === 'blank' ? '--' : `+${getCustomerInfo?.leftNear}`}</td>
                
              </tr>
              
              
            </tbody>
          </table>
        </div>
      </div>

      {/* Instruction Section */}
      <div style={{ margin: '10px 0', fontSize:'9px' }}>
        <h3>PD: {getCustomerInfo?.comment?.split('=')?.[1] === undefined ? '--' : getCustomerInfo?.comment?.split('=')?.[1]}</h3>
        <h3>Remarks: {getCustomerInfo?.comment?.split('=')?.[0] === 'blank' ? '--' : getCustomerInfo?.comment?.split('=')?.[0]}</h3>
        <p style={{fontSize:'14px'}}>Glass Type: <span >{getCustomerInfo?.glassType === 'blank' ? '--' : getCustomerInfo?.glassType}</span></p>
      </div>

      {/* Total Section */}
      <div style={{ width: '100%',marginTop: '5px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
          <tbody>
            <tr>
              <td style={{ padding: '2px', fontWeight:'bold', fontSize:'11px', width:'70%'}}>TOTAL</td>
              <td style={{ padding: '2px', fontSize:'12px', textAlign:'center', fontWeight:'bold' }}>{calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'11px', fontWeight:'bold' }}>ADVANCE</td>
              <td style={{ padding: '2px', fontSize:'12px',  textAlign:'center', fontWeight:'bold'}}>{getCustomerInfo?.advance !== undefined ? getCustomerInfo?.advance : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'11px',  fontWeight:'bold' }}>DISCOUNT</td>
              <td style={{ padding: '2px', fontSize:'12px',  textAlign:'center', fontWeight:'bold'  }}>{getCustomerInfo?.discount !== undefined ? getCustomerInfo?.discount : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'11px', fontWeight:'bold' }}>DUE</td>
              <td style={{ padding: '2px',  textAlign:'center', fontSize:'12px' , fontWeight:'bold' }}>{(calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))) - (getCustomerInfo?.discount !== undefined ? Number(getCustomerInfo?.discount) : 0) - (getCustomerInfo?.advance !== undefined ? Number(getCustomerInfo?.advance) : 0)}  </td>
            </tr>
            
            
            
          </tbody>
        </table>

        <div style={{ width:"100%", display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'5px'}}>
            <Barcode  format="CODE128" fontSize={15} width={1.8} height={30} value={getCustomerInfo?.invoiceBarcode}/>   
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: '5px', textAlign: 'center', fontSize: '9px', fontwaight:'bold' }}>
        <p>বিঃদ্রঃ ডেলিভারি বিকাল ৫ টার পর। ১৫ দিনের মধ্যে ডেলিভারি না নিলে পরে হারানো গেলে অথবা পুরানো জিনিস মেরামতের সময় নষ্ট হলে কোম্পানি দায়ী থাকবে না।</p>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '10px', width:'100%', height:'30px', border:'1px solid black',  display:'flex', alignItems:'center', justifyContent:"space-between", padding: '0 5px' }}>
            <p>{copy}</p>
            <p>Any Complain: 01521-484359</p>
      </div>
    </div>
    );
};

export default InvoiceSlipForSaleV2;