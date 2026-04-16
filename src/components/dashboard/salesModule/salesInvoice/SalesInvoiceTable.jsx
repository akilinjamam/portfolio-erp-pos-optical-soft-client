import { calculateTotalPrice } from "../../../calculation/calculateSum";
import styles from './SalesInvoice.module.scss';

/* eslint-disable react/prop-types */
const SalesInvoiceTable = ({ data }) => {
  if (!data) return null;

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