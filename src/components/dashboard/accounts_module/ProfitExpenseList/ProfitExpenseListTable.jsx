/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import useGetProfitExpenseAccountsData from '../../../../data/accountsData/useGetProfitExpenseAccountsData';
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';

import CommonLoading from '../../../commonLoagin/CommonLoading';
 
const ProfitExpenseListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, hideField, monthYear}) => {


  const {profitExpenseData, refetch, isLoading: isLoadingProfitExpenseData} = useGetProfitExpenseAccountsData(monthYear)
  console.log(profitExpenseData?.result)

  useEffect(() => {
    refetch()
  },[monthYear, refetch])

  const allProfitExpenseData = profitExpenseData?.result;

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

  const totalExtraProfit = calculateTotalPrice(data?.map(extra => Number(extra?.extraProfitAmount)));

  const allFixedExpData = calculateTotalPrice(data?.flatMap( item => item?.expenses?.map(expense => Number(expense?.expenseAmount))));
  

if(isLoading){
    return <CommonLoading/>
}

    return (
        <div>
          <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Details</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Amount</th>
              </tr>
          </thead>
        <tbody>
          
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Profit</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{allProfitExpenseData?.totalProfit}</td>
          </tr>
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>(+) Extra Profit</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalExtraProfit}</td>
          </tr>
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left', fontWeight:'bold'}}>Gross Profit</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left', fontWeight:'bold'}}>{ !isLoadingProfitExpenseData && (Number(allProfitExpenseData?.totalProfit) + totalExtraProfit)}</td>
          </tr>
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left' }}>(-) Vendor Expense</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{allProfitExpenseData?.vendorExpenses}</td>
          </tr>
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left' }}>(-) Salary Expense</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{allProfitExpenseData?.salaryExpenses}</td>
          </tr>
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left', }}>(-) fixed Expenses</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
            {
              allFixedExpData
            }
          </td>
          </tr>
          <tr>
          <td style={{border:'1px solid #dddddd',textAlign:'left',fontWeight:'bold' }}>Net Profit</td>
          <td style={{border:'1px solid #dddddd',textAlign:'left', fontWeight:'bold'}}>
            { !isLoadingProfitExpenseData
              &&
              ((Number(allProfitExpenseData?.totalProfit) + totalExtraProfit) - Number(allProfitExpenseData?.vendorExpenses) - Number(allProfitExpenseData?.salaryExpenses) - allFixedExpData)
            }
          </td>
          </tr>
           
        </tbody>
          </table>
           <br />
          <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Extra Profit</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Expense</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Expense</th>
                  
                  <th style={{display: `${hideField ? 'none' : ''}`}}>Action</th>
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
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.extraProfitAmount}</td>
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
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>
                      {
                        calculateTotalPrice(data?.expenses?.map(total => Number(total?.expenseAmount) ))
                      }
                    </td>
                    
                     <td style={{display: `${hideField ? 'none' : ''}`}}  className={`flex_around`}>
                    
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
        </div>
    );
};

export default ProfitExpenseListTable;