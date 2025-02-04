/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'

import CommonLoading from '../../../commonLoagin/CommonLoading';
 
const ProfitExpenseListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete}) => {

  const data = paginatedDataContainer
  
  console.log(data)
  
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
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Profit</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Extra Profit</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Expense</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Payroll Expense</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Vendor Expense</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Expense</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Profit Allocation</th>
                 
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
                    {Number(data?.totalProfit) + data?.vendorExpenses + data?.payrollExpenses} 
                    </div>  
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.extraProfit}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.date}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>
                      {
                        data?.expenses?.map((expense, index) => (
                          <div style={{textAlign:'left'}} key={index+1}>
                              <p>{expense?.expenseName} = {expense?.expenseAmount}</p>
                          </div>
                        ))
                      }
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.payrollExpenses}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.vendorExpenses}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.totalExpense}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.profitAllocation}</td>
                    
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

export default ProfitExpenseListTable;