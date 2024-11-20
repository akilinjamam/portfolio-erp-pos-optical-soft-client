/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';
 
const PayrollListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete}) => {


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
        <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          
          <thead>
          
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Employee Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Basic Salary</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Net Salary</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Paid</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Paid</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Previous Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Previous Advance</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Advance</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Overtime</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Incentive</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Payment Method</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Transection Id</th>
                  <th>Action</th>
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr style={{background: `${(data?._id === edit ? 'lightgray' : '') || (idsForDelete?.find(f => f === data?._id) ? 'rgb(245, 177, 177)' : '')}`}} key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}>
                      {(selectDeleted) ? <input checked={idsForDelete?.find(f => f === data?._id)} onDoubleClick={handleAllDelete} onClick={(e) =>handleDelete(data?._id, e)} type="checkbox" name="" id="" />: '' }
                      <span>{data?.indexId}</span>
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>
                    <div style={{maxWidth:"100px"}}>
                    {data?.employeeName?.employeeName} 
                    </div>  
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.employeeName?.basicSalary}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.date}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.netSalary}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.paid}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.totalPaid}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.prevDue}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.due}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.prevAdvance}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.advance}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.overtime}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.incentive}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.paymentMethod}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.transectionId}</td>
                    
                     <td  className={`flex_around`}>
                    
                        <i onClick={() => {
                          setSelectDeleted(!selectDeleted)
                          setEdit('')
                          if(selectDeleted){
                            setIdsForDelete([])
                          }
                        }}  style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> 


                      <i onClick={() => {
                        setEdit(data?._id)
                        setSelectDeleted(false)
                        setIdsForDelete([])
                      }} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i>
                  </td>
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default PayrollListTable;