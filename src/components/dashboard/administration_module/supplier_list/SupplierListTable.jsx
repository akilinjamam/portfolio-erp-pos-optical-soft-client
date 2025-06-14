/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import '../../../../global_style/global_style.css'
import { openImg, openModal } from '../../../modal/imgmodal/imgModalSlice';
import CommonLoading from '../../../commonLoagin/CommonLoading';
 
const SupplierListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, hideField}) => {


  const dispatch = useDispatch();

  const handleModal = (img) => {
    dispatch(openModal('img'));
    dispatch(openImg(img))
  }

  const data = paginatedDataContainer
  
  const handleDelete = (id, e) => {
    
    setSelectDeleted(true)
      if(e.target.checked){
        setIdsForDelete((prevId) => [...prevId, id] )
      }else{
        const deleteId =idsForDelete?.filter(f => f !== id)
        setIdsForDelete(deleteId)
      }
    }

  const handleAllDelete = () => {
    const allIds = showData?.map(all => all?._id)
    if(idsForDelete?.length === showData?.length){
     setIdsForDelete([])
    }else{
      setIdsForDelete(allIds)
    }
  }

if(isLoading){
    return <CommonLoading/>
}

    return (
        <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
          
          <thead>
          
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Supplier Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Address</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Mobile</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Image</th>
                  <th style={{display: `${hideField ? 'none' : ''}`}}>Action</th>
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr style={{background: `${(data?._id === edit ? 'lightgray' : '') || (idsForDelete?.find(f => f === data?._id) ? 'rgb(245, 177, 177)' : '')}`}} key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'left', display:'flex',justifyContent:'space-around'}}>
                      {(selectDeleted) ? <input checked={idsForDelete?.find(f => f === data?._id)} onDoubleClick={handleAllDelete} onClick={(e) =>handleDelete(data?._id, e)} type="checkbox" name="" id="" />: '' }
                      <span>{data?.indexId}</span>
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                    <div style={{maxWidth:"100px"}}>
                    {data?.supplierName} 
                    </div>  
                    </td>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.address}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.mobile}</td>
                     <td>{data?.img !== 'not added' ? <img onClick={() => handleModal(data?.img)} style={{display:'block', margin:'auto', borderRadius:'5px', cursor:'pointer'}} height={17} width={17} src={data?.img} alt="" /> : <p style={{textAlign:'left',fontStyle:'italic'}}>blank</p> }</td>
                     <td style={{display: `${hideField ? 'none' : ''}`}}  className={`flex_around`}>
                    
                        <i onClick={() => {
                          setSelectDeleted(!selectDeleted)
                          setEdit('')
                          if(selectDeleted){
                            setIdsForDelete([])
                          }
                        }}  style={{cursor:'pointer'}} className="uil uil-trash-alt btnColor_red_font"></i> 


                      <i onClick={() => {
                        setEdit(data?._id)
                        setSelectDeleted(false)
                        setIdsForDelete([])
                      }} style={{cursor:'pointer'}} className="uil uil-edit btnColor_green_font"></i>
                  </td>
                </tr>
              )
            } )
           }
           
        </tbody>
      </table>
    );
};

export default SupplierListTable;