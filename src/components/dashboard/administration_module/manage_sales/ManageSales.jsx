import { useDispatch } from "react-redux";
import Pagination from "../../pagination/Pagination";
import manageSaleList from './ManageSales.module.scss';
import {addSalesData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import useManageSales from "./useManageSales";
import ManageSaleTable from "./ManageSalesTable";
import { manageSaleUpdateInput } from "./manageSalesUpdateInput";
import FilterOption from "./FilterOption";

const ManageSales = () => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateSupplierData, setUdpateSupplierData,edit,setEdit,editProduct, initialSupplierData,  modifiedSupplierDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts, query, setQuery, totalSalesValue, totalSalesItem, totalDiscount, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalPaid, range, setRange, updatePaymentMethod, setUpdatePaymentMethod, updateProductData, setUpdateProductData, productId, setProductId, initialProductData, setSaleId, handleUpdateProduct, selectProduct, setSelectProduct} = useManageSales()
    const supplierData = modifiedSupplierDataWithIndexId

  
    const dispatch = useDispatch();
    return (
        <div  className={`${manageSaleList.main} full_width`}>
             <div style={{display:'flex', flexWrap: "wrap"}}  className={`flex_around`}>
                <div className={`${manageSaleList.inputAreaOne} flex_center`}>
                  <div className={`${manageSaleList.container} `}>
                        <div className={`${manageSaleList.titleName}`}>Manage Sale Update</div>
                        <div style={{width: '170px' }}  className={`${manageSaleList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  manageSaleUpdateInput?.slice(0,6).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${manageSaleList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateSupplierData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateSupplierData({...updateSupplierData, [input.value]: e.target.value})}}
                                            required
                                        />
                                      </div>
                                    )
                                  })
                                }
                                <div className={`${manageSaleList.inputFields} flex_between`}>
                                    <label htmlFor="">Payment Method:</label>
                                    <select value={updatePaymentMethod} onChange={(e) => setUpdatePaymentMethod(e.target.value)}>
                                      <option value="">Select Payment Method</option>
                                      <option value="Cash">Cash</option>
                                      <option value="Bank">Bank</option>
                                      <option value="Bkash">Bkash</option>
                                      <option value="Nogod">Nogod</option>
                                    </select>
                                </div>

                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${manageSaleList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${manageSaleList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateSupplierData(initialSupplierData)
                                          setEdit('')
                                          setUpdatePaymentMethod('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${manageSaleList.inputAreaTwo} flex_center`}>
                  <div className={`${manageSaleList.container} `}>
                        <div className={`${manageSaleList.titleName} flex_center`}>Product Update</div>
                        <div style={{width: '135px'}} className={`${manageSaleList.border_remover}`}></div>
                        <br />
                            <div className={`${manageSaleList.inputAreaTwoContainer}`}>
                           
                                  
                            {
                                  manageSaleUpdateInput?.slice(6,9).map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${manageSaleList.productInputArea} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input value={updateProductData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUpdateProductData({...updateProductData, [input.value]: e.target.value})}}
                                            required
                                        />
                                      </div>
                                    )
                                  })
                            }

                            <div className={`${manageSaleList.inputAreaTwo_footer} flex_right`}>
                                  <div className={`${manageSaleList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {selectProduct ? <button onClick={handleUpdateProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {selectProduct ? <button onClick={() => {
                                          setUpdateProductData(initialProductData)
                                          setSelectProduct('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                             
                                  </div>
                          </div>
                                  
                                  
                            </div>
                  </div>
                </div>
              </div>
              <FilterOption dispatch={dispatch} openModal={openModal} addSalesData={addSalesData}  supplierData={supplierData} totalSalesItem={totalSalesItem} totalSalesValue={totalSalesValue} totalPaid={totalPaid} totalDiscount={totalDiscount} totalBankValue={totalBankValue} totalBkashValue={totalBkashValue} totalNogodValue={totalNogodValue} totalCashValue={totalCashValue} setQuery={setQuery} setRange={setRange} query={query} range={range} />
          <section className={`${manageSaleList.navigationIcon} only_flex`}>
          
                
          </section>
          <section  className={`${manageSaleList.tableArea}`}>
              <ManageSaleTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={supplierData} setUpdateProductData={setUpdateProductData} productId={productId} setProductId={setProductId} setSaleId={setSaleId} selectProduct={selectProduct} setSelectProduct={setSelectProduct} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={supplierData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={50}/>
           }      
        </div>
    );
};

export default ManageSales;