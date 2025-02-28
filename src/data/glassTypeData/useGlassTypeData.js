import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDeleteGlassData, fetchGetGlassData, fetchPostGlassData } from "../fetchedData/fetchGlassData";
import { toast } from "react-toastify";

export const usePostGlassTypeData = (refetch) => {
    const postAllData = useMutation({
        queryKey: ['fetchPostEmplyeeData'],
        mutationFn: (data) => fetchPostGlassData(data),
        onSuccess: (data) => {
            console.log(data)
            refetch();
            toast.success("Glass Created Successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};



export const useGetGlassData = () => {

    const { data: getAllData, refetch, isLoading, error } = useQuery({ queryKey: ['fetchGetGlassData'], queryFn: () => fetchGetGlassData() })
    const glassData = getAllData


    return { glassData, isLoading, error, refetch }
};


export const useDeleteGlassData = (refetch,) => {
    const postAllData = useMutation({
        queryKey: ['fetchDeleteGlassData'],
        mutationFn: (data) => fetchDeleteGlassData(data),
        onSuccess: (data) => {
            if (data) {
                refetch()
                toast.success("Glass deleted Successfully")
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return postAllData
};