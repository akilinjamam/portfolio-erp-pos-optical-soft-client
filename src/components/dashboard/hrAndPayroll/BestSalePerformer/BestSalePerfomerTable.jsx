/* eslint-disable react/prop-types */
import '../../../../global_style/global_style.css'
import CommonLoading from '../../../commonLoagin/CommonLoading';


const BestSalePerformerTable = ({contentToPrint, paginatedDataContainer, isLoading, totalSalesValue}) => {
    

    if(isLoading){
        return (
        <div className='flex_center' style={{width:'100%', height:'500px'}}>
            <CommonLoading/>
        </div>
    )
    }

    return (
        <div ref={contentToPrint}>
            <table style={{borderCollapse:'collapse', fontSize:'12.5px', margin:'auto', paddingBottom:'10px'}}>
                <thead>
                    
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sales By</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sales Amount</th>
                       
                       
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedDataContainer?.map((sale, index) => (
                        <tr key={index+1}>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.indexId ? sale?.indexId : index+1}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.salesBy}</td>
                            <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{sale?.totalSale}</td>
                        </tr>
                    ))
                }
                
                <tr style={{fontWeight:'bold'}}>
                    
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}></td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Sales =</td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left'}}>{totalSalesValue}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BestSalePerformerTable;