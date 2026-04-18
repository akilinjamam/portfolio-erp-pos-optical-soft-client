/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import salesRecord from '../../administration_module/product_list/NewProductListTable.module.scss';
import { openImg, openModal, openSingleBarcode } from '../../../modal/imgmodal/imgModalSlice';
import CommonLoading from '../../../commonLoagin/CommonLoading';


const NewStockTable = ({isLoading, paginatedDataContainer,  summary}) => {

    const dispatch = useDispatch();

    const handleModal = (img) => {
        dispatch(openModal('img'));
        dispatch(openImg(img))
      }

      const handleBarcode = (bar, productName) => {
        const data = {
          barcode: bar,
          productName
        }
        dispatch(openModal('single-barcode'));
        dispatch(openSingleBarcode(data))
      }

    if(isLoading) return <CommonLoading/>

      
    return (
        <div className={salesRecord.tableContainer}>
            <div className={salesRecord.summaryGrid}>
                            <div className={salesRecord.statCard}>
                                <label>Total Sales</label>
                                <p>৳ {new Intl.NumberFormat('en-IN').format(summary?.totalSalesPrice) }</p>
                               
                            </div>
                            <div className={salesRecord.statCard}>
                                <label>Total Purchase</label>
                                <p>৳ {new Intl.NumberFormat('en-IN').format(summary?.totalPurchasePrice) }</p>
                            </div>
                            
                            <div className={salesRecord.statCard}>
                                <label>Stock Summary</label>
                                <div className={salesRecord.miniStats}>
                                    <span>Total Stock: ৳ {summary?.totalStock}</span>
                                    <span>Total Available: ৳ {summary?.totalQuantity}</span>
                                    <span>Sold Qty: ৳ {summary?.totalStock - summary?.totalQuantity}</span>
                                    
                                </div>
                            </div>
            </div>
            <div className={salesRecord.table_responsive}>
                <table className={salesRecord.customTable}>
                    <thead>
                        
                        <tr>
                            <th>SL</th>
                            <th>Product Details</th>
                            <th>Stock</th>
                            <th>Pricing & category</th>
                            <th>Features</th>
                            <th>Engaged By</th>
                            <th>Img</th>
                            <th>Barcode</th>
                        </tr>
                    </thead>
                        
                    <tbody>
                        {
                        paginatedDataContainer?.map((sale, index) => {
                            return (
                                <tr key={index}>
                        
                                     {/* --------------------------------- */}
                                      <td 
                                      className={salesRecord.sidBadge} 
                                      style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}
                                      >
                                        <span>{sale?.sId}</span>
                                    </td>
                
                                    <td>
                                        <div className={salesRecord.customerInfo}>
                                            <strong>{sale?.productName}</strong>
                                            <p>{sale?.createdAt?.slice(0, 10)}</p>
                                        </div>
                                    </td>
                                   
                                    <td>
                                        <div>
                                            <p>Total: {sale?.stockAmount}</p>
                                            <p> Stockout: {Number(sale?.stockAmount) - Number(sale?.quantity)}</p>
                                            <p>Available: {Number(sale?.quantity)}</p>
                                            <p>Last Stockout Date: </p>
                                            <p>{sale?.updatedAt?.slice(0,10)} </p>
                                        </div>

                                    </td>
                                    <td>
                                        <div className={salesRecord.productList}>
                                           <span>Sales Price: {sale?.salesPrice}</span><br />
                                           <span>Purchase Price: {sale?.purchasePrice}</span><br /><br />
                                           <span>Category: {sale?.category}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={salesRecord.priceSummary}>
                                            <div>Size: <strong>{sale?.size}</strong></div>
                                            <div className={salesRecord.textSuccess}>Material: {sale?.material}</div>
                                            <div className={salesRecord.textDanger}>Frame Type: {sale?.frameType}</div>
                                            <div className={salesRecord.textWarning}>Frame Shape: {sale?.shape}</div>
                                            <div className={salesRecord.textWarning}>Power: {sale?.power}</div>
                                        </div>
                                    </td>
                                    
                                    <td className={salesRecord.recorderName}>
                                        <span>Supplier: {sale?.supplierName}</span><br />
                                        <span>Collector: {sale?.collectorName}</span><br />
                                        <span>Recorder: {sale?.recorderName}</span><br />
                                    </td>
                                    <td className={salesRecord.recorderName}>
                                        {sale?.img !== 'not added' ? <img onClick={() => handleModal(sale?.img)} style={{display:'block', margin:'auto', borderRadius:'5px', cursor:'pointer'}} height={17} width={17} src={sale?.img} alt="" /> : <p>blank</p> }
                                    </td>
                                    <td style={{cursor: "pointer"}} onClick={() => handleBarcode(sale?.barcode, sale?.productName)} className={salesRecord.invoiceCell}>{sale?.barcode}</td>
                                    
                                </tr>
                            );
                        })}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default NewStockTable;