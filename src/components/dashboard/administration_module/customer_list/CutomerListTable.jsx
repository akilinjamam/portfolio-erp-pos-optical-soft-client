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
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Total Sales</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Paid</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Due</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Discount</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Sph<i className="uil uil-times"></i>Cyl<i className="uil uil-times"></i>Axis</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedDataContainer?.map((list, index) => {
                            const {indexId, customerName, phoneNumber, address, invoiceBarcode, products, advance, discount,leftSph, leftCyl, leftAxis, rightSph, rightCyl, rightAxis, leftNear, rightNear } = list || {}
                            return (
                                <tr key={index+1}>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{indexId}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{customerName}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left',paddingLeft:'5px'}}>{phoneNumber}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{address}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{invoiceBarcode}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                                        {
                                            products?.map((product) => {
                                                return Number(product?.quantity) * Number(product?.actualSalesPrice)
                                            })?.reduce((acc, curr) => acc + curr, 0)
                                        }
                                    </td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{advance}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                                        {
                                            products?.map((product) => {
                                                return Number(product?.quantity) * Number(product?.actualSalesPrice)
                                            })?.reduce((acc, curr) => acc + curr, 0) - advance
                                        }
                                    </td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{discount}</td>
                                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                                        <div>
                                            <p>R: {rightSph === 'blank' ? '0' : rightSph} <i className="uil uil-times"></i> {rightCyl === 'blank' ? '0' : rightCyl} <i className="uil uil-times"></i> {rightAxis === 'blank' ? '0' : rightAxis}</p>
                                            <p>L: {leftSph === 'blank' ? '0' : leftSph} <i className="uil uil-times"></i> {leftCyl === 'blank' ? '0' : leftCyl} <i className="uil uil-times"></i> {leftAxis === 'blank' ? '0' : leftAxis}</p>
                                            <p>Near: {rightNear === 'blank' ? '0' : rightNear} <i className="uil uil-times"></i> {leftNear === 'blank' ? '0' : leftNear} </p>
                                        </div>
                                    </td>
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