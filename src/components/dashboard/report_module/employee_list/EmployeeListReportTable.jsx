/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';


const EmployeeListReportTable = ({ paginatedDataContainer, isLoading}) => {

    if(isLoading){
        return (
        <div className='flex_center' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
        </div>
    )
    }

    return (
        <div>
            <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Employee Name</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Joinning Date</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', width:'200px'}}>Address</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Mobile</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>NID</th>
                        
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Employee Id</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Basic Salary</th>
                    
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedDataContainer?.map((employee, index) => (
                        <tr key={index+1}>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.indexId ? employee?.indexId : index+1}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.employeeName}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.joinningDate}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.address}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.mobile}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.nid}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.employeeId}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{employee?.basicSalary}</td>
                           
                        </tr>
                    ))
                }
                
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeListReportTable;