/* eslint-disable react/prop-types */
import moment from "moment";
import { calculateTotalPrice } from "../../calculation/calculateSum";
import useSalesRecord from "../../dashboard/salesModule/salesRecord/useSalesRecord";
import Barcode from "react-barcode";
import { invoiceCalculation } from "../../../invoiceCalculation/invoiceCalculation";
import { useEffect } from "react";

const InvoiceForm = ({getCustomerInfo, salesList, copy='Copy will be added'}) => {

    const {saleData, refetch} = useSalesRecord();

    useEffect(() => {
      refetch()
    },[refetch])

    const invoiceNumber = invoiceCalculation(saleData)
    const totalPriceArray = salesList?.map(item => (Number(item?.actualSalesPrice) * Number(item?.quantity)))
    const totalPriceValue = calculateTotalPrice(totalPriceArray)
  
    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '10px', fontFamily: '"DM Sans", sans-serif', fontSize:'10px'}}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        <div style={{display:'flex', width:'50%', margin:'auto'}}>
            <span style={{width:'100px', textAlign:'right', fontWeight:'bold', fontSize:'13px', padding:'0 4px'}}>New</span>
            <h2 style={{ margin: 'auto', position:'relative',textAlign:'left',width:"90%" }}> AL-ARAFAT OPTICAL</h2>
        </div>
        <p style={{ fontSize: '12px' }}>
        
          Minhaz Complex (Ground Floor), 12-Jamal Khan Road, Chittagong<br />
          Cell: 01841 631667, 01729 435335
        </p>
      </div>

      {/* Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <div>
          <p><strong>Sold By:</strong> {getCustomerInfo?.recorderName}</p>
          <p><strong>Order Date:</strong> {moment().format("YYYY-MM-DD")} </p>
          <p><strong>Name:</strong> {getCustomerInfo?.customerName}</p>
          <p><strong>Delivery Date:</strong> {getCustomerInfo?.deliveryDate}</p>
          <p><strong>Delivery Status:</strong> {getCustomerInfo?.delivered}</p>
         
          <p><strong>Lense:</strong> {getCustomerInfo?.lense}</p>
          <p><strong>Glass Types:</strong> {getCustomerInfo?.glassType}</p>
        </div>
        <div>
          <p><strong>Invoice serial:</strong> {getCustomerInfo?.invoiceBarcode ? getCustomerInfo?.invoiceBarcode?.slice(8) : invoiceNumber}</p>
          <p><strong>Mobile:</strong> {getCustomerInfo?.phoneNumber}</p>
          <p ><strong>Address:</strong> {getCustomerInfo?.address}</p>
          <p ><strong>Payment Method:</strong> {getCustomerInfo?.paymentMethod}</p>
          <p ><strong>Payment Staus:</strong> {(totalPriceValue === (Number(getCustomerInfo?.advance) + Number(getCustomerInfo?.discount))) ? 'Paid' : 'Not-Paid'}</p>
        </div>
      </div>

    
      {/* Eye Prescription Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '2px', textAlign: 'center', fontSize:'10px' }}>Left Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '2px', fontSize:'10px' }}>Sph.</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Cyl.</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{  height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftSph}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftCyl}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.leftAxis}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: '2px', fontSize:'10px' }}><strong>Near Add:</strong> {getCustomerInfo?.leftNear}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '2px', textAlign: 'center', fontSize:'10px' }}>Right Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '2px', fontSize:'10px' }}>Sph.</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Cyl.</th>
                <th style={{ padding: '2px', fontSize:'10px' }}>Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightSph}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightCyl}</td>
                <td style={{ height:'20px', fontSize:'10px' }}>{getCustomerInfo?.rightAxis}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: '2px', fontSize:'10px' }}><strong>Near Add:</strong> {getCustomerInfo?.rightNear}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Instruction Section */}
      <div style={{ marginTop: '5px' }}>
        <h3>Instruction</h3>
        <div style={{ border: '1px solid #000', padding: '10px', height: '50px' }}>{getCustomerInfo?.comment}</div>
      </div>

      {/* Total Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <table style={{ width: '35%', borderCollapse: 'collapse' }} border="1">
          <tbody>
            <tr>
              <td style={{ padding: '2px', fontWeight:'bold', fontSize:'10px'}}>SUBTOTAL</td>
              <td style={{ padding: '2px', fontSize:'10px' }}>{calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'10px',  fontWeight:'bold' }}>DISCOUNT</td>
              <td style={{ padding: '2px', fontSize:'10px' }}>{getCustomerInfo?.discount !== undefined ? getCustomerInfo?.discount : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'10px', fontWeight:'bold' }}>PAID</td>
              <td style={{ padding: '2px', fontSize:'10px' }}>{getCustomerInfo?.advance !== undefined ? getCustomerInfo?.advance : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '2px', fontSize:'10px', fontWeight:'bold' }}>TOTAL PAYABLE</td>
              <td style={{ padding: '2px' }}>{(calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))) - (getCustomerInfo?.discount !== undefined ? Number(getCustomerInfo?.discount) : 0) - (getCustomerInfo?.advance !== undefined ? Number(getCustomerInfo?.advance) : 0)}  </td>
            </tr>
          </tbody>
        </table>

        <div style={{width:'280px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Barcode format="CODE128" fontSize={15} width={1.2} height={30} value={getCustomerInfo?.invoiceBarcode ? getCustomerInfo?.invoiceBarcode : `${moment().format("YYYYMMDD")}${invoiceNumber}`}/>
            {/* <p>{`${moment().format("YYYYMMDD")}${invoiceNumber}`}</p> */}
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '10px' }}>
        <p>বিঃদ্রঃ ডেলিভারি বিকাল ৫ টার পর। ১৫ দিনের মধ্যে ডেলিভারি না নিলে পরে হারানো গেলে অথবা পুরানো জিনিস মেরামতের সময় নষ্ট হলে কোম্পানি দায়ী থাকবে না।</p>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '10px', width:'100%', height:'30px', backgroundColor:'black', display:'flex', alignItems:'center', justifyContent:"space-between",color:'white', padding: '0 5px' }}>
            <p>{copy}</p>
            <p>Any Complain: 01521-484359</p>
      </div>
    </div>
    );
};

export default InvoiceForm;