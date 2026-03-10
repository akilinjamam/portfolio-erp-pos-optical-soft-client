/* eslint-disable react/prop-types */
import Pagination from "../../pagination/Pagination";
import branchList from './BranchList.module.scss';

import useBranchList from "./useBranchList";
import { textInput } from "../AddBranches/branchInput";
import BranchListTable from "./BranchListTable";
const BranchList = ({hideField, hideSection}) => {
    const {paginatedDataContainer,isLoading,setPaginatedDataContainer, setPaginatedIndex, updateBranchData, setUdpateBranchData,edit,setEdit,editProduct, initialBranchData,   modifiedEmployeeDataWithIndexId,  setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, deleteProducts} = useBranchList();
    const employeeData = modifiedEmployeeDataWithIndexId

  

    return (
        <div  className={`${branchList.main} full_width`}>
             <div style={{display:`${hideSection ? 'none': 'flex'}`, flexWrap: "wrap"}}  className={`flex_around`}>
                <div className={`${branchList.inputAreaOne} flex_center`}>
                  <div className={`${branchList.container} `}>
                        <div className={`${branchList.titleName}`}>Branch Update</div>
                        <div style={{width: '150px' }}  className={`${branchList.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              <div style={{width:'49%'}}>
                                {
                                  textInput?.map((input, index) => {
                                    return (
                                      <div key={index+1} className={`${branchList.inputFields} flex_between`}>
                                        <label htmlFor="">{input.placeholder}:</label>
                                        <input placeholder={input.placeholder} value={updateBranchData[input?.value]}    type={input.type} 
                                            onChange={(e) => {setUdpateBranchData({...updateBranchData, [input.value]: e.target.value})}}
                                            required
                                        />
                                    </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${branchList.inputAreaOne_footer} flex_right`}>
                                  <div className={`${branchList.inputAreaOne_footer_container} flex_around`}>                                            
                                        {edit ? <button onClick={editProduct}  className={`commonButton btnColor_green`}>SAVE</button> : ''}

                                        {edit ? <button onClick={() => {
                                          setUdpateBranchData(initialBranchData)
                                          setEdit('')
                                        }}  className={`commonButton btnColor_red`}>CANCEL</button> : ''}  

                                        { idsForDelete?.length > 0 ?  <button onClick={deleteProducts} style={{backgroundColor:'red', color:'white', border:'none', padding:'3px', borderRadius:'5px', width:'auto', cursor:'pointer'}} className="">DELETE {`(${idsForDelete?.length})`} </button> : '' }          
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
               
              </div>
       
          <section className={`${branchList.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '32vh'}}  className={`${branchList.tableArea}`}>
              <BranchListTable idsForDelete={idsForDelete} setIdsForDelete={setIdsForDelete} selectDeleted={selectDeleted} setSelectDeleted={setSelectDeleted} isLoading={isLoading} paginatedDataContainer={paginatedDataContainer} setEdit={setEdit} edit={edit} showData={employeeData} hideField={hideField} />
          </section>
           {
            !isLoading
            &&
            <Pagination showData={employeeData} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10}/>
           }      
        </div>
    );
};

export default BranchList;