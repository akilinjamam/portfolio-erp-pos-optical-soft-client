import { useQuery } from "@tanstack/react-query";
import { fetchGetBranchData } from "../fetchedData/fetchGetBranchData";

const useGetbranchData = () => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetBranchData'], queryFn: () => fetchGetBranchData() })
    const branchData = getAllData


    return { branchData, isLoading, error, refetch }
};

export default useGetbranchData;