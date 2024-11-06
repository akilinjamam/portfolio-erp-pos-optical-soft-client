import '../../../../global_style/global_style.css'
import { updloadCloudinaryImage } from '../../../uploadCloudinaryImg';
import Pagination from '../../pagination/Pagination';
import addSupplier from './AddSupplier.module.scss';
import { textInput } from './supplierInput';
import useAddSupplier from './useAddSupplier';
import AddSupplierTable from './AddSupplierTable';

const AddSupplier = () => {
  const {supplierData, setSupplierData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialSupplierData, findSupplier, setImgHolder, setUploading, uploading, handlePost} = useAddSupplier()

    return (
        <div className={`${addSupplier.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${addSupplier.inputAreaOne} flex_center`}>
              <div className={`${addSupplier.container} `}>
                    <div className={`${addSupplier.titleName}`}>{edit ? 'Update Supplier' : 'Add Supplier'}</div>
                    <div style={{width: `${edit ? '135px' : '120px'}`}}  className={`${addSupplier.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            {
                              textInput?.slice(0,3).map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addSupplier.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input value={supplierData[input.name]}   type={input.type} 
                                        onChange={(e) => {setSupplierData({...supplierData, [input.value]: e.target.value})}}
                                        required
                                    />
                                </div>
                                )
                              })
                            }
                            <div className={`${addSupplier.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addSupplier.inputAreaOne_footer} flex_right`}>
                              <div className={`${addSupplier.inputAreaOne_footer_container} flex_around`}>
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
                                      setSupplierData(initialSupplierData)
                                    } } className={`commonButton btnColor_red`}>CANCEL</button>
                                    :
                                    <button onClick={(e) => {
                                      e.preventDefault();
                                      setShowData([]);
                                      setSupplierData(initialSupplierData)
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
            <div className={`${addSupplier.inputAreaTwo} flex_center`}>
              <div className={`${addSupplier.container} `}>
                    <div className={`${addSupplier.titleName} flex_center`}>{edit ? 'Update Image' : 'Upload Image'}</div>
                    <div style={{width: '120px'}} className={`${addSupplier.border_remover}`}></div>
                    <br />
                        <div className={`${addSupplier.inputAreaTwoContainer}`}>
                          {edit ? (findSupplier?.img !== 'not added' ? <img height={125} width={125} src={findSupplier?.img} alt="" /> : <i className="uil uil-image-slash"></i>) : <i className="uil uil-image-upload"></i> }
                              {
                                    textInput?.slice(3,4).map((input, index) => {
                                      return (
                                        <div key={index+1} className={`${addSupplier.inputFields}`}>
                                        
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

                              <div className={`${addSupplier.uploading}`}>
                                  {uploading ? 'uploading...' : ''}
                              </div>
                              
                        </div>

              </div>
            </div>
          </div> 
            <AddSupplierTable setShowData={setShowData} showData={showData} paginatedDataContainer={paginatedDataContainer} paginatedIndex={paginatedIndex} setEdit={setEdit} edit={edit}/>
            <Pagination showData={showData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
        </div>
    );
};

export default AddSupplier;