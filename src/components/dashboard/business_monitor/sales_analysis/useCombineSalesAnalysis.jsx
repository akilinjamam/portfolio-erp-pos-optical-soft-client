import { useEffect } from "react";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import useGetAccountsData from "../../../../data/accountsData/useGetAccountsData";

const useCombineSalesAnalysis = (query, month ) => {

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
              const firstInstallment = sale?.paymentHistory?.split('+')?.[1];
              const secondInstallment = sale?.paymentHistory?.split('+')?.[2];
              const discount = sale?.discount;

    
              if(!acc[date]){
                acc[date] = { sales: 0, totalAdvance: 0, totalDue: 0, firstInstallment: 0, secondInstallment: 0, discount: 0 };
              }
    
              console.log(totalSale)
          
              acc[date].sales += totalSale;
              acc[date].totalAdvance += totalAdvance;
              acc[date].totalDue += totalDue;
              acc[date].firstInstallment += Number(firstInstallment) || 0;
              acc[date].secondInstallment += Number(secondInstallment) || 0;
              acc[date].discount += Number(discount) || 0;
              
              return acc;
            }, {});
           
           
            return Object?.entries(salesByDate)?.map(([date, data]) => ({
              date,
              ...data
            }));
        };
        
        console.log(formatSalesData(saleData?.result))
        const accumulatedSalesInfo =formatSalesData(saleData?.result);
        const year = month.split('-')?.[0]
        const singleMonth = month.split('-')?.[1]
       
        const {accountsData} = useGetAccountsData(year, singleMonth, '');

        const totalExpenseData = accountsData?.result?.map(item => {

            const expense = item?.expenses?.map(expense => {
                return (
                    {
                        expenseName: expense?.expenseName,
                        expenseAmount: expense?.expenseAmount
                    }
                )
            })

            return (
                {
                    date: item?.date,
                    expenses: expense
                }
            )
        })

        console.log(totalExpenseData)

        return {accumulatedSalesInfo, isLoading, refetch, saleData}
    
};

// const thirdArray = [
//   {
//     date: '2025-03-17',
//     totalPaid: '20000'
//   },
//   {
//     date: '2025-03-20',
//     totalPaid: '30000'
//   },
//   {
//     date: '2025-03-26',
//     totalPaid: '40000'
//   }
// ]


export default useCombineSalesAnalysis;