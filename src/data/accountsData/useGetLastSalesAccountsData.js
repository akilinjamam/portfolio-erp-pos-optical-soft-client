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
    const totalCashPaid = filterCashSales?.flatMap(sale => Number(sale?.paymentHistory?.split('+')?.slice(1, 2)))


    const totalBankSales = filterBankSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalBankPaid = filterBankSales?.flatMap(sale => Number(sale?.paymentHistory?.split('+')?.slice(1, 2)))

    const totalBkashSales = filterBkashSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalBkashPaid = filterBkashSales?.flatMap(sale => Number(sale?.paymentHistory?.split('+')?.slice(1, 2)))

    const totalNogodSales = filterNogodSales?.map(sale => calculateTotalPrice(sale?.products?.map(item => (item?.quantity * item?.actualSalesPrice))))
    const totalNogodPaid = filterNogodSales?.flatMap(sale => Number(sale?.paymentHistory?.split('+')?.slice(1, 2)))

    const totalCashValue = calculateTotalPrice(totalCashSales)
    const totalBankValue = calculateTotalPrice(totalBankSales)
    const totalBkashValue = calculateTotalPrice(totalBkashSales)
    const totalNogodValue = calculateTotalPrice(totalNogodSales)
    const totalSalesValue = calculateTotalPrice(total)

    const totalCashPaidValue = calculateTotalPrice(totalCashPaid)
    const totalBankPaidValue = calculateTotalPrice(totalBankPaid)
    const totalBkashPaidValue = calculateTotalPrice(totalBkashPaid)
    const totalNogodPaidValue = calculateTotalPrice(totalNogodPaid)

    return { lastSaleAndAccountsData, totalCashValue, totalBankValue, totalBkashValue, totalNogodValue, totalCashPaidValue, totalBankPaidValue, totalBkashPaidValue, totalNogodPaidValue, totalSalesValue, isLoading, error, refetch }
};

export default useGetLastSalesAndAccountsData;