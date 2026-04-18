/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import dailycashexp from './DailyCashExpensesList.module.scss';


const DailyCashExpenseTable = ({ paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted, selectDeleted, idsForDelete, setIdsForDelete, hideField, hideSection }) => {


  const data = paginatedDataContainer

  const handleDelete = (id, e) => {

    setSelectDeleted(true)
    if (e.target.checked) {
      setIdsForDelete((prevId) => [...prevId, id])
    } else {
      const deleteId = idsForDelete?.filter(f => f !== id)
      setIdsForDelete(deleteId)
    }
  }

  const handleAllDelete = () => {
    const allIds = showData?.map(all => all?._id)
    if (idsForDelete?.length === showData?.length) {
      setIdsForDelete([])
    } else {
      setIdsForDelete(allIds)
    }
  }

  const everyExpenses = data?.flatMap(expense => expense?.expenses?.map(everyExp => Number(everyExp?.expenseAmount)));
  const calculateAllExpenses = calculateTotalPrice(everyExpenses)


  const saleAmount = data?.map(sale => Number(sale?.salesAmount));
  const calculatetSales = calculateTotalPrice(saleAmount)
  const totalBankAmount = calculateTotalPrice(data?.map(bank => bank?.todayBankValue))
  const totalBkashAmount = calculateTotalPrice(data?.map(bank => bank?.todayBkashValue))
  const totalNogodAmount = calculateTotalPrice(data?.map(bank => bank?.todayNogodValue))


  const totalProfitAmount = data?.map(sale => Number(sale?.profitAllocation));
  const calculatetotalProfit = calculateTotalPrice(totalProfitAmount)


  console.log(isLoading)


  if (isLoading) {
    return <CommonLoading />
  }

  return (
    <div className={dailycashexp.table_responsive}>
      <table style={{ borderCollapse: 'collapse', fontSize: '11.5px', margin: 'auto', paddingBottom: '10px',  fontFamily: "'DM Sans', sans-serif" }}>

      <thead>

        <tr>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>SL</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Cash Sales Amount</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Starting Cash Reserved</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Total Sales Amount</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Date</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Expenses</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Total Expenses</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Ending Cash Reserved</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Deficit</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Cash & Profit</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Payment Type</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'left' }}>total</th>
          <th style={{display: `${hideField ? 'none' : ''}`}}>Action</th>
        </tr>
      </thead>
      <tbody>

        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}></td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Total = {calculatetSales}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}></td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}></td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}></td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}></td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Total Expenses = {calculateAllExpenses}</td>
      
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}></td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>Total Profit = {calculatetotalProfit}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{totalBankAmount}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{totalBkashAmount}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{totalNogodAmount}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{totalBankAmount + totalBkashAmount + totalNogodAmount + calculatetotalProfit}</td>
       

        {
          data?.map((data, index) => {
            return (
              <tr style={{ background: `${(data?._id === edit ? 'lightgray' : '') || (idsForDelete?.find(f => f === data?._id) ? 'rgb(245, 177, 177)' : '')}` }} key={index + 1} >
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', display: 'flex', justifyContent: 'space-around' }}>
                  {(selectDeleted) ? <input checked={idsForDelete?.find(f => f === data?._id)} onDoubleClick={handleAllDelete} onClick={(e) => handleDelete(data?._id, e)} type="checkbox" name="" id="" /> : ''}
                  <span>{data?.indexId}</span>
                </td>

                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>
                  <p>Cash: {data?.salesAmount}</p>
                  <p>Due: {data?.dueSalesAmount}</p>
                </td>
                {/* <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.dueSalesAmount}</td> */}
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.startingCashReserved}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.totalSalesAmount}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.date}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', paddingLeft: '5px' }}>
                  {
                    data?.expenses?.map((expense, index) => <p key={index + 1}>{index + 1}. {expense?.expenseName} = {expense?.expenseAmount} </p>)
                  }
                </td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', paddingLeft: '5px' }}>
                  {
                    calculateTotalPrice(data?.expenses?.map((expense) => Number(expense?.expenseAmount)))
                  }
                </td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.endingCashReserved}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.deficit}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>
                  <p>Cash Over: {data?.cashOver}</p>
                  <p>Profit Allocation: {data?.profitAllocation}</p>
                </td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>
                  <p>Total Bank: {data?.todayBankValue}</p>
                  <p>Total Bkash: {data?.todayBkashValue}</p>
                  <p>Total Nogod: {data?.todayNogodValue}</p>
                </td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.todayNogodValue + data?.todayBkashValue + data?.todayBankValue + Number(data?.profitAllocation)}</td>
                <td style={{display: `${hideSection ? 'none' : ''}`}} className={`flex_around`}>

                  <i onClick={() => {
                    setSelectDeleted(!selectDeleted)
                    setEdit('')
                    if (selectDeleted) {
                      setIdsForDelete([])
                    }
                  }} style={{ cursor: 'pointer' }} className="uil uil-trash-alt btnColor_red_font"></i>


                  <i onClick={() => {
                    setEdit(data?._id)
                    setSelectDeleted(false)
                    setIdsForDelete([])
                  }} style={{ cursor: 'pointer' }} className="uil uil-edit btnColor_green_font"></i>
                </td>
              </tr>
            )
          })
        }



      </tbody>
      </table>
    </div>
  );
};

export default DailyCashExpenseTable;