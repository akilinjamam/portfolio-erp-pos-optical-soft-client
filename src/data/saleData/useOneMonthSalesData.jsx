import { useQuery } from "@tanstack/react-query";
import { fetchGetOneMonthSaleData } from "../fetchedData/fetchSaleData";
import { calculateTotalPrice } from "../../components/calculation/calculateSum";


const useOneMonthSaleData = (query, from , to) => {
    const {data:getAllData, refetch, isLoading, error} = useQuery({ queryKey: ['fetchGetOneMonthSalesSaleData'], queryFn: () => fetchGetOneMonthSaleData(query, from, to) })
    const saleData = getAllData

        const totalSales = saleData?.result?.flatMap(sale => sale?.products?.map(item => Number(item?.quantity) * Number(item?.actualSalesPrice)))
        const totalSalesResult = calculateTotalPrice(totalSales)

        const salesQuantity= saleData?.result?.flatMap(sale => sale?.products?.map(item => Number(item?.quantity)))
        const totalSalesQuantity = calculateTotalPrice(salesQuantity)
       
       
        const filterCashSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Cash')
        const filterBankSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Bank')
        const filterBkashSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Bkash')
        const filterNogodSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Nogod')

        const filterCashSalesDue = saleData?.result?.filter(sale => sale?.duePaymentMethod === 'Cash')
        const filterBankSalesDue = saleData?.result?.filter(sale => sale?.duePaymentMethod === 'Bank')
        const filterBkashSalesDue = saleData?.result?.filter(sale => sale?.duePaymentMethod === 'Bkash')
        const filterNogodSalesDue = saleData?.result?.filter(sale => sale?.duePaymentMethod === 'Nogod')
    
        const total = saleData?.result?.map(sale => Number(sale?.advance))

        const totalPaid = calculateTotalPrice(saleData?.result?.map(sale => Number(sale?.advance)))
        const totalDiscount = calculateTotalPrice(saleData?.result?.map(sale => Number(sale?.discount)))
  
   
        const totalSalesItem = saleData?.result?.length;

        const totalCashSales = filterCashSales?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(1,2)))

        const totalBankSales = filterBankSales?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(1,2)))

        const totalBkashSales = filterBkashSales?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(1,2)))

        const totalNogodSales = filterNogodSales?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(1,2)))


        const totalCashSalesDue = filterCashSalesDue?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(2,3)))

        const totalBankSalesDue = filterBankSalesDue?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(2,3)))

        const totalBkashSalesDue = filterBkashSalesDue?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(2,3)))

        const totalNogodSalesDue = filterNogodSalesDue?.map(sale => Number(sale?.paymentHistory?.split('+')?.slice(2,3)))
        
        const totalCashValueSale = calculateTotalPrice(totalCashSales)
        const totalBankValueSale = calculateTotalPrice(totalBankSales)
        const totalBkashValueSale = calculateTotalPrice(totalBkashSales)
        const totalNogodValueSale = calculateTotalPrice(totalNogodSales)
        const totalSalesValue = calculateTotalPrice(total) 

        const totalCashValueDue = calculateTotalPrice(totalCashSalesDue)
        const totalBankValueDue = calculateTotalPrice(totalBankSalesDue)
        const totalBkashValueDue = calculateTotalPrice(totalBkashSalesDue)
        const totalNogodValueDue = calculateTotalPrice(totalNogodSalesDue)
       
        
        const totalCashValue = totalCashValueSale + totalCashValueDue
        const totalBankValue = totalBankValueSale + totalBankValueDue
        const totalBkashValue = totalBkashValueSale + totalBkashValueDue
        const totalNogodValue = totalNogodValueSale + totalNogodValueDue

        console.log(totalCashValueDue)
       
    return { saleData, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesValue,totalPaid, totalSalesResult, totalDiscount, totalSalesItem, totalSalesQuantity, isLoading, error, refetch }
};

export default useOneMonthSaleData;