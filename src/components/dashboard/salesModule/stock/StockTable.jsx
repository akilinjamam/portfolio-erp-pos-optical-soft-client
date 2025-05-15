/* eslint-disable react/prop-types */
const StockTable = ({paginatedDataContainer, stockTotalInfo}) => {

    

    return (
        <div>
            <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
            <thead>
                <tr>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Total Stock =</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{stockTotalInfo?.totalStockAmount}</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Available Stock =</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{stockTotalInfo?.availableQuantity}</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Sold Product =</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>{stockTotalInfo?.stockOut}</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}></th>
                </tr>
                <tr>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Product Name</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Price</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Quantity</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Category</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Date</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Size</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Material</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Frame Type</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Shape</th>
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
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                    <p>Total: {product?.stockAmount}</p>
                                    <p>Available: {product?.quantity}</p>
                                    <p>Stockout: {Number(product?.stockAmount) - Number(product?.quantity)}</p>
                                    <p>Last Stockout Date: {product?.updatedAt?.slice(0,10)}</p>

                                </td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.category}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.createdAt?.slice(0,10)}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.size}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.material}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.frameType}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{product?.shape}</td>
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

export default StockTable;