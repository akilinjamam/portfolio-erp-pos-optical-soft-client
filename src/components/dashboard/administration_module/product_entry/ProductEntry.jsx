import '../../../../global_style/global_style.css'
import { updloadCloudinaryImage } from '../../../uploadCloudinaryImg';
import Pagination from '../../pagination/Pagination';
import productEntry from './ProductEntry.module.scss';
import ProductTable from './ProductTable';
import { optionField, textInput } from './productInput';
import useProductEntry from './useProductEntry';

const ProductEntry = () => {
  const {productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, category, setCategory, handleSubmit, initialProductData, findProduct, setImgHolder, setUploading, uploading, handlePost, allEmployess, allSuppliers} = useProductEntry();

    return (
        <div className={`${productEntry.main} full_width`}>
          <div  className={`flex_around`}>
            <div className={`${productEntry.inputAreaOne} flex_center`}>
              <div className={`${productEntry.container} `}>
                    <div className={`${productEntry.titleName}`}>{edit ? 'Product Update' : 'Product Entry'}</div>
                    <div style={{width: `${edit ? '135px' : '120px'}`}}  className={`${productEntry.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                        <div className='flex_top'>
                          <div style={{width:'49%'}}>
                            <div className={`${productEntry.inputFields} flex_between`}>
                                    <label htmlFor="">Supplier Name:</label>
                                    <select value={productData?.supplierName} name="" id="" onChange={(e) => {setProductData({...productData, supplierName: e.target.value})}}  required>
                                        <option value="">Select Supplier Name</option>
                                        {
                                          allSuppliers?.map((employee, index) => {
                                            return (
                                              <option key={index+1} value={employee?.employeeName}>{employee?.supplierName}</option>
                                            )
                                          })
                                        }
                                    </select>         
                            </div>
                            <div className={`${productEntry.inputFields} flex_between`}>
                                    <label htmlFor="">Collector Name:</label>
                                    <select value={productData?.collectorName} name="" id="" onChange={(e) => {setProductData({...productData, collectorName: e.target.value})}} required>
                                    <option value="">Select Collector Name</option>
                                        {
                                          allEmployess?.map((employee, index) => {
                                            return (
                                              <option key={index+1} value={employee?.employeeName}>{employee?.employeeName}</option>
                                            )
                                          })
                                        }
                                    </select>         
                            </div>

                            {
                              textInput?.slice(2,6).map((input, index) => {
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
                            <label htmlFor="">Categories:</label>
                            <select value={category} style={{width: '70%'}} name="" id="" required 
                            onChange={(e) => setCategory(e.target.value)}
                            >
                              <option value="">select category</option>
                              {
                                textInput[6].options?.map((option, index) => (
                                  <option key={index+1} value={option}>{option}</option>
                                ))
                              }
                            </select>
                            </div>
                          </div>
                          <div style={{width:'49%', marginLeft:'15px'}}>
                            { category === 'Optical Frame' &&
                              optionField.map((select, index) => {
                                return (
                                <div key={index+1} className={`${productEntry.inputFields} flex_between`} >
                                      <label htmlFor="">{select.placeholder}:</label>
                                      <select name="" id="" value={productData[select.variable]}
                                      onChange={(e) => {setProductData({...productData, [select.variable] : e.target.value})}}
                                      required
                                      >
                                        <option value="">{select.placeholder}</option>
                                        {
                                          Object.keys(select.options).map((objectKey, objectIndex) => (
                                            <option value={select.options[objectKey]} key={objectIndex}>
                                              {select.options[objectKey]}
                                            </option>
                                          ))
                                        }
                                      </select>
                                </div>
                                )
                              })
                            }
                            { category === 'Glass'
                              &&
                              textInput?.slice(8,9).map((input, index) => {
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
                                      setCategory('')
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
            <ProductTable setShowData={setShowData} showData={showData} paginatedDataContainer={paginatedDataContainer} paginatedIndex={paginatedIndex} setEdit={setEdit} edit={edit}/>
            <Pagination showData={showData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
        </div>
    );
};

export default ProductEntry;