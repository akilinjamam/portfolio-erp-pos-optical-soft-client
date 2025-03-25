/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';


const CustomerListTable = ({ paginatedDataContainer, isLoading}) => {

    if(isLoading){
        return (
        <div className='flex_center' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
        </div>
    )
    }

    return (
        <div  style={{marginTop:'10px'}} >
           <table style={{borderCollapse:'collapse' ,fontSize:'13.5px', margin:'auto', paddingBottom:'10px', width:'99%'}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>SL</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Customer Name</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>Customer Phone</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Customer Address</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Invoice Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedDataContainer?.map((list, index) => {
                            const {indexId, customerName, phoneNumber, address, invoiceBarcode} = list || {}
                            return (
                                <tr key={index+1}>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{indexId}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{customerName}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left',paddingLeft:'5px'}}>{phoneNumber}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{address}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{invoiceBarcode}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
           </table>
        </div>
    );
};

export default CustomerListTable;