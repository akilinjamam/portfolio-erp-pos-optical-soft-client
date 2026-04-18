import { calculateTotalPrice } from "../../../calculation/calculateSum";
import styles from './SalesInvoice.module.scss';

/* eslint-disable react/prop-types */
const SalesInvoiceTable = ({ data }) => {
  if (!data) return null;

<<<<<<< HEAD
    return (
        <div>
            <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
            <thead>
                <tr>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Customer Name</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Phone Number</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Address</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Date</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Reffered By</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Product(Quantity <i className='uil uil-times'></i> Price)=Total Price per Customer</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Paid</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment History</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Due</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Discount</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Delivery Status</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment Status</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sold By</th>
                </tr>
            </thead>
            <tbody>
            { data
                &&
                <tr>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left',}}>1</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.customerName}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.phoneNumber}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.address}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.createdAt?.slice(0,10)}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.referredBy}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {data?.products?.map((item, index) => <p key={index+1}>{index+1}. {item?.productName} ({item?.quantity} <i className='uil uil-times'></i> {item?.actualSalesPrice}) = {item?.quantity * item?.actualSalesPrice} </p> )}
                    </td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {calculateTotalPrice(data?.products?.map(item => item?.quantity * item?.actualSalesPrice))}
                    </td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.advance}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.paymentHistory}</td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {calculateTotalPrice(data?.products?.map(item => item?.quantity * item?.actualSalesPrice))- Number(data?.advance) - Number(data?.discount)}
                    </td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {data?.discount}
                    </td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {data?.delivered}
                    </td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {data?.paymentMethod} {data?.paymentHistory?.split('+')?.length > 2 && `, ${data?.duePaymentMethod}`}
                    </td>
                    <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {data?.recorderName}
                    </td>
=======
  const totalAmount = calculateTotalPrice(data?.products?.map(item => item?.quantity * item?.actualSalesPrice)) || 0;
  const dueAmount = totalAmount - Number(data?.advance || 0) - Number(data?.discount || 0);

  return (
    <div className={styles.invoiceTable}>
      <div className={styles.tableContainer}>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>SL</th>
              <th>Customer & Address</th>
              <th>Date / Ref</th>
              <th>Product Details</th>
              <th>Financials</th>
              <th>Due</th>
              <th>Status</th>
              <th>Sold By</th>
>>>>>>> 6e89803c5ca54e1608b805da9612bd183fde2089
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="SL">1</td>
              <td data-label="Customer">
                <div className={styles.primaryText}>{data?.customerName}</div>
                <div className={styles.secondaryText}>{data?.phoneNumber}</div>
                <div className={styles.subText}>{data?.address}</div>
              </td>
              <td data-label="Date">
                <div>{data?.createdAt?.slice(0, 10)}</div>
                <div className={styles.tag}>By: {data?.referredBy || 'Direct'}</div>
              </td>
              <td data-label="Products">
                <div className={styles.productScroll}>
                  {data?.products?.map((item, index) => (
                    <div key={index} className={styles.productItem}>
                      <span>{item?.productName}</span>
                      <span>({item?.quantity} × {item?.actualSalesPrice})</span>
                    </div>
                  ))}
                </div>
              </td>
              <td data-label="Financials">
                <div className={styles.priceRow}><span>Total:</span> <b>{totalAmount}</b></div>
                <div className={styles.priceRow}><span>Paid:</span> {data?.advance}</div>
                <div className={styles.priceRow}><span>Disc:</span> {data?.discount}</div>
              </td>
              <td data-label="Due">
                <span className={dueAmount > 0 ? styles.dueCritical : styles.dueClear}>
                  {dueAmount}
                </span>
              </td>
              <td data-label="Status">
                <span className={styles.statusBadge}>{data?.delivered}</span>
                <div className={styles.subText}>{data?.paymentMethod}</div>
              </td>
              <td data-label="Recorder">
                {data?.recorderName}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesInvoiceTable;