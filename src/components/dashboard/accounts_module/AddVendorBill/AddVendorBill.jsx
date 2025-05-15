import '../../../../global_style/global_style.css'
import { addVendorList, openModal } from '../../../modal/imgmodal/imgModalSlice';
import Pagination from '../../pagination/Pagination';
import addVendorBill from './AddVendorBill.module.scss';
import { vendorBillInput } from './addVendorBillInput';
import useAddVendorBill from './useAddVendorBill';
import VendorBillTable from './VendorBillTable';

const AddVendorBill = () => {
  const {payrollData, setPayrollData, handleSubmit, allSuppliers, setSupplierId, allPayroll, lastBillingDate, lastPaymentDate, lastPaid, dispatch, setMonth, modifiedVendorDataWithIndexId, isLoading, paginatedDataContainer, setPaginatedDataContainer, setPaginatedIndex} = useAddVendorBill()
  
    return (
        <div className={`${addVendorBill.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${addVendorBill.inputAreaOne} flex_center`}>
              <div className={`${addVendorBill.container} `}>
                    <div className={`${addVendorBill.titleName}`}>Add Vendor</div>
                    <div style={{width: '100px'}}  className={`${addVendorBill.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            <div  className={`${addVendorBill.inputFields} flex_between`}>
                                    <label htmlFor="">Supplier Name:</label>
                                    <select name="" id="" onChange={(e) => setSupplierId(e.target.value)}>
                                      <option value="">Select Supplier</option>
                                        {
                                          allSuppliers?.map((supplier, index) => {
                                            return (
                                              <option key={index+1} value={supplier?._id}>{supplier?.supplierName}</option>
                                            )
                                          })
                                        }
                                    </select>
                            </div>
                        
                        
                            {
                              vendorBillInput?.map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addVendorBill.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input value={payrollData[input.name]}   type={input.type} 
                                        onChange={(e) => {setPayrollData({...payrollData, [input.value]: e.target.value})}}
                                        
                                    />
                                </div>
                                )
                              })
                            }

                            <div className={`${addVendorBill.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addVendorBill.inputAreaOne_footer} flex_right`}>
                              <div className={`${addVendorBill.inputAreaOne_footer_container} flex_right`}>
                                <button type='submit' name='submit' className={`commonButton btnColor_orange`}>ADD</button>
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${addVendorBill.inputAreaTwo} flex_center`}>
              <div className={`${addVendorBill.container} `}>
                    <div className={`${addVendorBill.titleName} flex_center`}>
                      Calculation Board
                    </div>
                    <div style={{width: '150px'}} className={`${addVendorBill.border_remover}`}>

                    </div>
                    <div className={`${addVendorBill.inputAreaTwoContainer}`}>
                        <p>Paid: {lastPaid}</p>
                        <p>Total Paid: {allPayroll?.totalPaid}</p>
                        <p>Due: {allPayroll?.due}</p>
                        <p>Bill Amount: {allPayroll?.billAmount}</p>
                        <p>Bill No: {allPayroll?.billNo}</p>
                        <p>Last Billing Date: {lastBillingDate}</p>
                        <p>Last Payment Date: {lastPaymentDate}</p>
                    </div>
              </div>
            </div>
          </div> 
          <section className={`${addVendorBill.navigationIcon} flex_between`}>
                          { 
                          <div className={`${addVendorBill.inputPart} flex_left`}>
                              <i
                              onClick={() => {
                                dispatch(openModal('vendor'))
                                dispatch(addVendorList(modifiedVendorDataWithIndexId))
                              }}
                              title="print" className="uil uil-print"></i>
                              <span>Total : {modifiedVendorDataWithIndexId?.length} </span>
                          
                             
                              <input type="month" name="" id="" onChange={(e) => setMonth(e.target.value)}/>
                          </div>
                          }
                          
                    </section>
                    <section className={`${addVendorBill.navigationIcon} only_flex`}>
                    
                          
                    </section>
                    <section style={{height: '42vh'}}  className={`${addVendorBill.tableArea}`}>
                        <VendorBillTable isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} />
                    </section>
                     {
                      !isLoading
                      &&
                      <Pagination showData={modifiedVendorDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
                     }      
        </div>
    );
};

export default AddVendorBill;