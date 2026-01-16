/* eslint-disable react/prop-types */
import { useDispatch} from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
// import { customCode } from '../../../customCode/customcode';
import addEmployee from './AddEmployee.module.scss';
const AddEmployeeTable = ({setShowData, showData, paginatedDataContainer,paginatedIndex, setEdit, edit}) => {

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


    return (
     <div className={addEmployee.table_responsive}>
        <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Employee Name</th>
                  <th>Joining Date</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>NID</th>
                  <th>Employee Id</th>
                  <th>Basic Salary</th>
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
                    <td title={data?.productName}>{data?.productName?.length > 20 ? (data?.productName?.slice(0,20) + '...') : data?.employeeName}</td>
                    <td>{data.joiningDate}</td>
                    <td>{data.address}</td>
                    <td>{data.mobile}</td>
                    <td>{data.nid}</td>
                    <td>{data.employeeId}</td>
                    <td>{data.basicSalary}</td>
          
                    <td>{data?.img !== 'not added' ? <img onClick={ () => handleModal(data?.img)} style={{margin:'auto', display:'block', borderRadius:'5px', cursor:'pointer'}} height={20} width={20} src={data?.img} alt="" /> : 'image not added'}</td>
                    <td  className={`flex_around`}><i onClick={() => handleDelete(index)} style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> <i onClick={() => handleEdit(index)} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                </tr>
              )
            } )
           }
           
        </tbody>
        </table>
     </div>
    );
};

export default AddEmployeeTable;