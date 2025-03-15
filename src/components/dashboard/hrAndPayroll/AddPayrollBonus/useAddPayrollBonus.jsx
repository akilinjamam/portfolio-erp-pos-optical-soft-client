/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useGetEmployeeData from "../../../../data/employeeData/useGetEmployeeData";
import useGetSinglePayrollData from "../../../../data/payrollData/useGetSinglePayrollData";
import { toast } from "react-toastify";
import usePostPayrollBonusData from "../../../../data/payrollData/usePayrollBonusData";



const useAddPayrollBonus = () => {
        
    const initialPayrollData = {
        date: '',
        incentive: '',
        overtime: '',
        transectionId: '',
    }
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [employeeId, setEmployeeId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const {employeeData, refetch: refetchEmployee} = useGetEmployeeData()
    const {payroll, refetch} = useGetSinglePayrollData(employeeId);
    const allPayroll = payroll?.result;
   

    const allEmployees = employeeData?.result;

    const findEmployee = allEmployees?.find(f => f?._id === employeeId);
    console.log(findEmployee)

    const {mutate:postPayrollData} = usePostPayrollBonusData(refetch)

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
            date: payrollData?.date ? payrollData?.date : 'yy-mm-dd',
            incentive:  payrollData?.incentive ? payrollData?.incentive: '0',
            overtime:  payrollData?.overtime ? payrollData?.overtime:'0',
            transectionId:  payrollData?.transectionId ? payrollData?.transectionId:'blank',
            paymentMethod: paymentMethod ? paymentMethod : 'cash'  
        }

        console.log(allData)

        postPayrollData(allData)
    }

    useEffect(() => {
        refetch()
    })
    useEffect(() => {
        refetchEmployee()
    })

    return { payrollData, setPayrollData, handleSubmit, initialPayrollData, allEmployees, setEmployeeId, allPayroll, setPaymentMethod, findEmployee}
};


export default useAddPayrollBonus;