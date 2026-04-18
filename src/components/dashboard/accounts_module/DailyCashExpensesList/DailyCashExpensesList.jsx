/* eslint-disable react/prop-types */
import Pagination from "../../pagination/Pagination";
import cashList from './DailyCashExpensesList.module.scss';
import DailyCashExpensesTable from "./DailyCashExpensesTable";
import useDailyCashExpensesList from "./useDailyCashExpensesList";
import { accountListInput } from "./accountListInputs";
import NewFilterOption from "./NewFilterOption";
import { useMemo } from "react";
import { calculateTotalPrice } from "../../../calculation/calculateSum";
import usePdfDownloader from "../../../../usePdfDownloader";


const DailyCashExpensesList = ({hideField, hideSection}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateAccountsData, setUdpateAccountsData,edit,setEdit,editProduct, initialAccountsData,  modifiedAccountsDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,setMonth, setDate, location , date, month} = useDailyCashExpensesList();
    const accountsData = modifiedAccountsDataWithIndexId

   const dataForPdf = useMemo(() => {
         const result = accountsData?.map((vendor) => {

          // const exp = vendor?.expenses?.map((expense, index) => {
          //   // <p key={index + 1}>{index + 1}. {expense?.expenseName} = {expense?.expenseAmount} </p>
          //   return {
          //     expName: expense?.expenseName,
              
          //   }
          // } )

          const exp = vendor?.expenses?.map((expense, index) => `${index+1}. ${expense?.expenseName} = ${expense?.expenseAmount} ` ).join('\n');
          const totalExp = calculateTotalPrice(vendor?.expenses?.map((expense) => Number(expense?.expenseAmount)));
          const allocation = vendor?.todayNogodValue + vendor?.todayBkashValue + vendor?.todayBankValue + Number(vendor?.profitAllocation)

          /*  <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>
                            <p>Cash: {data?.salesAmount}</p>
                            <p>Due: {data?.dueSalesAmount}</p>
                          </td>
                        
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
                          <td style={{ border: '1px solid #dddddd', textAlign: 'left' }}>{data?.todayNogodValue + data?.todayBkashValue + data?.todayBankValue + Number(data?.profitAllocation)}</td> */
     
     
             return [
                 vendor?.indexId,
                 `Cash: ${vendor?.salesAmount}\nDue${vendor?.dueSalesAmount}`,
                 vendor?.startingCashReserved,
                 vendor?.totalSalesAmount,
                 vendor?.date,
                 exp,
                 totalExp,
                 vendor?.endingCashReserved,
                 vendor?.deficit,
                 `Cashover: ${vendor?.cashOver}\nProfit Allocation: ${vendor?.profitAllocation}`,
                 `Total Bank: ${vendor?.todayBankValue}\nTotal Bkash Value: ${vendor?.todayBkashValue}\nTotal Nogod: ${vendor?.todayNogodValue}`,
                 allocation
             ];
         });
     
         return {
             header: [
                 "SL",
                 "Cash Sales & Due",
                 "Strting Cash Reserve",
                 "Total Sales Amount",
                 "Date",
                 "Expenses",
                 "Total Expenses",
                 "Ending Cash Reserve",
                 "Deficit",
                 "Cash & Profit",
                 "Payment Type",
                 "Total",
             ],
             result
         };
     }, [accountsData]);
     
        
         
     const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Expesne List", [], 30)

    return (
        <div  className={`${cashList.main} full_width`}>
             <div style={{display: `${hideSection ? 'none' : 'flex'}`}}  className={`flex_around`}>
                <div className={`${cashList.inputAreaOne} flex_center`}>
                  <div className={`${cashList.container} `}>
                        <div className={`${cashList.titleName}`}>Expenses Update</div>
                        <div style={{width: '150px' }}  className={`${cashList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  accountListInput?.map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${cashList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateAccountsData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateAccountsData({...updateAccountsData, [input.value]: e.target.value})}}
                                    
                                        />
                                    </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${cashList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${cashList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateAccountsData(initialAccountsData)
                                          setEdit('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
               
              </div>
          <NewFilterOption pdf={handleDownloadPDF} date={date} setDate={setDate} month={month} setMonth={setMonth} totalCount={accountsData?.length}/>
          
          <section className={`${cashList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: `${location === '/dashboard/accounts_module/expenses_list' ? '55vh' : '72vh'}`}}  className={`${cashList.tableArea}`}>
              <DailyCashExpensesTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={accountsData} hideField={hideField} hideSection={hideSection} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={accountsData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={31}/>
           }      
        </div>
    );
};

export default DailyCashExpensesList;