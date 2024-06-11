/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import { calculateTotalPrice } from '../../../calculation/calculateSum';
// import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
// 
const ProductListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, fullScr}) => {
   

  
  const dispatch = useDispatch();

  const handleModal = (img) => {
    dispatch(openModal('img'));
    dispatch(openImg(img))
  }

  const totalSales = showData?.map(data => data?.salesPrice);
  const totalPurchase = showData?.map(data => data?.purchasePrice);
  const totalQuantity = showData?.map(data => data?.quantity);
  const totalSalesPrice = calculateTotalPrice(totalSales);
  const totalPurchasePrice = calculateTotalPrice(totalPurchase);
  const totalAmountOfQuantity = calculateTotalPrice(totalQuantity);

  const data = fullScr ? showData : paginatedDataContainer


if(isLoading){
    return <CommonLoading/>
}

    return (
        <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Product Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Sales Price</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Purchase Price</th>
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
                <tr style={{background: `${data?._id === edit ? 'lightgray' : ''}`}} key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>
                      {data?.indexId}
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}} title={data?.productName}>{data?.productName?.length > 20 ? (data?.productName?.slice(0,20) + '...') : data?.productName}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.salesPrice}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.purchasePrice}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.quantity}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.category}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.date?.slice(0,10)}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.size}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.material}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.frameType}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.shape}</td>
                     <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.barcode}</td>
                    { fullScr ?
                      ''
                      :
                      <td><img onClick={() => handleModal(data?.img)} style={{display:'block', margin:'auto', borderRadius:'5px', cursor:'pointer'}} height={17} width={17} src={data?.img} alt="" /></td>
                    }
                    { fullScr ?
                    ''
                    :
                    <td  className={`flex_around`}><i  style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> <i onClick={() => setEdit(data?._id)} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                    }
                </tr>
              )
            } )
           }
           <tr>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>Total</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>=</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalSalesPrice}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalPurchasePrice}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalAmountOfQuantity}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}>Profit = {totalSalesPrice - totalPurchasePrice}</td>
              <td style={{border:'1px solid #dddddd',textAlign:'center'}}></td>
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
        </tbody>
      </table>
    );
};

export default ProductListTable;