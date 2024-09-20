/* eslint-disable react/prop-types */
import '../../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../../calculation/calculateSum';
import { customCode } from '../../../../customCode/customcode';

const PosListTable = ({listOfSalesItem, handleDeleteSale}) => {
    const date = customCode()?.ddmmyy;
   

    const totalSales = listOfSalesItem?.map(item =>( item?.actualSalesPrice * item?.quantity))
    const totalSalesValue = calculateTotalPrice(totalSales);
   

    return (
        <div style={{overflowX:'hidden', overflowY:'scroll', height:'700px'}}>
            <table >
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Size</th>
                  <th>Material</th>
                  <th>Frame Type</th>
                  <th>Shape</th>
                  <th>Barcode</th>
                  <th>Sales Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
              </tr>
          </thead>
        <tbody>
           {
            listOfSalesItem?.map((item, index) => (
                <tr key={index+1}>
                    <td>{index+1}</td>
                    <td>{item?.productName}</td>
                    <td>{item?.category}</td>
                    <td>{date}</td>
                    <td>{item?.size}</td>
                    <td>{item?.material}</td>
                    <td>{item?.frameType}</td>
                    <td>{item?.shape}</td>
                    <td>{item?.barcode}</td>
                    <td>{item?.actualSalesPrice}</td>
                    <td>{item?.quantity}</td>
                    <td>{Number(item?.quantity) * Number(item?.actualSalesPrice) }</td>
                    <td style={{cursor:'pointer'}} onClick={() => handleDeleteSale(item?.id)}><i className='uil uil-trash-alt btnColor_red_font'></i></td>
                </tr>
            ))
           }
           <tr style={{fontWeight:'bold'}}>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   
                </td>
                <td>
                   Total Sales :
                </td>
                <td>
                    {totalSalesValue}
                </td>
           </tr>
           
        </tbody>
            </table>
        </div>
    );
};

export default PosListTable;