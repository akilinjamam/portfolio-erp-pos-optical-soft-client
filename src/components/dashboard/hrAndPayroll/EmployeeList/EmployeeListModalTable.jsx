/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'

const EmployeeListModalTable = ({paginatedDataContainer}) => {

  const data = paginatedDataContainer
  
    return (
        <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px', width:'99%',  fontFamily: "'DM Sans', sans-serif"}}>
          
          <thead>
          
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Employee Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Joining Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Address</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Mobile</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>NID</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Employee Id</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Basic Salary</th>
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
                    {data?.employeeName} 
                    </div>  
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.joiningDate}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.address}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.mobile}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.nid}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.employeeId}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.basicSalary}</td>
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default EmployeeListModalTable;