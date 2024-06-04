import '../../../../global_style/global_style.css'
import { updloadCloudinaryImage } from '../../../uploadCloudinaryImg';
import DashboardFooter from '../../dashboard_footer/DashboardFooter';
import Pagination from '../../pagination/Pagination';
import productEntry from './ProductEntry.module.scss';
import ProductTable from './ProductTable';
import { optionField, textInput } from './productInput';
import useProductEntry from './useProductEntry';

const ProductEntry = () => {
  const {productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialProductData, findProduct, setImgHolder, setUploading, uploading, handlePost} = useProductEntry();

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
                            {
                              textInput?.slice(0,5).map((input, index) => {
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
                          <div style={{width:'49%', marginLeft:'15px'}}>
                            {
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
                          {edit ? findProduct?.img ? <img height={125} width={125} src={findProduct?.img} alt="" /> : <i className="uil uil-image-slash"></i> : <i className="uil uil-image-upload"></i> }
                              {
                                    textInput?.slice(5,6).map((input, index) => {
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
            <DashboardFooter/>
        </div>
    );
};

export default ProductEntry;