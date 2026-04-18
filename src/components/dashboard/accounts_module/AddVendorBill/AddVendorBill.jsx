import { useMemo } from 'react';
import '../../../../global_style/global_style.css'
import usePdfDownloader from '../../../../usePdfDownloader';
import Pagination from '../../pagination/Pagination';
import addVendorBill from './AddVendorBill.module.scss';
import { vendorBillInput } from './addVendorBillInput';
import NewFilterOption from './NewFilterOption';
import useAddVendorBill from './useAddVendorBill';
import VendorBillTable from './VendorBillTable';

const AddVendorBill = () => {
  const {payrollData, setPayrollData, handleSubmit, allSuppliers, setSupplierId, allPayroll, lastBillingDate, lastPaymentDate, lastPaid, setMonth, modifiedVendorDataWithIndexId, isLoading, paginatedDataContainer, setPaginatedDataContainer, setPaginatedIndex, isPending, month} = useAddVendorBill()

  const dataForPdf = useMemo(() => {
      const result = modifiedVendorDataWithIndexId?.map((vendor) => {
  
  
          return [
              vendor?.indexId,
              `${vendor?.supplierName?.supplierName}\n${vendor?.supplierName?.mobile}`,
              vendor?.singleBillAmount,
              vendor?.billAmount,
              vendor?.billingDate,
              vendor?.billNo,
              // Summary (multi-line)
              `Total Paid: ${vendor?.totalPaid}\nPaid: ${vendor?.paid}`,
              `Due: ${vendor?.due}\nPrevious Due: ${vendor?.due}`,
              `Payment Method: ${vendor?.paymentMethod}\nId: ${vendor?.transectionId}`,
          ];
      });
  
      return {
          header: [
              "SL",
              "Supplier",
              "Bill Amount",
              "Total Bill Amount",
              "Billing Date",
              "Billing No",
              "Payment Info",
              "Due",
              "Payment & Id",
          ],
          result
      };
  }, [modifiedVendorDataWithIndexId]);
  
     
      
  const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Vendor Bill", [], 30)


  
    return (
        <div className={`${addVendorBill.main} full_width`}>
          <div style={{flexWrap: "wrap"}}  className={`flex_around`}>
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
                                    <input placeholder={input.placeholder} value={payrollData[input.name]}   type={input.type} 
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
                                <button type='submit' name='submit' className={`commonButton btnColor_orange`}>{isPending ? 'ADDING...': 'ADD'}</button>
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
          <NewFilterOption pdf={handleDownloadPDF} date={month} setDate={setMonth} totalCount={modifiedVendorDataWithIndexId?.length} />
          
                    <section className={`${addVendorBill.navigationIcon} only_flex`}>
                    
                          
                    </section>
                    <section style={{height: '38vh', overflowY: "scroll", scrollbarWidth: "none"}}  className={`${addVendorBill.tableArea}`}>
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