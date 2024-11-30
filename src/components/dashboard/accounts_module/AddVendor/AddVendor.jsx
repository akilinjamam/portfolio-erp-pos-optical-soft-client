import '../../../../global_style/global_style.css'
import addVendor from './AddVendor.module.scss';
import { vendorInput } from './addVendorInput';
import useAddVendor from './useVendor';

const AddVendor = () => {
  const {payrollData, setPayrollData, handleSubmit, allSuppliers, setSupplierId, allPayroll, setPaymentMethod,} = useAddVendor()
  
    return (
        <div className={`${addVendor.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${addVendor.inputAreaOne} flex_center`}>
              <div className={`${addVendor.container} `}>
                    <div className={`${addVendor.titleName}`}>Add Vendor</div>
                    <div style={{width: '100px'}}  className={`${addVendor.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            <div  className={`${addVendor.inputFields} flex_between`}>
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
                              vendorInput?.map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addVendor.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input value={payrollData[input.name]}   type={input.type} 
                                        onChange={(e) => {setPayrollData({...payrollData, [input.value]: e.target.value})}}
                                        
                                    />
                                </div>
                                )
                              })
                            }


                            <div  className={`${addVendor.inputFields} flex_between`}>
                                    <label htmlFor="">Payment Method:</label>
                                    <select name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option value="cash">cash</option>
                                        <option value="bank">bank</option>
                                        <option value="bkash">bkash</option>
                                        <option value="nogod">nogod</option>
                                        <option value="rocket">rocket</option>
                                    </select>
                            </div>
                            <div className={`${addVendor.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addVendor.inputAreaOne_footer} flex_right`}>
                              <div className={`${addVendor.inputAreaOne_footer_container} flex_right`}>
                                <button type='submit' name='submit' className={`commonButton btnColor_orange`}>ADD</button>
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${addVendor.inputAreaTwo} flex_center`}>
              <div className={`${addVendor.container} `}>
                    <div className={`${addVendor.titleName} flex_center`}>
                      Calculation Board
                    </div>
                    <div style={{width: '150px'}} className={`${addVendor.border_remover}`}>

                    </div>
                    <div className={`${addVendor.inputAreaTwoContainer}`}>
                        <p>Paid: {allPayroll?.paid}</p>
                        <p>Total Paid: {allPayroll?.totalPaid}</p>
                        <p>Due: {allPayroll?.due}</p>
                        <p>Bill Amount: {allPayroll?.billAmount}</p>
                        <p>Bill No: {allPayroll?.billNo}</p>
                        <p>Last Billing Date: {allPayroll?.billingDate}</p>
                        <p>Last Payment Date: {allPayroll?.paymentDate}</p>
                    </div>
              </div>
            </div>
          </div> 
        </div>
    );
};

export default AddVendor;