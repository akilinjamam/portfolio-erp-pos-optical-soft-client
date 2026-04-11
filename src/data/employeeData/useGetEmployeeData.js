import { useQuery } from "@tanstack/react-query";
import { fetchGetEmployeeData } from "../fetchedData/fetchEmployeeDate";



const useGetEmployeeData = (query, from, to, page, limit) => {



    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetEmplyeeData', query, from, to, page, limit], queryFn: () => fetchGetEmployeeData(query, from, to, page, limit) })
    const employeeData = getAllData


    return { employeeData, isLoading, error, refetch }
};

export default useGetEmployeeData;