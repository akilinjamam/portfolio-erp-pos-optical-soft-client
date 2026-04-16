/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';
import payrollListTable from './PayrollList.module.scss';
 
const PayrollListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, paidAmount, totalPaid, totalIncentive, totalOvertime, hideField, fontsize}) => {

 

  const data = paginatedDataContainer
  
  const handleDelete = (id, e) => {
    
    setSelectDeleted(true)
      if(e.target.checked){
        setIdsForDelete((prevId) => [...prevId, id] )
      }else{
        const deleteId =idsForDelete?.filter(f => f !== id)
        setIdsForDelete(deleteId)
      }
    }

  const handleAllDelete = () => {
    const allIds = showData?.map(all => all?._id)
    if(idsForDelete?.length === showData?.length){
     setIdsForDelete([])
    }else{
      setIdsForDelete(allIds)
    }
  }

if(isLoading){
    return <CommonLoading/>
}

    return (
     <div className={payrollListTable.table_responsive} >
       <table style={{borderCollapse:'collapse', fontSize:fontsize, margin:'auto', paddingBottom:'10px', width:'99%',  fontFamily: "'DM Sans', sans-serif"}}>
          
          <thead>
            <tr>
              <th></th>
              <th>Total Paid =</th>
              <th>{totalPaid}</th>
              <th>Paid =</th>
              <th>{paidAmount}</th>
              <th>Total Overtime=</th>
              <th>{totalOvertime}</th>
              <th>Total Incentive = {totalIncentive}</th>
              {!hideField && <th></th>}
            </tr>
            <tr>
              <th>SL</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Salary</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Advance</th>
              <th>Others</th>
              {!hideField && <th>Action</th>}
            </tr>
            
        </thead>
        <tbody>
          {data?.map((item) => {
            

            return (
              <tr
                key={item?._id}
                className={`${item?._id === edit ? payrollListTable.activeRow : ""}`}
              >
                <td>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    {selectDeleted && (
                    <input
                      type="checkbox"
                      checked={idsForDelete?.includes(item?._id)}
                      onChange={(e) => handleDelete(item?._id, e)}
                      onDoubleClick={() => handleAllDelete()}
                    />
                  )}
                  <p style={{marginLeft: '5px'}}>{item?.indexId}</p>
                  </div>
                </td>

                <td>
                  <div className={payrollListTable.employee}>
                    {item?.employeeName?.employeeName}
                    <small>ID: {item?.indexId}</small>
                    <small>payment Method: {item?.paymentMethod}</small>
                  </div>
                </td>

                <td>{item?.date}</td>

                <td>
                  <p>Basic: {item?.employeeName?.basicSalary}</p>
                  <p>Net: {item?.netSalary}</p>
                  <p>Total: {item?.totalSalary}</p>
                </td>
                <td className={payrollListTable.paid}>
                  <p>Current Paid: {item?.paid}</p>
                  <p>Total Paid: {item?.totalPaid}</p>
                </td>

                <td className={item?.due > 0 ? payrollListTable.due : payrollListTable.clear}>
                  <p>Current Due: {item?.due}</p>
                  <p>Previous Due: {item?.prevDue}</p>
                </td>
                <td >
                  <p>Current Advance: {item?.advance}</p>
                  <p>Previous Advance: {item?.prevAdvance}</p>
                </td>
                <td >
                  <p>Over Time: {item?.overtime}</p>
                  <p>:Incentive {item?.incentive}</p>
                </td>

                {!hideField && (
                  <td className={payrollListTable.actions}>
                    <i
                      onClick={() => {
                        setSelectDeleted(!selectDeleted);
                        setEdit("");
                        if (selectDeleted) setIdsForDelete([]);
                      }}
                      className="uil uil-trash-alt"
                    />

                    <i
                      onClick={() => {
                        setEdit(item?._id);
                        setSelectDeleted(false);
                        setIdsForDelete([]);
                      }}
                      className="uil uil-edit"
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
     </div>
    );
};

export default PayrollListTable;