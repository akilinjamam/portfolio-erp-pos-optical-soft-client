/* eslint-disable react/prop-types */
import { useDispatch} from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
import { customCode } from '../../../customCode/customcode';
const ProductTable = ({setShowData, showData, paginatedDataContainer,paginatedIndex, setEdit, edit, category}) => {

 
  const dispatch = useDispatch();

  const handleDelete = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    const deleteDataActual = showData.filter((f,i) => (i+1) !== deletedId )
    setShowData(deleteDataActual);
  }

  const handleEdit = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    setEdit(deletedId)
  }

  const handleModal = (img) => {
    dispatch(openModal());
    dispatch(openImg(img))
  }

  const todaysDate = customCode()?.ddmmyy

    return (
        <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Supplier Name</th>
                  <th>Collector Name</th>
                  <th>Purchase Price</th>
                  <th>Sales Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Date</th>
                  {
                    category === 'Optical Frame' && <th>Size</th>
                  }
                  {
                    category === 'Optical Frame' && <th>Material</th>
                  }
                  {
                    category === 'Optical Frame' && <th>Frame</th>
                  }
                  {
                    category === 'Optical Frame' && <th>Shape</th>
                  }
                  {
                    category === 'Glass' && <th>Power</th>
                  }
                  {
                    category === 'Glass' && <th>sph</th>
                  }
                  {
                    category === 'Glass' && <th>Cyl</th>
                  }
                  {
                    category === 'Glass' && <th>Axis</th>
                  }
                  <th>Barcode</th>
                  <th>Image</th>
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
                    <td>{data.supplierName}</td>
                    <td>{data.collectorName}</td>
                    <td>{data.purchasePrice}</td>
                    <td>{data.salesPrice}</td>
                    <td>{data.quantity}</td>
                    <td>{data.category}</td>
                    <td>{todaysDate}</td>
                    {
                      category === 'Optical Frame' && <td>{data.size}</td>
                    }
                    {
                      category === 'Optical Frame' && <td>{data.material}</td>
                    }
                    {
                      category === 'Optical Frame' && <td>{data.frame}</td>
                    }
                    {
                      category === 'Optical Frame' && <td>{data.shape}</td>
                    }
                    
                    {
                      category === 'Glass' && <td>{data.power}</td>
                    }
                    {
                      category === 'Glass' && <td>{data.sph}</td>
                    }
                    {
                      category === 'Glass' && <td>{data.cyl}</td>
                    }
                    {
                      category === 'Glass' && <td>{data.axis}</td>
                    }
                    <td>{data.barcode}</td>
                    <td>{data?.img !== 'not added' ? <img onClick={ () => handleModal(data?.img)} style={{margin:'auto', display:'block', borderRadius:'5px', cursor:'pointer'}} height={20} width={20} src={data?.img} alt="" /> : 'image not added'}</td>
                    <td  className={`flex_around`}><i onClick={() => handleDelete(index)} style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> <i onClick={() => handleEdit(index)} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default ProductTable;