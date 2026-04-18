/* eslint-disable react/prop-types */

import { calculateTotalPrice } from '../../../calculation/calculateSum';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import salesRecord from './Table.module.scss';


const SalesRecordTable = ({ paginatedDataContainer, isLoading, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesQuantity}) => {

    if(isLoading){
        return (
            <div className='flex_center' style={{width:'100%', height:'500px'}}>
                <CommonLoading/>
            </div>
        )
    }

    return (
        <div className={salesRecord.tableContainer}>
            {/* Top Summary Stats Cards */}
            <div className={salesRecord.summaryGrid}>
                <div className={salesRecord.statCard}>
                    <label>Total Sales</label>
                    <p>৳ {totalSalesValue}</p>
                </div>
                <div className={salesRecord.statCard}>
                    <label>Total Paid</label>
                    <p style={{marginBottom: "5px"}} className={salesRecord.textSuccess}>৳ {totalPaid}</p>
                </div>
                <div className={salesRecord.statCard}>
                    <label>Sold Qty</label>
                    <p>{totalSalesQuantity}</p>
                </div>
                <div className={salesRecord.statCard}>
                    <label>Method Summary</label>
                    <div className={salesRecord.miniStats}>
                        <span>Cash: {totalCashValue}</span>
                        <span>Bank: {totalBankValue}</span>
                        <span>Bkash: {totalBkashValue}</span>
                        <span>Nogod: {totalNogodValue}</span>
                    </div>
                </div>
            </div>

            <div className={salesRecord.table_responsive}>
                <table className={salesRecord.customTable}>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Customer Details</th>
                            <th>Date</th>
                            <th>Products & Pricing</th>
                            <th>Summary</th>
                            <th>Status</th>
                            <th>Reffered By</th>
                            <th>Sold By</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDataContainer?.map((sale, index) => {
                            const totalAmount = calculateTotalPrice(sale?.products?.map(item => item?.quantity * item?.actualSalesPrice));
                            const due = totalAmount - Number(sale?.advance) - Number(sale?.discount);
                            const hasMultiplePayments = sale?.paymentHistory?.split('+')?.length > 3;

                            return (
                                <tr key={index} className={hasMultiplePayments ? salesRecord.highAlertRow : ''}>
                                    <td><span className={salesRecord.sidBadge}>{sale?.sId}</span></td>
                                    <td>
                                        <div className={salesRecord.customerInfo}>
                                            <strong>{sale?.customerName}</strong>
                                            <span>{sale?.phoneNumber}</span>
                                        </div>
                                    </td>
                                    <td>{sale?.createdAt?.slice(0, 10)}</td>
                                    <td>
                                        <div className={salesRecord.productList}>
                                            {sale?.products?.map((item, i) => (
                                                <div key={i} className={salesRecord.productItem} title={`Barcode: ${item?.barcode}`}>
                                                    {item?.productName} ({item?.quantity} × {item?.actualSalesPrice})
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={salesRecord.priceSummary}>
                                            <div>Total: <strong>{totalAmount}</strong></div>
                                            <div className={salesRecord.textSuccess}>Paid: {sale?.advance}</div>
                                            <div className={salesRecord.textDanger}>Due: {due}</div>
                                            <div className={salesRecord.textWarning}>Discount: {sale?.discount}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={salesRecord.statusContainer}>
                                            <span className={`${salesRecord.badge} ${sale?.delivered === 'Delivered' ? salesRecord.bgSuccess : salesRecord.bgWarning}`}>
                                                {sale?.delivered}
                                            </span>
                                            <span className={salesRecord.methodBadge}>{sale?.paymentMethodHistory}</span>
                                            <span className={salesRecord.methodBadge}>{sale?.paymentHistory}</span>
                                        </div>
                                    </td>
                                    <td className={salesRecord.recorderName}>{sale?.referredBy}</td>
                                    <td className={salesRecord.recorderName}>{sale?.recorderName}</td>
                                    <td className={salesRecord.invoiceCell}>{sale?.invoiceBarcode}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className={salesRecord.footerRow}>
                            <td colSpan="4">Total Page Summary ({totalSalesItem} Items)</td>
                            <td>৳ {totalSalesValue}</td>
                            <td>Paid: {totalPaid}</td>
                            <td>Due: {totalSalesValue - totalDiscount - totalPaid}</td>
                            <td>Discount: {totalDiscount}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default SalesRecordTable;