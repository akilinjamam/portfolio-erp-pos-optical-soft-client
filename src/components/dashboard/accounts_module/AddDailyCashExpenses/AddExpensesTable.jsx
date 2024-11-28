/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'


const AddExpensesTable = ({setShowData, showData, paginatedDataContainer,paginatedIndex, setEdit, edit}) => {



  const handleDelete = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    const deleteDataActual = showData.filter((f,i) => (i+1) !== deletedId )
    setShowData(deleteDataActual);
  }

  const handleEdit = (value) => {
    const deletedId = ((value+1)+((paginatedIndex-1)*10))
    setEdit(deletedId)
  }


  // const todaysDate = customCode()?.ddmmyy

  console.log(paginatedDataContainer)

    return (
        <table>
          <thead>
              <tr>
                  <th>SL</th>
                  <th>Expense Name</th>
                  <th>Expense Amount</th>
                  <th>Action</th>
              </tr>
          </thead>
        <tbody>
           {
            paginatedDataContainer?.map((data, index) => {
              return(
                <tr key={index+1} style={{backgroundColor: `${edit === (index+1)+((paginatedIndex-1)*10) ? 'lightgray': ''}`}}>
                    <td>{(((index + 1) === 10) && (paginatedIndex === 1)) ? 1 : '' }{(paginatedIndex-1) === 0 ? '' : ((index+1) === 10 ? paginatedIndex : (paginatedIndex-1) ) }{(index+1) === 10 ? 0 : (index+1)} </td>
                    
                    <td>{data.expenseName}</td>
                    <td>{data.expenseAmount}</td>
                    
                    <td  className={`flex_around`}><i onClick={() => handleDelete(index)} style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> <i onClick={() => handleEdit(index)} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i></td>
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default AddExpensesTable;