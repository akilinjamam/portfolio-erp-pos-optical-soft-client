/* eslint-disable react/prop-types */
import productList from "./GlassList.module.scss";

const FilterOption = ({setQuery, query, productData,setStocks, fullScr,handlBarcode, handlePrint, contentToPrint,setFullScr, range, setRange}) => {
    return (
         <div>
            <section className={`${productList.navigationIcon} flex_between`}>
                { 
                    <div className={productList.inputPart}>
                    
                        <span>Total Products : {productData?.length}</span>
                        <input type="text" name="query" id="" value={query} placeholder="search" onChange={(e) => setQuery(e.target.value)} />
                        <i onClick={() => setQuery('')} className="uil uil-times"></i>

                        <select name="" id="" onChange={(e) => {
                            if(e.target.value === 'true' || e.target.value === 'false'){
                            setStocks(e.target.value === 'true')
                            }
                            if(e.target.value === ''){
                            setStocks('')
                            }
                        } }>
                            <option value="">stock-in & stock-out</option>
                            <option value="true">stock-in</option>
                            <option value="false">stock-out</option>
                        </select>
                    </div>
                }
                <div className={productList.btnPart}>
                    {fullScr ? <i title="barcode" onClick={handlBarcode} className="uil uil-qrcode-scan"></i> : ''}
                    {fullScr ? <i onClick={() => {handlePrint(null, () => contentToPrint.current)}} title="print" className="uil uil-print"></i> : ''}
                    { fullScr ? <i title="exit full screen" onClick={() => setFullScr(false)} className="uil uil-compress-arrows"></i> : <i title="full screen" onClick={() => setFullScr(true)} className="uil uil-expand-arrows-alt"></i>}
                </div>
            </section>
            <section className={`${productList.navigationIconRes} flex_between`}>
                { 
                    <div className={productList.inputPart}>
                        
                        <p>Total Products : {productData?.length}</p>
                        <input type="text" name="query" id="" value={query} placeholder="search" onChange={(e) => setQuery(e.target.value)} />
                        <i onClick={() => setQuery('')} className="uil uil-times"></i>

                        <select name="" id="" onChange={(e) => {
                            if(e.target.value === 'true' || e.target.value === 'false'){
                            setStocks(e.target.value === 'true')
                            }
                            if(e.target.value === ''){
                            setStocks('')
                            }
                        } }>
                            <option value="">stock-in & stock-out</option>
                            <option value="true">stock-in</option>
                            <option value="false">stock-out</option>
                        </select>
                    </div>
                }
                
            </section>
             <section className={`${productList.navigationIcon} only_flex`}>
                { 
                  <div className={productList.inputPart}>
                      <label htmlFor="">From: </label>
                      <input value={range.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                      <label htmlFor="">To: </label>
                      <input value={range.to} type="date" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                      <i onClick={() => setRange({from:'', to:''})} className="uil uil-times"></i>
                </div>
                }
                { 
                  <div className={productList.inputPart}>
                      <label htmlFor="">From: </label>
                      <input placeholder="price" value={range.priceFrom} type="text" name="" id="" onChange={(e) => setRange({...range, priceFrom: e.target.value})} style={{padding: '0 2px'}}/>
                      <label htmlFor="">To: </label>
                      <input placeholder="price" value={range.priceTo} type="text" name="" id="" onChange={(e) => setRange({...range, priceTo: e.target.value})} style={{padding: '0 2px'}}/>
                      <i onClick={() => setRange({priceFrom:'', priceTo:''})} className="uil uil-times"></i>
                </div>
                }
                
          </section>
         </div>
    );
};

export default FilterOption;