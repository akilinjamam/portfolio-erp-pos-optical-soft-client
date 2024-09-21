/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import useSalesRecord from './useSalesRecord';

const SalesRecordTable = ({contentToPrint}) => {

    const {saleData} = useSalesRecord()

    const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalSalesValue = calculateTotalPrice(total)

    
    return (
        <div ref={contentToPrint} style={{marginTop:'10px'}}>
            <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Customer Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Phone Number</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Address</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Product(Quantity <i className='uil uil-times'></i> Price) = Total Price per Customer</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total</th>
              </tr>
          </thead>
        <tbody>
          {
            saleData?.result?.map((sale, index) => (
                <tr key={index+1}>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{index+1}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.customerName}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.phoneNumber}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.address}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.createdAt?.slice(0,10)}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {sale?.products?.map((item, index) => <p key={index+1}>{index+1}. {item?.productName} ({item?.quantity} <i className='uil uil-times'></i> {item?.actualSalesPrice}) = {item?.quantity * item?.actualSalesPrice} </p> )}
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                        {calculateTotalPrice(sale?.products?.map(item => item?.quantity * item?.actualSalesPrice))}
                    </td>
                </tr>
            ))
          }
          <tr style={{fontWeight:'bold'}}>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sale Value :</td>
            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSalesValue}</td>
          </tr>
        </tbody>
            </table>
        </div>
    );
};

export default SalesRecordTable;