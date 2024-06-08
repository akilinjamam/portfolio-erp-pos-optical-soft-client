/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import { calculateTotalPrice } from '../../../calculation/calculateSum';
// import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
// 
const ProductListTable = ({paginatedDataContainer, isLoading, paginatedIndex, setEdit, edit, showData, fullScr}) => {
   

  
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
        <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Sales Price</th>
                  <th>Purchase Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Size</th>
                  <th>Material</th>
                  <th>Frame Type</th>
                  <th>Shape</th>
                  <th>Barcode</th>
                  <th>Image</th>
                  <th>Action</th>
              </tr>
          </thead>
        <tbody>
           {
            data?.map((data, index) => {
              return(
                <tr style={{background: `${data?._id === edit ? 'lightgray' : ''}`}} key={index+1} >
                    <td>{(((index + 1) === 10) && (paginatedIndex === 1)) ? 1 : '' }{(paginatedIndex-1) === 0 ? '' : ((index+1) === 10 ? paginatedIndex : (paginatedIndex-1) ) }{(index+1) === 10 ? 0 : (index+1)} </td>
                    <td title={data?.productName}>{data?.productName?.length > 20 ? (data?.productName?.slice(0,20) + '...') : data?.productName}</td>
                    <td>{data?.salesPrice}</td>
                    <td>{data?.purchasePrice}</td>
                    <td>{data?.quantity}</td>
                    <td>{data?.category}</td>
                    <td>{data?.date?.slice(0,10)}</td>
                    <td>{data?.size}</td>
                    <td>{data?.material}</td>
                    <td>{data?.frameType}</td>
                    <td>{data?.shape}</td>
                    <td>{data?.barcode}</td>
                    <td><img onClick={() => handleModal(data?.img)} style={{display:'block', margin:'auto', borderRadius:'5px', cursor:'pointer'}} height={17} width={17} src={data?.img} alt="" /></td>
                    <td  className={`flex_around`}><i  style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> <i onClick={() => setEdit(data?._id)} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                </tr>
              )
            } )
           }
           <tr>
              <td>Total</td>
              <td>=</td>
              <td>{totalSalesPrice}</td>
              <td>{totalPurchasePrice}</td>
              <td>{totalAmountOfQuantity}</td>
              <td>Profit = {totalSalesPrice - totalPurchasePrice}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
           </tr>
        </tbody>
      </table>
    );
};

export default ProductListTable;