/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import { calculateTotalPrice } from '../../../calculation/calculateSum';
 
const ProductListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, fullScr, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete}) => {


  const dispatch = useDispatch();

  const handleModal = (img) => {
    dispatch(openModal('img'));
    dispatch(openImg(img))
  }

  const totalSales = showData?.map(data => Number(data?.salesPrice));
  const totalPurchase = showData?.map(data => Number(data?.purchasePrice));
  const totalQuantity = showData?.map(data => Number(data?.quantity));
  const totalSalesPrice = calculateTotalPrice(totalSales);
  const totalPurchasePrice = calculateTotalPrice(totalPurchase);
  const totalAmountOfQuantity = calculateTotalPrice(totalQuantity);

  const data = fullScr ? showData : paginatedDataContainer
  
  const handleDelete = (id, e) => {
    console.log(e.target.checked)
    setSelectDeleted(true)
      if(e.target.checked){
        setIdsForDelete((prevId) => [...prevId, id] )
      }else{
        const deleteId =idsForDelete?.filter(f => f !== id)
        setIdsForDelete(deleteId)
      }
    }

  const handleAllDelete = () => {
    const allIds = showData?.map(all => all?._id)
    if(idsForDelete?.length === showData?.length){
     setIdsForDelete([])
    }else{
      setIdsForDelete(allIds)
    }
  }

if(isLoading){
    return <CommonLoading/>
}

    return (
        <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          
          <thead>
          <tr> 
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>Total</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}> Sales =</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalSalesPrice}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>Purchase =</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalPurchasePrice}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>Quantity =</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalAmountOfQuantity}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>Profit = </td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalSalesPrice - totalPurchasePrice}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}></td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}></td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}></td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}></td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}></td>
              {
                fullScr ? '' : <td></td>
              }
              {
                fullScr ? '' : <td></td>
              }
             
           </tr>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Product Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Sales Price</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Purchase Price</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Supplier</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>collector</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Quantity</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Category</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Size</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Material</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Frame Type</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Shape</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Barcode</th>
                  {fullScr ? '' : <th>Image</th>}
                  {fullScr ? '' : <th>Action</th>}
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr style={{background: `${(data?._id === edit ? 'lightgray' : '') || (idsForDelete?.find(f => f === data?._id) ? 'rgb(245, 177, 177)' : '') || (!data?.inStock ? 'rgb(102, 0, 51)' : '')}`, color: `${!data?.inStock ? 'white' : ''}`}} key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}>
                      {(selectDeleted && !fullScr) ? <input checked={idsForDelete?.find(f => f === data?._id)} onDoubleClick={handleAllDelete} onClick={(e) =>handleDelete(data?._id, e)} type="checkbox" name="" id="" />: '' }
                      <span>{data?.indexId}</span>
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}} title={data?.productName}>
                    <div style={{maxWidth:"100px"}}>
                    {data?.productName} 
                    </div>  
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.salesPrice}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.purchasePrice}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.supplierName}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.collectorName}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.quantity}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.category}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.createdAt?.slice(0,10)}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.size}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.material}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.frameType}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.shape}</td>
                     <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.barcode}</td>
                    { fullScr ?
                      ''
                      :
                      <td>{data?.img !== 'not added' ? <img onClick={() => handleModal(data?.img)} style={{display:'block', margin:'auto', borderRadius:'5px', cursor:'pointer'}} height={17} width={17} src={data?.img} alt="" /> : <p style={{textAlign:'center',fontStyle:'italic'}}>blank</p> }</td>
                    }
                    { fullScr ?
                    ''
                    :
                    <td  className={`flex_around`}>
                    
                      <i onClick={() => {
                        setSelectDeleted(!selectDeleted)
                        setEdit('')
                        if(selectDeleted){
                          setIdsForDelete([])
                        }
                      }}  style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> 


                      <i onClick={() => {
                        setEdit(data?._id)
                        setSelectDeleted(false)
                        setIdsForDelete([])
                      }} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                    }
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default ProductListTable;