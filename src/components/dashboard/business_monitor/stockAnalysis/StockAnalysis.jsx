// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import stockAnalysis from './StockAnalysis.module.scss';


import CommonLoading from '../../../commonLoagin/CommonLoading';
import { useDispatch } from 'react-redux';
import { addStockAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';
import { useEffect, useState } from 'react';
import StockAnalysisChart from './StockAnalysisChart';
import useProductData from '../../../../data/productData/useProductData';
import { calculateTotalPrice } from '../../../calculation/calculateSum';

const StockAnalysis = () => {

    
    const {products, refetch, isLoading} = useProductData('', '', '', '', '')
    const analysisData = products?.result
    
    const categoryCount = analysisData?.reduce((acc, item) => {
    acc[item?.category] = (acc[item?.category] || 0) + Number(item?.quantity);
    return acc;
    }, {});

    const [month, setMonth] = useState('Optical Frame');
  
    const findByCategory = products?.result?.filter(item => item?.category === month)

  useEffect(() => {
    refetch
  },[refetch, month])

  const dispatch = useDispatch();


  const categoryWiseAvailableQuantity = calculateTotalPrice(findByCategory?.map(item => Number(item?.quantity)))
   
  const categoryWiseTotalQuantity = calculateTotalPrice(findByCategory?.map(item => Number(item?.stockAmount)))
  const categoryWiseStockOunt = calculateTotalPrice(findByCategory?.map(item => Number(item?.stockAmount))) - calculateTotalPrice(findByCategory?.map(item => Number(item?.quantity)))



  if (isLoading) {
    return <CommonLoading />
  }

  return (
    <div className={`${stockAnalysis.main} full_width`}>
      <div style={{ display: 'flex' }} className={`flex_around`}>
        <div className={`${stockAnalysis.inputAreaOne} flex_center`}>
          <div className={`${stockAnalysis.container} `}>
            <div className={`${stockAnalysis.titleName}`}>Profit Category Analysis</div>
            <div style={{ width: '193px' }} className={`${stockAnalysis.border_remover} `}></div>

            <form action="">
              <div className='flex_top'>

                <div style={{ width: '100%', fontSize:'13px', padding:'10px 0' }}>
                    <label style={{marginRight:'5px'}} htmlFor="">Find By Category: </label>
                    <select name="" id="" onChange={(e) => setMonth(e.target.value)}>
                       {
                            Object.keys(categoryCount).map((item, index) => {
                                return (
                                    <option key={index+1} value={item}>{item}</option>
                                )
                            })
                       }
                    </select>
                </div>
              </div>

              <div className={`${stockAnalysis.inputAreaOne_footer} flex_right`}>
                <div className={`${stockAnalysis.inputAreaOne_footer_container} flex_around`}>

                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={`${stockAnalysis.inputAreaTwo} flex_center`}>
          <div className={`${stockAnalysis.container} `}>
            <div className={`${stockAnalysis.titleName} flex_center`}>Details</div>
              <div style={{ width: '65px' }} className={`${stockAnalysis.border_remover}`}></div>
            
              <div className={`${stockAnalysis.inputAreaTwoContainer}`}>
                  <h4>Category wish Stock</h4>
                  <br />
                  <p>Total: {categoryWiseTotalQuantity}</p>
                  <p>Available: {categoryWiseAvailableQuantity}</p>
                  <p>sockout: {categoryWiseStockOunt}</p>
                 
              <div className={`${stockAnalysis.uploading}`}>

              </div>

            </div>
          </div>
        </div>
      </div>
      <section className={`${stockAnalysis.navigationIcon} flex_between`}>
        {
          <div className={`${stockAnalysis.inputPart} flex_left`}>
            <i title="print" className="uil uil-print" onClick={() => {
              dispatch(openModal('stock-analysis'))
              dispatch(addStockAnalysis({data:analysisData, categoryWishStockDetail: {categoryWiseAvailableQuantity, categoryWiseTotalQuantity, categoryWiseStockOunt, categoryName: month}}))
            }}></i>


          </div>
        }

      </section>
      <section className={`${stockAnalysis.navigationIcon} only_flex`}>


      </section>
      <section className={`${stockAnalysis.tableArea}`}>
        <StockAnalysisChart analysisData={analysisData} categoryWiseAvailableQuantity={categoryWiseAvailableQuantity} categoryWiseTotalQuantity={categoryWiseTotalQuantity} categoryWiseStockOunt={categoryWiseStockOunt} categoryName={month}/>
      </section>

    </div>
  );
};

export default StockAnalysis;