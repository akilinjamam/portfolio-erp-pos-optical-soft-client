import { useQuery } from "@tanstack/react-query";
import { fetchGetLastSaleAndAccountsData } from "../fetchedData/fetchAccountsData";
import { calculateTotalPrice } from "../../components/calculation/calculateSum";



const useGetLastSalesAndAccountsData = (date) => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetLastSalesAndAccountsData'], queryFn: () => fetchGetLastSaleAndAccountsData(date) })
    const lastSaleAndAccountsData = getAllData



    const filterCashSales = getAllData?.result?.allSalesDetail?.filter(sale => sale?.paymentMethod === 'Cash')
    const filterBankSales = getAllData?.result?.allSalesDetail?.filter(sale => sale?.paymentMethod === 'Bank')
    const filterBkashSales = getAllData?.result?.allSalesDetail?.filter(sale => sale?.paymentMethod === 'Bkash')
    const filterNogodSales = getAllData?.result?.allSalesDetail?.filter(sale => sale?.paymentMethod === 'Nogod')

    const total = getAllData?.result?.allSalesDetail?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    const totalCashSales = filterCashSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    const totalBankSales = filterBankSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    const totalBkashSales = filterBkashSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    const totalNogodSales = filterNogodSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))

    const totalCashValue = calculateTotalPrice(totalCashSales)
    const totalBankValue = calculateTotalPrice(totalBankSales)
    const totalBkashValue = calculateTotalPrice(totalBkashSales)
    const totalNogodValue = calculateTotalPrice(totalNogodSales)
    const totalSalesValue = calculateTotalPrice(total)


    return { lastSaleAndAccountsData, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalSalesValue, isLoading, error, refetch }
};

export default useGetLastSalesAndAccountsData;