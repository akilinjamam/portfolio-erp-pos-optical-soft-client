/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';
import vendorlist from './VendorList.module.scss';
 
const VendorListTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete, totalPaid, hideField}) => {


  const data = paginatedDataContainer;
  
  
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
       <div className={vendorlist.table_responsive}>
         <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px',  fontFamily: "'DM Sans', sans-serif"}}>
          
          <thead>
          
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Paid =</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>{totalPaid}</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}></th>
                  <th style={{display: `${hideField ? 'none' : ''}`}}></th>
              </tr>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Supplier Info</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bill Amount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Bill Amount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Billing Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Billing No</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment Info</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payment  & Id</th>
                  <th style={{display: `${hideField ? 'none' : ''}`}}>Action</th>
              </tr>
          </thead>
        <tbody>
          
           {
            data?.map((data, index) => {
              return(
                <tr style={{background: `${(data?._id === edit ? 'lightgray' : '') || (idsForDelete?.find(f => f === data?._id) ? 'rgb(245, 177, 177)' : '')}`}} key={index+1} >
                    <td style={{border:'1px solid #dddddd',textAlign:'center', display:'flex',justifyContent:'space-around'}}>
                      {(selectDeleted) ? <input checked={idsForDelete?.find(f => f === data?._id)} onDoubleClick={handleAllDelete} onClick={(e) =>handleDelete(data?._id, e)} type="checkbox" name="" id="" />: '' }
                      <span>{data?.indexId}</span>
                    </td>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Name: {data?.supplierName?.supplierName}</p>
                      <p>Mobile: {data?.supplierName?.mobile}</p>
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.singleBillAmount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.billAmount}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.billingDate}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.paymentDate}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{data?.billNo}</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Total Paid: {data?.totalPaid}</p>
                      <p>Paid: {data?.paid}</p>
                    </td>

                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Due: {data?.due}</p>
                      <p>Previous Due: {data?.prevDue}</p>
                    </td>

                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                      <p>Payment Method: {data?.paymentMethod}</p>
                      <p>Id: {data?.transectionId}</p>
                    </td>           
                    
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
       </div>
    );
};

export default VendorListTable;