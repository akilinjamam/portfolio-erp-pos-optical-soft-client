import { calculateTotalPrice } from "../../../calculation/calculateSum";

/* eslint-disable react/prop-types */
const SalesInvoicTable = ({data}) => {

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
            </tr>
            }
            </tbody>
            </table>
        </div>
    );
};

export default SalesInvoicTable;