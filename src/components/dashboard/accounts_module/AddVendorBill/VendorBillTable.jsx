/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';
import  vendorbillinput  from './AddVendorBill.module.scss';

 
const VendorBillTable = ({paginatedDataContainer, isLoading}) => {


  const data = paginatedDataContainer;
 

if(isLoading){
    return <CommonLoading/>
}

    return (
     <div className={vendorbillinput.table_responsive}>
        <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px', fontFamily: "'DM Sans', sans-serif"}}>
          
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Supplier Info</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bill Amount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Bill Amount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Billing Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Billing No</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment Info</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment  & Id</th>
              
                 
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'left', display:'flex',justifyContent:'space-around'}}>
                     
                      <span>{data?.indexId}</span>
                    </td>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Name: {data?.supplierName?.supplierName}</p>
                      <p>Mobile: {data?.supplierName?.mobile}</p>
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.singleBillAmount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.billAmount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.billingDate}</td>
                    {/* <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.paymentDate}</td> */}
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.billNo}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Total Paid: {data?.totalPaid}</p>
                      <p>Paid: {data?.paid}</p>
                    </td>

                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Due: {data?.due}</p>
                      <p>Previous Due: {data?.prevDue}</p>
                    </td>

                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Payment Method: {data?.paymentMethod}</p>
                      <p>Id: {data?.transectionId}</p>
                    </td>           
                </tr>
              )
            } )
           }
           
        </tbody>
        </table>
     </div>
    );
};

export default VendorBillTable;