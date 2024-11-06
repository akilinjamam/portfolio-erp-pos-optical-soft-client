/* eslint-disable react/prop-types */
import { useDispatch} from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';

const AddSupplierTable = ({setShowData, showData, paginatedDataContainer,paginatedIndex, setEdit, edit}) => {

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

  // const todaysDate = customCode()?.ddmmyy

  console.log(paginatedDataContainer)

    return (
        <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Supplier Name</th>
                  <th>Address</th>
                  <th>Mobile</th>
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
                    <td title={data?.productName}>{data?.productName?.length > 20 ? (data?.productName?.slice(0,20) + '...') : data?.supplierName}</td>
                    <td>{data.address}</td>
                    <td>{data.mobile}</td>
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

export default AddSupplierTable;