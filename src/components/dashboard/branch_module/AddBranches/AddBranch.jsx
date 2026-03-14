import '../../../../global_style/global_style.css'
import Pagination from '../../pagination/Pagination';
import addBranch from './AddBranch.module.scss';
import useAddBranch from './useAddBranch';
import AddBranchTable from './AddBranchTable';
import { textInput } from './branchInput';

const AddBranch = () => {
  const {branchData, setBranchData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialBranchData, setImgHolder, setUploading,  handlePost, isPending} = useAddBranch()

    return (
        <div className={`${addBranch.main} full_width`}>
          <div style={{flexWrap: "wrap"}}  className={`flex_around`}>
            <div className={`${addBranch.inputAreaOne} flex_center`}>
              <div className={`${addBranch.container} `}>
                    <div className={`${addBranch.titleName}`}>{edit ? 'Update Branch' : 'Add Branch'}</div>
                    <div style={{width: `${edit ? '125px' : '100px'}`}}  className={`${addBranch.border_remover} `}></div>

                  <form onSubmit={handleSubmit} action="">
                  <div style={{width:'49%'}}>
                            {
                              textInput?.map((input, index) => {
                                return (
                                  <div key={index+1} className={`${addBranch.inputFields} flex_between`}>
                                    <label htmlFor="">{input.placeholder}:</label>
                                    <input placeholder={input.placeholder} value={branchData[input.name]}   type={input.type} 
                                        onChange={(e) => {setBranchData({...branchData, [input.value]: e.target.value})}}
                                        required
                                    />
                                </div>
                                )
                              })
                            }
                            <div className={`${addBranch.inputFields} flex_between`}>
                            
                            </div>
                          </div>
                  
                        <div className={`${addBranch.inputAreaOne_footer} flex_right`}>
                              <div className={`${addBranch.inputAreaOne_footer_container} flex_around`}>
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
                                      setBranchData(initialBranchData)
                                    } } className={`commonButton btnColor_red`}>CANCEL</button>
                                    :
                                    <button onClick={(e) => {
                                      e.preventDefault();
                                      setShowData([]);
                                      setBranchData(initialBranchData)
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
           
          </div> 
            <AddBranchTable setShowData={setShowData} showData={showData} paginatedDataContainer={paginatedDataContainer} paginatedIndex={paginatedIndex} setEdit={setEdit} edit={edit}/>
            <Pagination showData={showData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex}/>
        </div>
    );
};

export default AddBranch;