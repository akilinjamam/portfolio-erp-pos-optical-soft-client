/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import salesRecord from './NewProductListTable.module.scss';
import { openImg, openModal, openSingleBarcode } from '../../../modal/imgmodal/imgModalSlice';


const NewProductListTable = ({ paginatedDataContainer,  setSelectDeleted, setIdsForDelete, idsForDelete, selectDeleted, setEdit, edit, summary}) => {

    const dispatch = useDispatch();

    const handleModal = (img) => {
        dispatch(openModal('img'));
        dispatch(openImg(img))
      }

     const handleDelete = (id, e) => {
        
        setSelectDeleted(true)
        if(e.target.checked){
          setIdsForDelete((prevId) => [...prevId, id] )
        }else{
          const deleteId =idsForDelete?.filter(f => f !== id)
          setIdsForDelete(deleteId)
        }
      }
      
      const handleAllDelete = () => {
        const allIds = paginatedDataContainer?.map(all => all?._id)
        if(idsForDelete?.length === paginatedDataContainer?.length){
          setIdsForDelete([])
        }else{
          setIdsForDelete(allIds)
        }
      }
    
      const handleBarcode = (bar, productName) => {
        const data = {
          barcode: bar,
          productName
        }
        console.log(bar);
        console.log(productName);
        dispatch(openModal('single-barcode'));
        dispatch(openSingleBarcode(data))
      }

      
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
                            <th>Action</th>
                        </tr>
                    </thead>
                        
                    <tbody>
                        {
                        paginatedDataContainer?.map((sale, index) => {
                            const isEditing = sale?._id === edit;
                            const isSelectedForDelete = idsForDelete?.find(f => f === sale?._id);
                            const outOfStock = !sale?.inStock;
                            return (
                                <tr key={index}
                                    style={{
                                        background: isEditing 
                                            ? 'lightgray' 
                                            : isSelectedForDelete 
                                                ? 'rgb(245, 177, 177)' 
                                                : outOfStock 
                                                    ? 'rgb(102, 0, 51)' 
                                                    : '', 
                                        color: outOfStock ? 'white' : ''
                                    }}
                                >
                        
                                     {/* --------------------------------- */}
                                      <td 
                                      className={salesRecord.sidBadge} 
                                      style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}
                                      >
                                        {(selectDeleted ) ? <input checked={idsForDelete?.find(f => f === sale?._id)} onDoubleClick={handleAllDelete} onClick={(e) =>handleDelete(sale?._id, e)} type="checkbox" name="" id="" />: '' }
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
                                    <td  className={`flex_around`}>
                    
                                        <i onClick={() => {
                                            setSelectDeleted(!selectDeleted)
                                            setEdit('')
                                            if(selectDeleted){
                                            setIdsForDelete([])
                                            }
                                        }}  style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> 


                                        <i onClick={() => {
                                            setEdit(sale?._id)
                                            setSelectDeleted(false)
                                            setIdsForDelete([])
                                        }} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default NewProductListTable;