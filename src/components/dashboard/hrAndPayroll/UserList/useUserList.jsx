import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDeleteUserData, fetchGetUserData, fetchUpdateUserData } from "../../../../data/fetchedData/fetchUserData";
import { toast } from "react-toastify";


const useUserList = () => {

    const {data, isLoading, error, refetch} = useQuery({queryKey: ['updateUserList'], queryFn: fetchGetUserData})

    const mutation = useMutation({
        mutationFn: (data) => fetchUpdateUserData(data.data, data.id),
        onSuccess:  (data) => {
            refetch()
            console.log(data)
            toast.success('successfully updated')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.errorMessage)
        }
    })

    const {mutate: deleteUser} = useMutation({
        mutationFn: (data) => fetchDeleteUserData(data.id),
        onSuccess:  (data) => {
            refetch()
            console.log(data)
            toast.success('successfully deleted')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.errorMessage)
        }
    })

    const handleUpdateRequest = (id, value) => {
        const isAccept = (value ? false : true)
        console.log(id, isAccept)

        mutation.mutate({
            id,
            data: {
                accept_by_admin: isAccept
            }
        })
    }
    const handleUpdateRemove = (id) => {
        deleteUser({id})
    }

    return {data, isLoading, error, handleUpdateRequest, handleUpdateRemove}
};

export default useUserList;