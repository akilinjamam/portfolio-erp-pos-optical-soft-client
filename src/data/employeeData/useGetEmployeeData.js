import { useQuery } from "@tanstack/react-query";
import { fetchGetEmployeeData } from "../fetchedData/fetchEmployeeDate";


const useGetEmployeeData = () => {
    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetEmplyeeData'], queryFn: () => fetchGetEmployeeData() })
    const employeeData = getAllData


    return { employeeData, isLoading, error, refetch }
};

export default useGetEmployeeData;