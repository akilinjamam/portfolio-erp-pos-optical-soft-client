/* eslint-disable react/prop-types */
const GlassStockTable = ({paginatedDataContainer}) => {

    return (
        <div>
            <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
            <thead>
                <tr>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Product Name</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Price</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Quantity</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Category</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Date</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Power</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sph</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Cyl</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Axis</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Barcode</th>
                </tr>
            </thead>
            <tbody>
                {
                    paginatedDataContainer?.map((product, index) => {
                        return (
                            <tr key={product?.indexId}>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left',}}>{product?.indexId ? product?.indexId : (index+1) }</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left', width:'150px'}}>{product?.productName}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.salesPrice}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.quantity}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.category}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.createdAt?.slice(0,10)}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.power}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.sph}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.cyl}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.axis}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.barcode}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    );
};

export default GlassStockTable;