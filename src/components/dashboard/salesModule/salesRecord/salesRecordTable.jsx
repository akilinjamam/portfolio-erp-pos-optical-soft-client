/* eslint-disable react/prop-types */
// import moment from 'moment-timezone';
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import CommonLoading from '../../../commonLoagin/CommonLoading';

/* {moment.utc(sale?.createdAt).tz("Asia/Dhaka").format("YYYY-MM-DD hh:mm:ss A")} */
const SalesRecordTable = ({ paginatedDataContainer, isLoading, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesQuantity}) => {
    
    console.log(paginatedDataContainer)

    if(isLoading){
        return (
        <div className='flex_center' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
        </div>
    )
    }

    return (
        <div >
            <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px', width:'99%', fontFamily: "'DM Sans', sans-serif"}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sales =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSalesValue}</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Cash =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalCashValue}</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bank =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalBankValue}</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bkash =</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalBkashValue}</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Nogod =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalNogodValue}</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sold Quantity =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSalesQuantity}</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                    </tr>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Customer Name</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Phone Number</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Date</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Reffered By</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Product(Quantity <i className='uil uil-times'></i> Price) = Total Price per Customer</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sales Price</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Paid</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Discount</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Due</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Delivery Status</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment Status</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sold By</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Invoice Number</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedDataContainer?.map((sale, index) => (
                        <tr style={{background: `${sale?.paymentHistory?.split('+')?.length > 3 ? 'red': ''}`, color: `${sale?.paymentHistory?.split('+')?.length > 3 ? 'white': ''}`}} key={index+1}>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.indexId ? sale?.indexId : index+1}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.customerName}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.phoneNumber}</td>
                            
                            <td style={{border:'1px solid #dddddd',textAlign:'left', width:'120px'}}>{sale?.createdAt?.slice(0, 10)}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.referredBy}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left', width:'250px'}}>
                                {sale?.products?.map((item, index) => <p title={ `Purchase Price: ${item?.purchasePrice}, Available Product: ${item?.remainingQuantity}, Barcode: ${item?.barcode}` } key={index+1}>{index+1}. {item?.productName} ({item?.quantity} <i className='uil uil-times'></i> {item?.actualSalesPrice}) = {item?.quantity * item?.actualSalesPrice} </p> )}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                {calculateTotalPrice(sale?.products?.map(item => item?.quantity * item?.actualSalesPrice))}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.paymentHistory} = {sale?.advance}</td>
                           
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.discount}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{calculateTotalPrice(sale?.products?.map(item => item?.quantity * item?.actualSalesPrice))- Number(sale?.advance) - Number(sale?.discount)}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.delivered}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.paymentMethod}{sale?.duePaymentMethod === 'blank' ? '' : `${sale?.paidTime > 1 ? `, ${sale?.duePaymentMethod}` : ''}`}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.recorderName}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.invoiceBarcode}</td>
                        </tr>
                    ))
                }
                
                <tr style={{fontWeight:'bold'}}>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sale Value({totalSalesItem})  :</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSalesValue}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalPaid}</td>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalDiscount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSalesValue -totalDiscount- totalPaid}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesRecordTable;