/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
// import { customCode } from '../../../customCode/customcode';
import addEmployee from './AddBranch.module.scss';


const AddBranchTable = ({setShowData, showData, paginatedDataContainer,paginatedIndex, setEdit, edit}) => {



  const handleDelete = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    const deleteDataActual = showData.filter((f,i) => (i+1) !== deletedId )
    setShowData(deleteDataActual);
  }

  const handleEdit = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    setEdit(deletedId)
  }

    return (
     <div className={addEmployee.table_responsive}>
        <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Branch Name</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Action</th>
              </tr>
          </thead>
        <tbody>
           {
            paginatedDataContainer?.map((data, index) => {
              return(
                <tr key={index+1} style={{backgroundColor: `${edit === (index+1)+((paginatedIndex-1)*10) ? 'lightgray': ''}`}}>
                    <td>{(((index + 1) === 10) && (paginatedIndex === 1)) ? 1 : '' }{(paginatedIndex-1) === 0 ? '' : ((index+1) === 10 ? paginatedIndex : (paginatedIndex-1) ) }{(index+1) === 10 ? 0 : (index+1)} </td>
                    <td>{data.name}</td>
                    <td>{data.address}</td>
                    <td>{data.phone}</td>
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

export default AddBranchTable;