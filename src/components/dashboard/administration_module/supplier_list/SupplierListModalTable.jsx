/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'

const SupplierListModalTable = ({paginatedDataContainer}) => {

  const data = paginatedDataContainer
  
    return (
        <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px', width:'98%'}}>
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Supplier Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Address</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Mobile</th>
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}>
                      <span>{index+1}</span>
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>
                    <div style={{maxWidth:"100px"}}>
                    {data?.supplierName} 
                    </div>  
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.address}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.mobile}</td>
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default SupplierListModalTable;