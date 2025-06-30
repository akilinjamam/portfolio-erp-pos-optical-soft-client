/* eslint-disable react/prop-types */
// import moment from 'moment-timezone';
import '../../../../global_style/global_style.css'

import CommonLoading from '../../../commonLoagin/CommonLoading';

/* {moment.utc(sale?.createdAt).tz("Asia/Dhaka").format("YYYY-MM-DD hh:mm:ss A")} */
const SoldProductTable = ({ paginatedDataContainer, isLoading, totalSaleQuantity}) => {
    
   

    if(isLoading){
        return (
        <div className='flex_center' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
        </div>
    )
    }

    return (
        <div >
            <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px',  fontFamily: "'DM Sans', sans-serif"}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sold Quantity =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSaleQuantity}</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                    </tr>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Product Name</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Quantity</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Category</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Frame Type</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Material</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Size</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Shape</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Barcode</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Purchase Price</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sales Price</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Profit</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sales By</th>
                        
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedDataContainer?.map((sale, index) => (
                        <tr style={{color: `${sale?.barcode === 'blank' ? 'red' : 'black'}`}} key={index+1}>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.indexId ? sale?.indexId : index+1}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.productName}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.quantity}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.category}</td>
                            
                            <td style={{border:'1px solid #dddddd',textAlign:'left', width:'120px'}}>{sale?.frameType}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.material}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left', width:'250px'}}>
                                {sale?.size}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                {sale?.shape}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.barcode === 'blank' ? 'Manual Sale Product' : sale?.barcode}</td>
                           
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.purchasePrice}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.actualSalesPrice}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.actualSalesPrice - sale?.purchasePrice}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.recorderName}</td>
                            
                        </tr>
                    ))
                }
                
               
                </tbody>
            </table>
        </div>
    );
};

export default SoldProductTable;