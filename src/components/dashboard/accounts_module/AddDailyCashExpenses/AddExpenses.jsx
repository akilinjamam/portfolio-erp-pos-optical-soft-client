import '../../../../global_style/global_style.css'
import Pagination from '../../pagination/Pagination';
import addExpenses from './AddExpenses.module.scss';
import { addExpensesInput, addOnterExpensesInput } from './AddExpensesInput';
import useAddExpenses from './useAddExpenses';
import AddExpensesTable from './AddExpensesTable';
import { calculateTotalPrice } from '../../../calculation/calculateSum';

const AddExpenses = () => {
  const {otherExpensesData, setOtherExpensesData ,expensesData, setExpensesData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialExpensesData, initialOtherExpensesData, setImgHolder, handlePost, lastSaleAndAccountsData, dueSales, setInInput, isPending} = useAddExpenses();

  const totalExpenses = showData?.map(expense => Number(expense?.expenseAmount));
  const calculationOfTotalExpense = calculateTotalPrice(totalExpenses);

  const conditionalTotalSales = Number(otherExpensesData?.startingCashReserved) > 0 ? (Number(otherExpensesData?.startingCashReserved) + Number(lastSaleAndAccountsData?.result?.totalSales)) : lastSaleAndAccountsData?.result?.total


    return (
        <div className={`${addExpenses.main} full_width`}>
          <div style={{flexWrap: "wrap"}}  className={`flex_around`}>
            <div className={`${addExpenses.inputAreaOne} flex_center`}>
              <div className={`${addExpenses.container} `}>
                    <div className={`${addExpenses.titleName}`}>{edit ? 'Update Expenses' : 'Add Expenses'}</div>
                    <div style={{width: `${edit ? '135px' : '120px'}`}}  className={`${addExpenses.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'69%'}}>
                            {
                              addExpensesInput?.map((input, index) => {
                                return (
                                <div key={index+1} className={`${addExpenses.inputFields} flex_between`}>
                                <label htmlFor="">{input.placeholder}:</label>
                                <input
                                placeholder={input.placeholder}
                                onMouseOver={() => {
                                  if(input.name === 'expenseName'){
                                    setInInput(true)
                                  }
                                }}
                                onMouseLeave={() => {
                                  if(input.name === 'expenseName'){
                                    setInInput(false)
                                  }
                                }}
                                
                                value={expensesData[input.name]}   type={input.type} 
                                    onChange={(e) => {setExpensesData({...expensesData, [input.value]: e.target.value})}}
                                    required
                                />
                                </div>
                                )
                              })
                            }
                            <br />
                            <hr />
                            <br />
                            {
                              addOnterExpensesInput?.map((input, index) => {
                                return (
                                <div key={index+1} className={`${addExpenses.inputFields} flex_between`}>
                                <label htmlFor="">{input.placeholder}:</label>
                                <input  placeholder={input.placeholder} value={otherExpensesData[input.name]}   type={input.type} 
                                    onChange={(e) => {setOtherExpensesData({...otherExpensesData, [input.value]: e.target.value})}}
                                    
                                />
                                </div>
                                )
                              })
                            }
                            <div className={`${addExpenses.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addExpenses.inputAreaOne_footer} flex_right`}>
                              <div className={`${addExpenses.inputAreaOne_footer_container} flex_around`}>
                                  { !edit
                                  &&
                                    <button type='submit' name='submit' className={`commonButton btnColor_orange`}>{isPending ? 'LOADING...': 'ADD'}</button>
                                  }
                                  { edit 
                                    ?
                                    <button onClick={editProduct} className={`commonButton btnColor_green`}>SAVE</button>
                                    :
                                  <button onClick={(e) => {
                                    e.preventDefault()
                                    handlePost()
                                  }} className={`commonButton btnColor_green`}>SUBMIT</button>
                                  }
                                  {
                                    edit
                                    ? 
                                    <button onClick={(e) => {
                                      e.preventDefault()
                                      setEdit('')
                                      setImgHolder('')
                                      setExpensesData(initialExpensesData)
                                    } } className={`commonButton btnColor_red`}>CANCEL</button>
                                    :
                                    <button onClick={(e) => {
                                      e.preventDefault();
                                      setShowData([]);
                                      setExpensesData(initialExpensesData)
                                      setOtherExpensesData(initialOtherExpensesData)
                                      setImgHolder('')
                                     
                                    }} className={`commonButton btnColor_orangeRed`}>
                                      RESET
                                      </button>
                                  }
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${addExpenses.inputAreaTwo} flex_center`}>
              <div className={`${addExpenses.container} `}>
                    <div className={`${addExpenses.titleName} flex_center`}>Calculation Board</div>
                    <div style={{width: '150px'}} className={`${addExpenses.border_remover}`}></div>
                    <br />
                    <div className={`${addExpenses.inputAreaTwoContainer}`}>
                        <div style={{display: `${otherExpensesData?.date ? 'block' : 'none'}`}}>
                          <p>Total Sales: {lastSaleAndAccountsData?.result?.totalSales  &&  lastSaleAndAccountsData?.result?.totalSales }</p>
                          <p>(+) Starting Cash Reserved: {lastSaleAndAccountsData?.result?.total  &&  (lastSaleAndAccountsData?.result?.beginingCashReserved === '0' ? (otherExpensesData?.startingCashReserved ? otherExpensesData?.startingCashReserved : 0 ) : (otherExpensesData?.startingCashReserved ? otherExpensesData?.startingCashReserved : lastSaleAndAccountsData?.result?.beginingCashReserved)  )}</p>
                          <p>(+) Daily Due Collection Amount: {dueSales}</p>
                          <p style={{marginBottom: '10px'}}>Total: {Number(conditionalTotalSales ? conditionalTotalSales : 0) + Number(dueSales ? dueSales : 0)}</p>
                          <hr />
                          <br />
                          <p>Total Sales: {(Number(conditionalTotalSales ? conditionalTotalSales : 0) + Number(dueSales ? dueSales: 0)) }</p>
                          <p>(-)Total Expenses: {calculationOfTotalExpense}</p>
                          <p style={{marginBottom: '10px'}}>(-)Ending Cash Reserved: {otherExpensesData?.endingCashReserved ? otherExpensesData?.endingCashReserved : 0}</p>
                          <hr />
                          <p>Profit Allocation: {Number(conditionalTotalSales ? (Number(conditionalTotalSales) + Number(dueSales)) : 0) - (calculationOfTotalExpense) - Number(otherExpensesData?.endingCashReserved ? otherExpensesData?.endingCashReserved : 0)}</p>
                        </div>
                    </div>

              </div>
            </div>
          </div> 
            <AddExpensesTable setShowData={setShowData} showData={showData} paginatedDataContainer={paginatedDataContainer} paginatedIndex={paginatedIndex} setEdit={setEdit} edit={edit}/>
            <Pagination showData={showData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
        </div>
    );
};

export default AddExpenses;