import '../../../../global_style/global_style.css'
import Pagination from '../../pagination/Pagination';
import addFixedExpenses from './AddFixedExpenses.module.scss';
import AddFixedExpensesTable from './AddFixedExpensesTable';
import useAddFixedExpenses from './useAddFixedExpenses';
import { addFixedExpensesInput, addOnterFixedExpensesInput } from './addFixedExpensesInput';
import { calculateTotalPrice } from '../../../calculation/calculateSum';

const AddFixedExpenses = () => {
  const {otherExpensesData, setOtherExpensesData ,expensesData, setExpensesData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialExpensesData, initialOtherExpensesData, setImgHolder, handlePost, profitExpenseData} = useAddFixedExpenses();

  const totalFixedExpense = calculateTotalPrice(showData?.map(item => Number(item?.expenseAmount)))
  
    return (
        <div className={`${addFixedExpenses.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${addFixedExpenses.inputAreaOne} flex_center`}>
              <div className={`${addFixedExpenses.container} `}>
                    <div className={`${addFixedExpenses.titleName}`}>{edit ? 'Update Expenses' : 'Add Expenses'}</div>
                    <div style={{width: `${edit ? '135px' : '120px'}`}}  className={`${addFixedExpenses.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            {
                              addFixedExpensesInput?.map((input, index) => {
                                return (
                                <div key={index+1} className={`${addFixedExpenses.inputFields} flex_between`}>
                                <label htmlFor="">{input.placeholder}:</label>
                                <input value={expensesData[input.name]}   type={input.type} 
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
                              addOnterFixedExpensesInput?.map((input, index) => {
                                return (
                                <div key={index+1} className={`${addFixedExpenses.inputFields} flex_between`}>
                                <label htmlFor="">{input.placeholder}:</label>
                                <input value={otherExpensesData[input.name]}   type={input.type} 
                                    onChange={(e) => {setOtherExpensesData({...otherExpensesData, [input.value]: e.target.value})}}
                                    
                                />
                                </div>
                                )
                              })
                            }
                            <div className={`${addFixedExpenses.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addFixedExpenses.inputAreaOne_footer} flex_right`}>
                              <div className={`${addFixedExpenses.inputAreaOne_footer_container} flex_around`}>
                                  { !edit
                                  &&
                                    <button type='submit' name='submit' className={`commonButton btnColor_orange`}>ADD</button>
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
            <div className={`${addFixedExpenses.inputAreaTwo} flex_center`}>
              <div className={`${addFixedExpenses.container} `}>
                    <div className={`${addFixedExpenses.titleName} flex_center`}>Calculation Board</div>
                    <div style={{width: '150px'}} className={`${addFixedExpenses.border_remover}`}></div>
                    <br />
                    <div className={`${addFixedExpenses.inputAreaTwoContainer}`}>
                        <div style={{display: `${otherExpensesData?.date ? 'block' : 'none'}`}}>
                            
                        </div>
                         <p>Cash+Bank+Bkash+Nogod : {profitExpenseData?.result?.cashProfit}+{profitExpenseData?.result?.bankProfit + profitExpenseData?.result?.bankDueCollection }+{profitExpenseData?.result?.bkashProfit + profitExpenseData?.result?.bkashDueCollection}+{profitExpenseData?.result?.nogodProfit + profitExpenseData?.result?.nogodDueCollection}</p>
                         <br />           
                        <p>Profit : {profitExpenseData?.result?.totalProfit}</p>
                        <p style={{marginBottom:'3px'}}>(+) Extra Profit : </p>
                        <hr />
                        <p>Total Profit : {profitExpenseData?.result?.totalProfit + Number(otherExpensesData?.extraProfitAmount)}</p>
                        <br />
                        <p>(-) Fixed Expenses : {totalFixedExpense}</p>
                        <p>(-) Vendor Payment : {profitExpenseData?.result?.vendorExpenses}</p>
                        <p style={{marginBottom:'3px'}}>(-) Salary Payment : {profitExpenseData?.result?.salaryExpenses}</p>
                        <hr />
                        <p>Net Profit : {profitExpenseData?.result?.totalProfit - profitExpenseData?.result?.vendorExpenses - profitExpenseData?.result?.salaryExpenses - totalFixedExpense}</p>
                    </div>

              </div>
            </div>
          </div> 
            <AddFixedExpensesTable setShowData={setShowData} showData={showData} paginatedDataContainer={paginatedDataContainer} paginatedIndex={paginatedIndex} setEdit={setEdit} edit={edit}/>
            <Pagination showData={showData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
        </div>
    );
};

export default AddFixedExpenses;