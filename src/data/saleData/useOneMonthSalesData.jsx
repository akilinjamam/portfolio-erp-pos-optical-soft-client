import { useQuery } from "@tanstack/react-query";
import { fetchGetOneMonthSaleData } from "../fetchedData/fetchSaleData";
import { calculateTotalPrice } from "../../components/calculation/calculateSum";
import { useEffect } from "react";


const useOneMonthSaleData = (query, from , to) => {
    const {data:getAllData, refetch, isLoading, error, isFetching} = useQuery({ queryKey: ['fetchGetOneMonthSalesSaleData'], queryFn: () => fetchGetOneMonthSaleData(query, from, to) })
    const saleData = getAllData
    console.log(saleData)
        useEffect(() => {
            const interval = setInterval(() => {
                fetchGetOneMonthSaleData(query, from , to)
            },300000 )

            return () => clearInterval(interval)
        },[query, from , to]);

        const newAdvanceCash = calculateTotalPrice(saleData?.result?.filter(advance => advance.advancePymentMethod === 'Cash')?.map(total => total.advancePayment))
        const newCashDue = calculateTotalPrice(saleData?.result?.map(advance => advance.dueCash))
        const totalCashValue = newAdvanceCash+newCashDue
       

        const newAdvanceBkash = calculateTotalPrice(saleData?.result?.filter(advance => advance.advancePymentMethod === 'Bkash')?.map(total => total.advancePayment))
        const newBkashDue = calculateTotalPrice(saleData?.result?.map(due => due.dueBkash))
        const totalBkashValue = newAdvanceBkash + newBkashDue
       

        const newAdvanceBank = calculateTotalPrice(saleData?.result?.filter(advance => advance.advancePymentMethod === 'Bank')?.map(total => total.advancePayment))
        const newBankDue = calculateTotalPrice(saleData?.result?.map(due => due.dueBank))
        const totalBankValue = newAdvanceBank + newBankDue
        

        const newAdvanceNogod = calculateTotalPrice(saleData?.result?.filter(advance => advance.advancePymentMethod === 'Nogod')?.map(total => total.advancePayment))
        const newNogodDue = calculateTotalPrice(saleData?.result?.map(due => due.dueNogod))
        const totalNogodValue = newAdvanceNogod + newNogodDue
       

        const totalSales = saleData?.result?.flatMap(sale => sale?.products?.map(item => Number(item?.quantity) * Number(item?.actualSalesPrice)))
        const totalSalesResult = calculateTotalPrice(totalSales)

        const salesQuantity= saleData?.result?.flatMap(sale => sale?.products?.map(item => Number(item?.quantity)))
        const totalSalesQuantity = calculateTotalPrice(salesQuantity)
       
        const total = saleData?.result?.map(sale => Number(sale?.advance))

        const totalPaid = calculateTotalPrice(saleData?.result?.map(sale => Number(sale?.advance)))
        const totalDiscount = calculateTotalPrice(saleData?.result?.map(sale => Number(sale?.discount)))
     
        const totalSalesItem = saleData?.result?.length;

        const totalSalesValue = calculateTotalPrice(total) 

    return { saleData, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesValue,totalPaid, totalSalesResult, totalDiscount, totalSalesItem, totalSalesQuantity, isLoading, error, refetch, isFetching }
};

export default useOneMonthSaleData;