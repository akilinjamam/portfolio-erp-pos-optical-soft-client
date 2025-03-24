/* eslint-disable react/prop-types */
// import moment from 'moment-timezone';
import '../../../../global_style/global_style.css'
// import { calculateTotalPrice } from '../../../calculation/calculateSum';
import CommonLoading from '../../../commonLoagin/CommonLoading';

/* {moment.utc(sale?.createdAt).tz("Asia/Dhaka").format("YYYY-MM-DD hh:mm:ss A")} */
const CashFlowSummeryTable = ({contentToPrint, paginatedDataContainer, isLoading, tableScroll}) => {
    
    console.log(paginatedDataContainer)

    if(isLoading){
        return (
        <div className='flex_center' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
        </div>
    )
    }

    return (
        <div style={{ overflowX: `${ tableScroll ? 'scroll' : '' }`, width: "100%" }} ref={contentToPrint}>
            <table style={{borderCollapse:'collapse', fontSize:'12.5px', margin:'auto', paddingBottom:'10px', width:`${tableScroll ? '1000px' : '99%'}`}}>
                <thead style={{position:'sticky', top:'0', backgroundColor:'#f1f1f1'}}>
                    {/* <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sales =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Cash =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bank =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bkash =</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Nogod =</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                    </tr> */}
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Date</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sales</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Cash Collection</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Cash Due Collection</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Due</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Discount</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Cash Expenses</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Fixed Expenses</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Payroll Expenses</th>
                       
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Vendor Expenses</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Begining Cash</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Ending Cash</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Bank Deposit</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Card/bkash/nogod</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Extra Profit Amount</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Deficit/Cash Over</th>
                        
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Profit Allocation</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedDataContainer?.map((sale, index) => (
                        <tr key={index+1}>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{index+1}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.date}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.sales}</td>
                            
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.cashSalesAmount}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.dueCollecction}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                {sale?.totalDue}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                {sale?.discount}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                {sale?.totalExpense}
                            </td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.totalFixedExpense}</td>
                           
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.payrollPaid}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.vendorPaid}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.beginingCash}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.endingCash}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{(sale?.profitAllocation + sale?.cashOver) - sale?.deficit}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.bank}+{sale?.bkash}+{sale?.nogod} = {sale?.bank + sale?.bkash + sale?.nogod}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.extraProfitAmount}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.deficit}/{sale?.cashOver}</td>           
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{(sale?.bank + sale?.bkash + sale?.nogod + (sale?.profitAllocation - sale?.cashOver - sale?.deficit)) - (sale?.totalExpense) -(sale?.totalFixedExpense) -(sale?.payrollPaid) - (sale?.vendorPaid)}</td>
                        </tr>
                    ))
                }
                
                {/* <tr style={{fontWeight:'bold'}}>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    
                </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default CashFlowSummeryTable;