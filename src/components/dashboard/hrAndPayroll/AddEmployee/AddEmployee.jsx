import '../../../../global_style/global_style.css'
import { updloadCloudinaryImage } from '../../../uploadCloudinaryImg';
import Pagination from '../../pagination/Pagination';
import productEntry from './AddEmployee.module.scss';
import AddEmployeTable from './AddEmployeTable';
import { textInput } from './employeeInput';
import useAddEmployee from './useAddEmployee';

const AddEmployee = () => {
  const {productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialProductData, findProduct, setImgHolder, setUploading, uploading, handlePost} = useAddEmployee()

    return (
        <div className={`${productEntry.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${productEntry.inputAreaOne} flex_center`}>
              <div className={`${productEntry.container} `}>
                    <div className={`${productEntry.titleName}`}>{edit ? 'Update Employee' : 'Add Employee'}</div>
                    <div style={{width: `${edit ? '135px' : '120px'}`}}  className={`${productEntry.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            {
                              textInput?.slice(0,7).map((input, index) => {
                                return (
                                  <div key={index+1} className={`${productEntry.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input value={productData[input.name]}   type={input.type} 
                                        onChange={(e) => {setProductData({...productData, [input.value]: e.target.value})}}
                                        required
                                    />
                                </div>
                                )
                              })
                            }
                            <div className={`${productEntry.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${productEntry.inputAreaOne_footer} flex_right`}>
                              <div className={`${productEntry.inputAreaOne_footer_container} flex_around`}>
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
                                  }} className={`commonButton btnColor_green`}>SUBMIT</button>
                                  }
                                  {
                                    edit
                                    ? 
                                    <button onClick={(e) => {
                                      e.preventDefault()
                                      setEdit('')
                                      setImgHolder('')
                                      setProductData(initialProductData)
                                    } } className={`commonButton btnColor_red`}>CANCEL</button>
                                    :
                                    <button onClick={(e) => {
                                      e.preventDefault();
                                      setShowData([]);
                                      setProductData(initialProductData)
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
            <div className={`${productEntry.inputAreaTwo} flex_center`}>
              <div className={`${productEntry.container} `}>
                    <div className={`${productEntry.titleName} flex_center`}>{edit ? 'Update Image' : 'Upload Image'}</div>
                    <div style={{width: '120px'}} className={`${productEntry.border_remover}`}></div>
                        <div className={`${productEntry.inputAreaTwoContainer}`}>
                          {edit ? (findProduct?.img !== 'not added' ? <img height={125} width={125} src={findProduct?.img} alt="" /> : <i className="uil uil-image-slash"></i>) : <i className="uil uil-image-upload"></i> }
                              {
                                    textInput?.slice(7,8).map((input, index) => {
                                      return (
                                        <div key={index+1} className={`${productEntry.inputFields}`}>
                                        
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

                              <div className={`${productEntry.uploading}`}>
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