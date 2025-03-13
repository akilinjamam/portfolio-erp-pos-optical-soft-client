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
        glass_stock: false,
        sales_invoice: false,
        product_entry: false,
        product_list: false,
        glass_list: false,
        customer_list: false,
        add_supplier: false,
        supplier_list: false,
        manage_sales: false,
        controll_user_access: false,
        add_employee: false,
        employee_list: false,
        payroll: false,
        payroll_list: false,
        user_list: false,
        add_vendor: false,
        vendor_list: false,
        add_expenses: false,
        expenses_list: false,
        due_collection_list: false,
        add_fixed_expenses: false,
        expenses_profit_list: false,
        manual_sales: false,
        today_sales: false,
        today_due_collection: false,
        profit_expense_enalysis:false,
        profit_category_analysis:false,
        stock_analysis: false,
        sales_analysis: false,
        best_sale_performence: false

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