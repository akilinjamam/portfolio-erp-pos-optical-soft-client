/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Pagination from "../../pagination/Pagination";
import cashList from './DailyCashExpensesList.module.scss';
import {  addExpenseListData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import DailyCashExpensesTable from "./DailyCashExpensesTable";
import useDailyCashExpensesList from "./useDailyCashExpensesList";
import { accountListInput } from "./accountListInputs";


const DailyCashExpensesList = ({hideField, hideSection}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateAccountsData, setUdpateAccountsData,edit,setEdit,editProduct, initialAccountsData,  modifiedAccountsDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,setMonth, setDate, } = useDailyCashExpensesList();
    const accountsData = modifiedAccountsDataWithIndexId

   

    const dispatch = useDispatch();

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
                <div className={`${cashList.inputAreaTwo} flex_center`}>
                  <div className={`${cashList.container} `}>
                        <div className={`${cashList.titleName} flex_center`}></div>
                        <div style={{width: '0'}} className={`${cashList.border_remover}`}></div>
                        <br />
                            <div className={`${cashList.inputAreaTwoContainer}`}>
                            
                              
                            </div>
                  </div>
                </div>
              </div>
          <section className={`${cashList.navigationIcon} flex_between`}>
                { 
                <div className={`${cashList.inputPart} flex_left`}>
                    <i
                    onClick={() => {
                      dispatch(openModal('expense'))
                      dispatch(addExpenseListData(accountsData))
                    }}
                    title="print" className="uil uil-print"></i>
                    <span>Total : {accountsData?.length} </span>
                
                    <input type="month" name="" id="" onChange={(e) => setMonth(e.target.value)}/>
                    <input type="date" name="" id="" onChange={(e) => setDate(e.target.value)}/>
                </div>
                }
                
          </section>
          <section className={`${cashList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '42vh'}}  className={`${cashList.tableArea}`}>
              <DailyCashExpensesTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={accountsData} hideField={hideField} />
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