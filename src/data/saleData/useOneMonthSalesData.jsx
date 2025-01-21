import { useQuery } from "@tanstack/react-query";
import { fetchGetOneMonthSaleData } from "../fetchedData/fetchSaleData";
import { calculateTotalPrice } from "../../components/calculation/calculateSum";


const useOneMonthSaleData = (query, from , to) => {
    const {data:getAllData, refetch, isLoading, error} = useQuery({ queryKey: ['fetchGetOneMonthSalesSaleData'], queryFn: () => fetchGetOneMonthSaleData(query, from, to) })
    const saleData = getAllData

    
        const filterCashSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Cash')
        const filterBankSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Bank')
        const filterBkashSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Bkash')
        const filterNogodSales = saleData?.result?.filter(sale => sale?.paymentMethod === 'Nogod')
    
        const total = saleData?.result?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

        const totalCashSales = filterCashSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

        const totalBankSales = filterBankSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

        const totalBkashSales = filterBkashSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

        const totalNogodSales = filterNogodSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
        
        const totalCashValue = calculateTotalPrice(totalCashSales)
        const totalBankValue = calculateTotalPrice(totalBankSales)
        const totalBkashValue = calculateTotalPrice(totalBkashSales)
        const totalNogodValue = calculateTotalPrice(totalNogodSales)
        const totalSalesValue = calculateTotalPrice(total)  

    return { saleData, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesValue, isLoading, error, refetch }
};

export default useOneMonthSaleData;