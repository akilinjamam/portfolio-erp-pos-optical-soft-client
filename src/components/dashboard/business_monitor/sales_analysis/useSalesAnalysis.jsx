import { useEffect, useState } from "react";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";

const useSalesAnalysis = (month) => {

  const [currentDate, setCurrentDate] = useState(new Date()?.getDate());

    const nextMonth = (month) => {
        if (!month) return ''; 
      
        const [year, mon] = month.split('-').map(Number);
        let newMonth = mon + 1;
        let newYear = year;
      
        if (newMonth > 12) {
          newMonth = 1; 
          newYear += 1;
        }
      
        return `${newYear}-${String(newMonth).padStart(2, '0')}`; // Ensure "01"-"09" format
      };

    const {saleData, isLoading, refetch} = useOneMonthSaleData('', month, nextMonth(month));
   
        useEffect(() => {
          refetch()
        },[refetch, month])
    
      const formatSalesData = (salesData) => {
            if (!salesData || !Array.isArray(salesData)) {
              return []; 
            }
          
            const salesByDate = salesData.reduce((acc, sale) => {
              const date = new Date(sale.createdAt).toISOString().split("T")[0];
              const totalAdvance = Number(sale?.advance) || 0;
              const totalSale = sale.products?.reduce((sum, product) => {
                return sum + (product.actualSalesPrice || 0) * (product.quantity || 0);
              }, 0);
              const totalDue = totalSale - totalAdvance;
    
              if(!acc[date]){
                acc[date] = { sales: 0, totalAdvance: 0, totalDue: 0 };
              }
    
            
          
              acc[date].sales += totalSale;
              acc[date].totalAdvance += totalAdvance;
              acc[date].totalDue += totalDue;
              
              return acc;
            }, {});
           

            let filtered = [];
            
           
            const finalData =  Object?.entries(salesByDate)?.map(([date, data]) => ({
              date,
              ...data
            }));


              if(0 < currentDate && 10 >= currentDate){
                const first = finalData?.filter(date => Number(date?.date?.slice(8,10)) > 0 && Number(date?.date?.slice(8,10)) <= 10)
                filtered = first;
              }
              if(10 < currentDate && 20 >= currentDate){
                  const second = finalData?.filter(date => Number(date?.date?.slice(8,10)) > 10 && Number(date?.date?.slice(8,10)) <= 20)
                  filtered = second
              }
              if(20 < currentDate && 31 >= currentDate){
                  const third = finalData?.filter(date => Number(date?.date?.slice(8,10)) > 20 && Number(date?.date?.slice(8,10)) <= 31)
                  filtered = third
              }
              if(currentDate === 32){
                  const third = finalData?.filter(date => Number(date?.date?.slice(8,10)) > 0 && Number(date?.date?.slice(8,10)) <= 31)
                  filtered = third
              }
              

      return {filtered, finalData}
  };
        
       
        const {filtered, finalData:accumulatedSalesInfo} =formatSalesData(saleData?.result);

        return {accumulatedSalesInfo, isLoading, refetch, saleData, filtered, setCurrentDate}
    
};

export default useSalesAnalysis;