import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchGetUserData, fetchUpdateUserData } from "../../../../data/fetchedData/fetchUserData";
import { useState } from "react";
import { toast } from "react-toastify";


const useManageBranch = (id) => {

    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['updateControllUserAccess'], queryFn: fetchGetUserData })
    console.log(data)


    const [manageBranches, setManageBranches] = useState([]);

    const updatedBranchIds = manageBranches?.filter(ids => ids?.exist === true)?.map(item => item?.id);

    console.log(updatedBranchIds)

    const mutation = useMutation({
        mutationFn: (data) => fetchUpdateUserData(data, id),
        onSuccess: (data) => {
            refetch()
            console.log(data)
            toast.success('successfully updated')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.errorMessage)
        }
    })

    const handleUpdate = () => {
        mutation.mutate({ branchIds: [...updatedBranchIds] })
    }

    return { isLoading, error, data, mutation, handleUpdate, manageBranches, setManageBranches }
};

export default useManageBranch;