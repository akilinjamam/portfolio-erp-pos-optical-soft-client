import salesAnalysis from './SalesAnalysis.module.scss';
import SalesAnalysisChart from './SalesAnalysisChart';
import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSalesAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';
import useSalesAnalysis from './useSalesAnalysis';

const SalesAnalysis = () => {

  const dispatch = useDispatch();
    const [month, setMonth] = useState('');
   
  
    const {accumulatedSalesInfo, isLoading, saleData} = useSalesAnalysis(month)
    
    const salesGroupeByDate = accumulatedSalesInfo;
   
    
    const highestSale = salesGroupeByDate?.reduce((max, sale) => 
    (sale.sales > max.sales ? sale : max),  { date: "", sales: 0 } 
    );
    const lowestSale = salesGroupeByDate?.reduce((min, sale) =>
    (sale.sales < min.sales ? sale : min), { date: "", sales: Infinity }
    );

    const totalSales = salesGroupeByDate?.reduce((acc, item) => acc + Number(item?.sales), 0);
    const totalPaid = saleData?.result?.reduce((acc, item) => acc + Number(item?.advance), 0);
    const totalDiscount = saleData?.result?.reduce((acc, item) => acc + Number(item?.discount), 0);

    const netSales = totalSales - totalDiscount;
    const totalDue = netSales - totalPaid;


  
     
  if (isLoading) {

      // retu <CommonLoading />
  }
  return (
    <div className={`${salesAnalysis.main} full_width`}>
      <div style={{ display: 'flex' }} className={`flex_around`}>
        <div className={`${salesAnalysis.inputAreaOne} flex_center`}>
          <div className={`${salesAnalysis.container} `}>
            <div className={`${salesAnalysis.titleName}`}>Sales Analysis</div>
            <div style={{ width: '123px' }} className={`${salesAnalysis.border_remover} `}></div>

            <form action="">
              <div className='flex_top'>

                <div style={{ width: '100%', fontSize:'13px', padding:'10px 0' }}>
                    <label style={{marginRight:'5px'}} htmlFor="">Find By Month: </label>
                    <input type="month" name="" id="" onChange={(e) => setMonth(e.target.value)} />
                </div>
              </div>

              <div className={`${salesAnalysis.inputAreaOne_footer} flex_right`}>
                <div className={`${salesAnalysis.inputAreaOne_footer_container} flex_around`}>

                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={`${salesAnalysis.inputAreaTwo} flex_center`}>
          <div className={`${salesAnalysis.container} `}>
            <div className={`${salesAnalysis.titleName} flex_center`}>Details</div>
              <div style={{ width: '65px' }} className={`${salesAnalysis.border_remover}`}></div>
            
              <div className={`${salesAnalysis.inputAreaTwoContainer}`}>
                  
                  <br />
                  <p>Total : {netSales} </p>
                  <p>Paid: {totalPaid}</p>
                  <p>Due: {totalDue}</p>
                 
              <div className={`${salesAnalysis.uploading}`}>

              </div>

            </div>
          </div>
        </div>

      </div>
      <section className={`${salesAnalysis.navigationIcon} flex_between`}>
        {
          <div className={`${salesAnalysis.inputPart} flex_left`}>
            <i title="print" className="uil uil-print" onClick={() => {
              dispatch(openModal('sales-analysis'))
              dispatch(addSalesAnalysis({data:salesGroupeByDate,salesDetail: {highestSale, lowestSale,totalSales, netSales, totalPaid, totalDiscount, totalDue}}))
            }}></i>
          </div>
        }
      </section>
      <section className={`${salesAnalysis.navigationIcon} only_flex`}>
        

      </section>
      <section className={`${salesAnalysis.tableArea}`}>
        <SalesAnalysisChart allSalesPriceData={salesGroupeByDate} highestSale={highestSale} lowestSale={lowestSale} totalSales={totalSales} netSales={netSales} totalDiscount={totalDiscount} totalPaid={totalPaid} totalDue={totalDue}/>
      </section>

    </div>
  );
};

export default SalesAnalysis;