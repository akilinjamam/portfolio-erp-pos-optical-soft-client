import '../../../../global_style/global_style.css'
import { updloadCloudinaryImage } from '../../../uploadCloudinaryImg';
import Pagination from '../../pagination/Pagination';
import addEmployee from './AddEmployee.module.scss';
import AddEmployeTable from './AddEmployeTable';
import { textInput } from './employeeInput';
import useAddEmployee from './useAddEmployee';

const AddEmployee = () => {
  const {employeeData, setEmployeeData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialEmployeeData, findEmployee, setImgHolder, setUploading, uploading, handlePost, isPending} = useAddEmployee()

    return (
        <div className={`${addEmployee.main} full_width`}>
          <div style={{flexWrap: "wrap"}}  className={`flex_around`}>
            <div className={`${addEmployee.inputAreaOne} flex_center`}>
              <div className={`${addEmployee.container} `}>
                    <div className={`${addEmployee.titleName}`}>{edit ? 'Update Employee' : 'Add Employee'}</div>
                    <div style={{width: `${edit ? '135px' : '120px'}`}}  className={`${addEmployee.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            {
                              textInput?.slice(0,7).map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addEmployee.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input placeholder={input.placeholder} value={employeeData[input.name]}   type={input.type} 
                                        onChange={(e) => {setEmployeeData({...employeeData, [input.value]: e.target.value})}}
                                        required
                                    />
                                </div>
                                )
                              })
                            }
                            <div className={`${addEmployee.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addEmployee.inputAreaOne_footer} flex_right`}>
                              <div className={`${addEmployee.inputAreaOne_footer_container} flex_around`}>
                                  { !edit
                                  &&
                                    <button type='submit' name='submit' className={`commonButton btnColor_orange`}>ADD</button>
                                  }
                                  { edit 
                                    ?
                                    <button onClick={editProduct} className={`commonButton btnColor_green`}>SAVE</button>
                                    :
                                  <button onClick={(e) => {
                                    e.preventDefault()
                                    handlePost()
                                  }} className={`commonButton btnColor_green`}>{isPending ? 'LOADING...': 'SUBMIT'}</button>
                                  }
                                  {
                                    edit
                                    ? 
                                    <button onClick={(e) => {
                                      e.preventDefault()
                                      setEdit('')
                                      setImgHolder('')
                                      setEmployeeData(initialEmployeeData)
                                    } } className={`commonButton btnColor_red`}>CANCEL</button>
                                    :
                                    <button onClick={(e) => {
                                      e.preventDefault();
                                      setShowData([]);
                                      setEmployeeData(initialEmployeeData)
                                      setImgHolder('')
                                      setUploading(false)
                                    }} className={`commonButton btnColor_orangeRed`}>
                                      RESET
                                      </button>
                                  }
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${addEmployee.inputAreaTwo} flex_center`}>
              <div className={`${addEmployee.container} `}>
                    <div className={`${addEmployee.titleName} flex_center`}>{edit ? 'Update Image' : 'Upload Image'}</div>
                    <div style={{width: '120px'}} className={`${addEmployee.border_remover}`}></div>
                        <div className={`${addEmployee.inputAreaTwoContainer}`}>
                          {edit ? (findEmployee?.img !== 'not added' ? <img height={125} width={125} src={findEmployee?.img} alt="" /> : <i className="uil uil-image-slash"></i>) : <i className="uil uil-image-upload"></i> }
                              {
                                    textInput?.slice(7,8).map((input, index) => {
                                      return (
                                        <div key={index+1} className={`${addEmployee.inputFields}`}>
                                        
                                          <input className='custom-file-input'  type={input.type} 
                                              onChange={(e) => {
                                                const img = e.target.files[0];
                                                updloadCloudinaryImage(img, setImgHolder, setUploading )
                                                
                                              }
                                          }
                                          />
                                      </div>
                                      )
                                    })
                              }

                              <div className={`${addEmployee.uploading}`}>
                                  {uploading ? 'uploading...' : ''}
                              </div>
                              
                        </div>

              </div>
            </div>
          </div> 
            <AddEmployeTable setShowData={setShowData} showData={showData} paginatedDataContainer={paginatedDataContainer} paginatedIndex={paginatedIndex} setEdit={setEdit} edit={edit}/>
            <Pagination showData={showData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
        </div>
    );
};

export default AddEmployee;