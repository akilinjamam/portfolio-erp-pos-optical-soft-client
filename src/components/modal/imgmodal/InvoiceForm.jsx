/* eslint-disable react/prop-types */
import moment from "moment";
import { calculateTotalPrice } from "../../calculation/calculateSum";

const InvoiceForm = ({getCustomerInfo, salesList, copy='Copy will be added'}) => {

    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '20px', fontFamily: '"DM Sans", sans-serif', fontSize:'12px',}}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        <div style={{display:'flex', width:'70%', margin:'auto'}}>
            <span style={{width:'100px', textAlign:'right', fontWeight:'bold', fontSize:'13px', padding:'0 4px'}}>New</span>
            <h2 style={{ margin: 'auto', position:'relative',textAlign:'left',width:"90%" }}> AL-ARAFAT OPTICAL</h2>
        </div>
        <p style={{ fontSize: '12px' }}>
        
          Minhaz Complex (Ground Floor), 12-Jamal Khan Road, Chittagong<br />
          Cell: 01841 631667, 01729 435335
        </p>
      </div>

      {/* Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>
          <p><strong>Order Date:</strong> {moment().format("YYYY-MM-DD")} </p>
          <p><strong>Name:</strong> {getCustomerInfo?.customerName}</p>
          <p><strong>Delivery Date:</strong> {getCustomerInfo?.deliveryDate}</p>
        </div>
        <div>
          <p><strong>Invoice serial:</strong> 000001</p>
          <p><strong>Mobile:</strong> {getCustomerInfo?.phoneNumber}</p>
          <p ><strong>Address:</strong> {getCustomerInfo?.address}</p>
        </div>
      </div>

      {/* Product Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }} border="1">
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Product</th>
            <th style={{ padding: '10px' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
            salesList?.slice(0,5)?.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{paddingLeft:'5px'}}>{item?.productName}</td>
                  <td style={{paddingLeft:'5px'}}>{item?.quantity}</td>
              </tr>
              )
            })
          }
          {
            salesList?.length > 5
                && 
                <tr>
                  <td style={{paddingLeft:'5px', fontWeight:'bold'}}>others</td>
                  <td style={{paddingLeft:'5px'}}></td>
              </tr>
              
            }
          
        </tbody>
      </table>

      {/* Eye Prescription Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Left Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '10px' }}>Sph.</th>
                <th style={{ padding: '10px' }}>Cyl.</th>
                <th style={{ padding: '10px' }}>Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>{getCustomerInfo?.leftSph}</td>
                <td style={{ padding: '10px' }}>{getCustomerInfo?.leftCyl}</td>
                <td style={{ padding: '10px' }}>{getCustomerInfo?.leftAxis}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: '10px' }}><strong>Near Add:</strong> {getCustomerInfo?.leftNear}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Right Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '10px', }}>Sph.</th>
                <th style={{ padding: '10px' }}>Cyl.</th>
                <th style={{ padding: '10px' }}>Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td style={{ padding: '10px' }}>{getCustomerInfo?.rightSph}</td>
                <td style={{ padding: '10px' }}>{getCustomerInfo?.rightCyl}</td>
                <td style={{ padding: '10px' }}>{getCustomerInfo?.rightAxis}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: '10px' }}><strong>Near Add:</strong> {getCustomerInfo?.rightNear}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Instruction Section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Instruction</h3>
        <div style={{ border: '1px solid #000', padding: '10px', height: '100px' }}>{getCustomerInfo?.comment}</div>
      </div>

      {/* Total Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <table style={{ width: '30%', borderCollapse: 'collapse' }} border="1">
          <tbody>
            <tr>
              <td style={{ padding: '10px', fontWeight:'bold'}}>SUBTOTAL</td>
              <td style={{ padding: '10px' }}>{calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px',  fontWeight:'bold' }}>DISCOUNT</td>
              <td style={{ padding: '10px' }}>{getCustomerInfo?.discount !== undefined ? getCustomerInfo?.discount : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight:'bold' }}>PAID</td>
              <td style={{ padding: '10px' }}>{getCustomerInfo?.advance !== undefined ? getCustomerInfo?.advance : 0}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight:'bold' }}>TOTAL PAYABLE</td>
              <td style={{ padding: '10px' }}>{(calculateTotalPrice(salesList?.map(amount => Number(amount?.actualSalesPrice) * amount?.quantity))) - (getCustomerInfo?.discount !== undefined ? Number(getCustomerInfo?.discount) : 0) - (getCustomerInfo?.advance !== undefined ? Number(getCustomerInfo?.advance) : 0)}  </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '10px' }}>
        <p>বিঃদ্রঃ ডেলিভারি বিকাল ৫ টার পর। ১৫ দিনের মধ্যে ডেলিভারি না নিলে পরে হারানো গেলে অথবা পুরানো জিনিস মেরামতের সময় নষ্ট হলে কোম্পানি দায়ী থাকবে না।</p>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '12px', width:'100%', height:'30px', backgroundColor:'black', display:'flex', alignItems:'center', justifyContent:"space-between",color:'white', padding: '0 5px' }}>
            <p>{copy}</p>
            <p>Any Complain: 01521-484359</p>
      </div>
    </div>
    );
};

export default InvoiceForm;