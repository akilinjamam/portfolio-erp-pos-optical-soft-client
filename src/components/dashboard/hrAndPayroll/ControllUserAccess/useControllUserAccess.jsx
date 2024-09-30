import { useMutation, useQuery} from "@tanstack/react-query";
import { fetchGetUserData, fetchUpdateUserData } from "../../../../data/fetchedData/fetchUserData";
import { useState } from "react";
import { toast } from "react-toastify";


const useControllUserAccess = (id) => {

    const {data, isLoading, error, refetch} = useQuery({queryKey: ['updateControllUserAccess'], queryFn: fetchGetUserData})
    console.log(data)
    const [access, setAccess] = useState({
        pos: false,
        sales_record: false,
        stock: false,
        sales_invoice: false,
        product_entry: false,
        product_list: false,
        customer_list: false,
        controll_user_access: false,
        employee_list: false,
        payroll: false,
        user_list: false
    })

    const mutation = useMutation({
        mutationFn: (data) => fetchUpdateUserData(data, id),
        onSuccess:  (data) => {
            refetch()
            console.log(data)
            toast.success('successfully updated')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.errorMessage)
        }
    })

    const handleUpdate = () => {
               
        mutation.mutate(access)
        console.log(access)

    }

    return {isLoading, error, data, mutation, handleUpdate, access, setAccess}
};

export default useControllUserAccess;