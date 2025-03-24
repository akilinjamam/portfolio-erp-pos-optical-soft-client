import { useEffect } from "react";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import useGetAccountsData from "../../../../data/accountsData/useGetAccountsData";
import useGetAllPayrollData from "../../../../data/payrollData/useGetPayrollData";
import useGetAllVendorData from "../../../../data/vendorData/useGetVendorData";
import useGetFinalAccountsData from "../../../../data/accountsData/useGetFinalAccountsDtaa";

const useCombineSalesAnalysis = (month) => {

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
              const firstInstallment = sale?.paymentHistory?.split('+')?.[1];
              const secondInstallment = sale?.paymentHistory?.split('+')?.[2];
              const discount = sale?.discount;
              const totalDue = totalSale - totalAdvance - discount;
              
              
              if(!acc[date]){
                acc[date] = { sales: 0, totalAdvance: 0, totalDue: 0, firstInstallment: 0, secondInstallment: 0, discount: 0};
              }
              
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
    

      
        const accumulatedSalesInfo =formatSalesData(saleData?.result);
        console.log(accumulatedSalesInfo)
        const year = month.split('-')?.[0]
        const singleMonth = month.split('-')?.[1]
       
        const {accountsData, refetch: refetchAcc} = useGetAccountsData(year, singleMonth, '');
        console.log(accountsData?.result)
        const totalExpenseData = accountsData?.result?.map(item => {

            const expense = item?.expenses?.map(expense => {
                return (
                    {
                        expenseName: expense?.expenseName,
                        expenseAmount: expense?.expenseAmount
                    }
                )
            })
            

            const totalExp = item?.expenses?.reduce((acc, expense) => {
                return acc + Number(expense?.expenseAmount)
            }, 0)

            return (
                {
                    date: item?.date,
                    beginingCash: Number(item?.startingCashReserved),
                    endingCash: Number(item?.endingCashReserved),
                    totalExpense: totalExp,
                    cashSalesAmount: Number(item?.salesAmount),
                    profitAllocation: Number(item?.profitAllocation),
                    dueCollecction: Number(item?.dueSalesAmount),
                    deficit: Number(item?.deficit),
                    cashOver: Number(item?.cashOver),
                    bank: item?.todayBankValue,
                    bkash: item?.todayBkashValue,
                    nogod: item?.todayNogodValue,
                    expenses: expense
                }
            )
        })


        
        const {payroll, refetch:refetchPayroll} = useGetAllPayrollData('', year, singleMonth);

        const formatePayrollData = (payroll) => {
          if (!payroll || !Array.isArray(payroll)) {
            return []; 
          }

          const payrollByDate = payroll?.reduce((acc, pay) => {
            const date = pay?.date;

            if(!acc[date]){
              acc[date] = { paid: 0, incentive: 0, overtime: 0, total: 0};
            }

            acc[date].paid += Number(pay?.paid) || 0;
            acc[date].incentive += Number(pay?.incentive) || 0;
            acc[date].overtime += Number(pay?.overtime) || 0;
            acc[date].total += (Number(pay?.paid) + Number(pay?.incentive) + Number(pay?.overtime) || 0);

            return acc;

          }, {});
          

          return Object?.entries(payrollByDate)?.map(([date, data]) => ({
            date,
            ...data
          }));

        }

        const payrollData = formatePayrollData(payroll?.data?.result?.slice()?.reverse())

       console.log(payrollData)

        const {payroll:vendor, refetch:refetchVendor} = useGetAllVendorData('', year, singleMonth);


        const formateVendorData = (vendor) => {
          if (!vendor || !Array.isArray(vendor)) {
            return []; 
          }

          const payrollByDate = vendor?.reduce((acc, pay) => {
            const date = pay?.paymentDate;
            
            if(!acc[date]){
              acc[date] = { paid: 0};
            }

            acc[date].paid += Number(pay?.paid) || 0;
    
            return acc;

          }, {});
          

          return Object?.entries(payrollByDate)?.map(([date, data]) => ({
            date,
            ...data
          }));

        }
        const vendorData = formateVendorData(vendor?.data?.result?.slice()?.reverse())

        const {finalAccountsData, refetch:refetchFinalAcc} = useGetFinalAccountsData(year, singleMonth);
        console.log(finalAccountsData?.result)

        const fixedExpenseData = finalAccountsData?.result?.map(item => {

            const expense = item?.expenses?.map(expense => {
                return (
                    {
                        expenseName: expense?.expenseName,
                        expenseAmount: expense?.expenseAmount
                    }
                )
            })
            

            const totalExp = item?.expenses?.reduce((acc, expense) => {
                return acc + Number(expense?.expenseAmount)
            }, 0)

            return (
                {
                    date: item?.date,
                    fixedExpense: totalExp,
                    extraProfitAmount: Number(item?.extraProfitAmount),
                    expenses: expense
                }
            )
        })

        console.log(fixedExpenseData)

        const mergeSalesPayrollVendorExpense = (
          accumulatedSalesInfo = [],
          payrollData = [],
          vendorData = [],
          totalExpenseData = [],
          fixedExpenseData = []
        ) => {
          // Collect all unique dates from all datasets
          const allDates = new Set([
            ...accumulatedSalesInfo.map((item) => item.date),
            ...payrollData.map((item) => item.date),
            ...vendorData.map((item) => item.date),
            ...totalExpenseData.map((item) => item.date),
            ...fixedExpenseData.map((item) => item.date)
          ]);
        
          // Convert to sorted array (YYYY-MM-DD format ensures correct sorting)
          const sortedDates = Array.from(allDates).sort();
        
          // Map sorted dates to final merged data structure
          const mergedArray = sortedDates.map((date) => {
            const salesData = accumulatedSalesInfo.find((item) => item.date === date) || {};
            const payroll = payrollData.find((item) => item.date === date) || {};
            const vendor = vendorData.find((item) => item.date === date) || {};
            const expense = totalExpenseData.find((item) => item.date === date) || {};
            const fixedExpense = fixedExpenseData.find((item) => item.date === date) || {};
        
            return {
              date,
              sales: salesData.sales || 0,
              totalAdvance: salesData.totalAdvance || 0,
              totalDue: salesData.totalDue || 0,
              firstInstallment: salesData.firstInstallment || 0,
              secondInstallment: salesData.secondInstallment || 0,
              discount: salesData.discount || 0,
        
              payrollPaid: payroll.total || 0,
              incentive: payroll.incentive || 0,
              overtime: payroll.overtime || 0,
              totalPayroll: payroll.total || 0,
        
              vendorPaid: vendor.paid || 0,
        
              totalExpense: expense.totalExpense || 0,
              totalFixedExpense: fixedExpense.fixedExpense || 0,
              extraProfitAmount: fixedExpense.extraProfitAmount || 0,
              expenses: expense.expenses || [],
              beginingCash: expense.beginingCash || 0,
              endingCash: expense.endingCash || 0,
              deficit: expense.deficit || 0,
              cashOver: expense.cashOver || 0,
              profitAllocation: expense.profitAllocation || 0,
              dueCollecction: expense.dueCollecction || 0,
              cashSalesAmount: expense.cashSalesAmount || 0,
              bank: expense.bank || 0,
              bkash: expense.bkash || 0,
              nogod: expense.nogod || 0,
            };
          });
        
          return mergedArray;
        };
        
        
        // Example usage
        const finalMergedData = mergeSalesPayrollVendorExpense(accumulatedSalesInfo, payrollData, vendorData, totalExpenseData, fixedExpenseData);
        console.log(finalMergedData);
        
        return {finalMergedData, isLoading, refetch, refetchAcc, refetchPayroll, refetchVendor, refetchFinalAcc, saleData}
    
};


export default useCombineSalesAnalysis;