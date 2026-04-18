/* eslint-disable react/prop-types */
import Pagination from "../../pagination/Pagination";
import vendorList from './VendorList.module.scss';
import useVendorList from "./useVendorList";
import { vendorInput } from "../AddVendor/addVendorInput";
import VendorListTable from "./VendorlistTable";
import FilterOption from "../../hrAndPayroll/PayrollList/NewFilterOption";
import { useMemo } from "react";
import usePdfDownloader from "../../../../usePdfDownloader";


const VendorList = ({hideSection, hideField}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateEmployeeData, setUdpateEmployeeData,edit,setEdit,editProduct, initialEmployeeData,  modifiedEmployeeDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts,setMonth, setEmployeeId, supplierData, totalPaid, location, month, employeeId } = useVendorList();
    const vendorData = modifiedEmployeeDataWithIndexId

    const allEmployeeData =supplierData?.result?.sort((a, b) => a.supplierName.toLowerCase() > b.supplierName.toLowerCase() ? 1 : -1);

  const dataForPdf = useMemo(() => {
        const result = vendorData?.map((vendor) => {
    
    
            return [
                vendor?.indexId,
                `${vendor?.supplierName?.supplierName}\n${vendor?.supplierName?.mobile}`,
                vendor?.singleBillAmount,
                vendor?.billAmount,
                vendor?.billingDate,
                vendor?.paymentDate,
                vendor?.billNo,
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
                "Payment Date",
                "Billing No",
                "Payment Info",
                "Due",
                "Payment & Id",
            ],
            result
        };
    }, [vendorData]);
    
       
        
        const {handleDownloadPDF} = usePdfDownloader(dataForPdf?.result, dataForPdf?.header, "Vendor List", [], 30)

    return (
        <div  className={`${vendorList.main} full_width`}>
             <div style={{display:`${hideSection ? 'none' : 'flex'}`}}  className={`flex_around`}>
                <div className={`${vendorList.inputAreaOne} flex_center`}>
                  <div className={`${vendorList.container} `}>
                        <div className={`${vendorList.titleName}`}>Vendor Update</div>
                        <div style={{width: '130px' }}  className={`${vendorList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  vendorInput?.map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${vendorList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input placeholder={input.placeholder} value={updateEmployeeData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateEmployeeData({...updateEmployeeData, [input.value]: e.target.value})}}
                                    
                                        />
                                    </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${vendorList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${vendorList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateEmployeeData(initialEmployeeData)
                                          setEdit('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
              
              </div>
          <FilterOption downloadPdf={handleDownloadPDF} month={month} setMonth={setMonth} allEmployeeData={allEmployeeData} employeeId={employeeId} setEmployeeId={setEmployeeId} total={vendorData?.length}  />
         
          <section className={`${vendorList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: `${location === '/dashboard/accounts_module/vendor_list' ? '42vh' : '72vh'}`}}  className={`${vendorList.tableArea}`}>
              <VendorListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={vendorData} totalPaid={totalPaid} hideField={hideField}/>
          </section>
           {
            !isLoading
            &&
            <Pagination showData={vendorData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default VendorList;