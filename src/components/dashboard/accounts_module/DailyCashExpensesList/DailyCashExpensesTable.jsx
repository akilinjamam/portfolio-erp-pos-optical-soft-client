/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import CommonLoading from '../../../commonLoagin/CommonLoading';

const VendorListTable = ({ paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted, selectDeleted, idsForDelete, setIdsForDelete, hideField, hideSection }) => {


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


  const totalSaleAmount = data?.map(sale => Number(sale?.totalSalesAmount));
  const calculatetotalSales = calculateTotalPrice(totalSaleAmount)

  const totalProfitAmount = data?.map(sale => Number(sale?.profitAllocation));
  const calculatetotalProfit = calculateTotalPrice(totalProfitAmount)


  console.log(calculatetotalSales)


  if (isLoading) {
    return <CommonLoading />
  }

  return (
    <table style={{ borderCollapse: 'collapse', fontSize: '13.5px', margin: 'auto', paddingBottom: '10px' }}>

      <thead>

        <tr>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>SL</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Sales Amount</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Due Sales Amount</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Starting Cash Reserved</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Total Sales Amount</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Date</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Expenses</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Total Expenses</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Ending Cash Reserved</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Deficit</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Cash Over</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Profit Allocation</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Bank</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Bkash</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>Nogod</th>
          <th style={{ border: '1px solid #dddddd', textAlign: 'center' }}>total</th>
          <th style={{display: `${hideField ? 'none' : ''}`}}>Action</th>
        </tr>
      </thead>
      <tbody>

        <td></td>
        <td>Total = {calculatetSales}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Total Expenses = {calculateAllExpenses}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>Total Profit = {calculatetotalProfit}</td>
        <td>{totalBankAmount}</td>
        <td>{totalBkashAmount}</td>
        <td>{totalNogodAmount}</td>
        <td>{totalBankAmount + totalBkashAmount + totalNogodAmount + calculatetotalProfit}</td>
        <td></td>

        {
          data?.map((data, index) => {
            return (
              <tr style={{ background: `${(data?._id === edit ? 'lightgray' : '') || (idsForDelete?.find(f => f === data?._id) ? 'rgb(245, 177, 177)' : '')}` }} key={index + 1} >
                <td style={{ border: '1px solid #dddddd', textAlign: 'center', display: 'flex', justifyContent: 'space-around' }}>
                  {(selectDeleted) ? <input checked={idsForDelete?.find(f => f === data?._id)} onDoubleClick={handleAllDelete} onClick={(e) => handleDelete(data?._id, e)} type="checkbox" name="" id="" /> : ''}
                  <span>{data?.indexId}</span>
                </td>

                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.salesAmount}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.dueSalesAmount}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.startingCashReserved}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.totalSalesAmount}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.date}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', paddingLeft: '5px' }}>
                  {
                    data?.expenses?.map((expense, index) => <p key={index + 1}>{index + 1}. {expense?.expenseName} = {expense?.expenseAmount} </p>)
                  }
                </td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center', paddingLeft: '5px' }}>
                  {
                    calculateTotalPrice(data?.expenses?.map((expense) => Number(expense?.expenseAmount)))
                  }
                </td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.endingCashReserved}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.deficit}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.cashOver}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.profitAllocation}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.todayBankValue}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.todayBkashValue}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.todayNogodValue}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'center' }}>{data?.todayNogodValue + data?.todayBkashValue + data?.todayBankValue + Number(data?.profitAllocation)}</td>
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
  );
};

export default VendorListTable;