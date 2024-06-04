// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import DashboardFooter from "../../dashboard_footer/DashboardFooter";
import Pagination from "../../pagination/Pagination";
import { optionField, textInput } from "../product_entry/productInput";
import productList from './ProductList.module.scss';
import ProductListTable from "./ProductListTable";
import useProductList from "./useProductList";
const ProductList = () => {
    const {paginatedDataContainer,products,isLoading, setPaginatedDataContainer, setPaginatedIndex, paginatedIndex, updateProductData, setUdpateProductData,edit,setEdit,editProduct, initialProductData, uploading, setUploading,setImgHolder, imgHolder} = useProductList();
    const productData = products?.result;
  
    return (
        <div  className={`${productList.main} full_width`}>
             <div  className={`flex_around`}>
            <div className={`${productList.inputAreaOne} flex_center`}>
              <div className={`${productList.container} `}>
                    <div className={`${productList.titleName}`}>Product Update</div>
                    <div style={{width: '135px' }}  className={`${productList.border_remover} `}></div>

                  <form action="">
                        <div className='flex_top'>
                          <div style={{width:'49%'}}>
                            {
                              textInput?.slice(0,5).map((input, index) => {
                                return (
                                  <div key={index+1} className={`${productList.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input value={updateProductData[input?.value]}    type={input.type} 
                                        onChange={(e) => {setUdpateProductData({...updateProductData, [input.value]: e.target.value})}}
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
                                <div key={index+1} className={`${productList.inputFields} flex_between`} >
                                      <label htmlFor="">{select?.placeholder}:</label>
                                      <select value={updateProductData[select?.variable]}  name="" id="" 
                                      onChange={(e) => {setUdpateProductData({...productData, [select?.variable] : e.target.value})}}
                                      required
                                      >
                                        <option value="">{select?.placeholder}</option>
                                        {
                                          Object.keys(select?.options).map((objectKey, objectIndex) => (
                                            <option value={select?.options[objectKey]} key={objectIndex}>
                                              {select?.options[objectKey]}
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
                  
                        <div className={`${productList.inputAreaOne_footer} flex_right`}>
                              <div className={`${productList.inputAreaOne_footer_container} flex_around`}>                                            
                                    {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}
                                    {edit ? <button onClick={() => {
                                      setUdpateProductData(initialProductData)
                                      setEdit('')
                                    }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}            
                              </div>
                        </div>
                  </form>
              </div>
            </div>
            <div className={`${productList.inputAreaTwo} flex_center`}>
              <div className={`${productList.container} `}>
                    <div className={`${productList.titleName} flex_center`}>Update Image</div>
                    <div style={{width: '120px'}} className={`${productList.border_remover}`}></div>
                        <div className={`${productList.inputAreaTwoContainer}`}>
                        {updateProductData?.img ? <img height={125} width={125} src={imgHolder ? imgHolder : updateProductData?.img} alt="" /> :  <i className="uil uil-image-upload"></i> }
                              {
                                    textInput?.slice(5,6).map((input, index) => {
                                      return (
                                        <div key={index+1} className={`${productList.inputFields}`}>
                                        
                                          {
                                            edit 
                                            ?
                                            <input className='custom-file-input'  type={input?.type} 
                                              onChange={(e) => {
                                                const img = e.target.files[0];
                                               updloadCloudinaryImage(img,setImgHolder,setUploading)
                                                
                                              }
                                          }
                                          />
                                          :
                                          ''
                                          }
                                      </div>
                                      )
                                    })
                              }

                              <div className={`${productList.uploading}`}>
                                  {uploading ? 'uploading...' : ''}
                              </div>
                              
                        </div>
              </div>
            </div>
          </div>
            <ProductListTable isLoading={isLoading} paginatedIndex={paginatedIndex} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={productData}/>
           {
            !isLoading 
            &&
            <Pagination showData={productData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
           }
            <DashboardFooter/>
        </div>
    );
};

export default ProductList;