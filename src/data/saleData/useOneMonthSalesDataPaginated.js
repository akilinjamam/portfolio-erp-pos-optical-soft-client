import { useQuery } from "@tanstack/react-query";
import { fetchGetOneMonthSaleDataPaginated } from "../fetchedData/fetchSaleData";
import { useEffect } from "react";


const useOneMonthSaleDataPaginated = (query, from, to, page, limit, category) => {
    const { data: getAllData, refetch, isLoading, error, isFetching } = useQuery({ queryKey: ['fetchGetOneMonthSalesSaleDataPaginated', query, from, to, page, limit, category], queryFn: () => fetchGetOneMonthSaleDataPaginated(query, from, to, page, limit, category) })
    const saleData = getAllData
    useEffect(() => {
        const interval = setInterval(() => {
            fetchGetOneMonthSaleDataPaginated(query, from, to, page, limit, category)
        }, 300000)

        return () => clearInterval(interval)
    }, [query, from, to, page, limit, category]);



    return { saleData, isLoading, error, refetch, isFetching }
};

export default useOneMonthSaleDataPaginated;