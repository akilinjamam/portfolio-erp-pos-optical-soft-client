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
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Supplier Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Mobile</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Bill Amount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Bill Amount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Billing Date</th>
                  {/* <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Payment Date</th> */}
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Billing No</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Paid</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Paid</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Previous Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Payment Method</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Transection Id</th>
                 
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}>
                     
                      <span>{data?.indexId}</span>
                    </td>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.supplierName?.supplierName}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.supplierName?.mobile}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.singleBillAmount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.billAmount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.billingDate}</td>
                    {/* <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.paymentDate}</td> */}
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.billNo}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.totalPaid}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.paid}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.prevDue}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.due}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.paymentMethod}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.transectionId}</td>            
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