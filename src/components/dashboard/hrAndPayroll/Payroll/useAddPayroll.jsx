/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useGetEmployeeData from "../../../../data/employeeData/useGetEmployeeData";
import useGetSinglePayrollData from "../../../../data/payrollData/useGetSinglePayrollData";
import { toast } from "react-toastify";
import usePostPayrollData from "../../../../data/payrollData/usePostPayrollData";



const useAddPayroll = () => {
        
    const initialPayrollData = {
        paid: '',
        date: '',
        advance: '',
        transectionId: '',
    }
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [employeeId, setEmployeeId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const {employeeData, refetch: refetchEmployee} = useGetEmployeeData()
    const {payroll, refetch} = useGetSinglePayrollData(employeeId);
    const allPayroll = payroll?.result;
   

    const allEmployees = employeeData?.result?.sort((a, b) => a.employeeName.toLowerCase() > b.employeeName.toLowerCase() ? 1 : -1);

    const findEmployee = allEmployees?.find(f => f?._id === employeeId);
    console.log(findEmployee)

    const {mutate:postPayrollData, isPending} = usePostPayrollData(refetch)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!payrollData?.date){
            toast.error('please give date')
            return
        }

        if(!employeeId){
            toast.error('please select employee name')
            return
        }

        const allData = {
            employeeName: employeeId,
            paid: payrollData?.paid ? payrollData?.paid : '0',
            date: payrollData?.date ? payrollData?.date : 'yy-mm-dd',
            advance:  payrollData?.advance ? payrollData?.advance :'0',
            transectionId:  payrollData?.transectionId ? payrollData?.transectionId:'blank',
            paymentMethod: paymentMethod ? paymentMethod : 'cash'  
        }

        console.log(allData)

        if(!isPending){
            postPayrollData(allData)
        }
    }

    useEffect(() => {
        refetch()
    })
    useEffect(() => {
        refetchEmployee()
    })

    return { payrollData, setPayrollData, handleSubmit, initialPayrollData, allEmployees, setEmployeeId, allPayroll, setPaymentMethod, findEmployee, isPending}
};


export default useAddPayroll;