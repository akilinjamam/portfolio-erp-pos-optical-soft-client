/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import manageSales from './ManageSales.module.scss';
 
const ManageSaleTable = ({paginatedDataContainer, isLoading, setEdit, edit, showData, setSelectDeleted,selectDeleted,idsForDelete, setIdsForDelete,setUpdateProductData, productId, setProductId, setSaleId, selectProduct, setSelectProduct}) => {

  console.log(productId);

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
  
  const handleProduct = (id, productid) => {

    const findSales = data?.find(f => f?._id === id)?.products?.find(f => f?.id === productid);
    const productInfo = {
      productName: findSales?.productName,
      quantity: findSales?.quantity,
      actualSalesPrice: findSales?.actualSalesPrice
    }
    setSaleId(id)
    setProductId(productid)
    setUpdateProductData(productInfo)
    console.log(productid)
  }

if(isLoading){
    return <CommonLoading/>
}

    return (
       <div className={manageSales.table_responsive}>
         <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px', }}>
          
          <thead>
              <tr>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>SL</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Customer Name</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Phone Number</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Date</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Reffered By</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>products</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Sales Price</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Total Paid</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Discount</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Due</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Delivery Status</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Payment Status</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Sold By</th>
                  <th style={{border:'1px solid #dddddd',textAlign:'center'}}>Invoice Number</th>
                  <th>Action</th>
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
                      <td style={{border:'1px solid #dddddd',textAlign:'center'}}>
                      <div style={{maxWidth:"100px"}}>
                      {data?.customerName} 
                      </div>  
                      </td>
                      
                      <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.phoneNumber}</td>
                      <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.createdAt?.slice(0,10)}</td>
                      <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.referredBy}</td>
                      <td style={{border:'1px solid #dddddd',textAlign:'left', width:'250px'}}>
                                  {data?.products?.map((item, index) => <p onClick={() => {
                                    setProductId(item?._id)
                                    setSelectProduct(item?._id)
                                    handleProduct(data?._id,item?.id)

                                  }} style={{backgroundColor: `${selectProduct === item?._id ? 'lightgreen': ''}`, cursor:'pointer'}} key={index+1}>{index+1}. {item?.productName} ({item?.quantity} <i className='uil uil-times'></i> {item?.actualSalesPrice}) = {item?.quantity * item?.actualSalesPrice} </p> )
                                  }
                              </td>
                          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                              {calculateTotalPrice(data?.products?.map(item => item?.quantity * item?.actualSalesPrice))}
                          </td>
                          <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.advance}</td>
                          <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.discount}</td>
                          <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{calculateTotalPrice(data?.products?.map(item => item?.quantity * item?.actualSalesPrice))- Number(data?.advance) - Number(data?.discount)}</td>
                          <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.delivered}</td>
                          <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.paymentMethod}</td>
                          <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.recorderName}</td>
                          <td style={{border:'1px solid #dddddd',textAlign:'center'}}>{data?.invoiceBarcode}</td>
                      <td  className={`flex_around`}>
                      
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

export default ManageSaleTable;