/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import manualSales from './ManualSales.module.scss';

// import { customCode } from '../../../customCode/customcode';
const ManualSalesTable = ({setShowData, showData, paginatedDataContainer,paginatedIndex, setEdit, edit}) => {


  const handleDelete = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    const deleteDataActual = showData.filter((f,i) => (i+1) !== deletedId )
    setShowData(deleteDataActual);
  }

  const handleEdit = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    setEdit(deletedId)
  }

  console.log(paginatedDataContainer)

    return (
     <div className={manualSales.table_responsive}>
      <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>product Name</th>
                  <th>Parchase Price</th>
                  <th>Sales Price</th>
                  <th>Quantity</th>
                  <th>Total Sales Price</th>
                  <th>Power</th>
                  <th>Sph</th>
                  <th>Cyl</th>
                  <th>Axis</th>
                  <th>Action</th>
              </tr>
          </thead>
        <tbody>
           {
            paginatedDataContainer?.map((data, index) => {
              return(
                <tr key={index+1} style={{backgroundColor: `${edit === (index+1)+((paginatedIndex-1)*10) ? 'lightgray': ''}`}}>
                    <td>{(((index + 1) === 10) && (paginatedIndex === 1)) ? 1 : '' }{(paginatedIndex-1) === 0 ? '' : ((index+1) === 10 ? paginatedIndex : (paginatedIndex-1) ) }{(index+1) === 10 ? 0 : (index+1)} </td>
                    <td title={data?.productName}>{data?.productName?.length > 20 ? (data?.productName?.slice(0,20) + '...') : data?.productName}</td>
                    <td>{data?.purchasePrice}</td>
                    <td>{data?.actualSalesPrice}</td>
                    <td>{data?.quantity}</td>
                    <td>{data?.actualSalesPrice * data?.quantity}</td>
                    <td>{data?.power}</td>
                    <td>{data?.sph}</td>
                    <td>{data?.cyl}</td>
                    <td>{data?.axis}</td>

                    <td  className={`flex_around`}><i onClick={() => handleDelete(index)} style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> <i onClick={() => handleEdit(index)} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                </tr>
              )
            } )
           }
           <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Sales Price  = {calculateTotalPrice(paginatedDataContainer?.map(item => (item?.actualSalesPrice * item?.quantity)))}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
           </tr>
           
        </tbody>
      </table>
     </div>
    );
};

export default ManualSalesTable;