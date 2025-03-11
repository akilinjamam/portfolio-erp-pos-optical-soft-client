/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import useGetSingleVendorData from "../../../../data/vendorData/useGetSingleVendorData";
import usePostVendorBillData from "../../../../data/vendorData/usePostVendorBill";

const useAddVendorBill = () => {

    const initialPayrollData = {
        billingDate: '',
        billAmount: '',
        billNo: '',
    }
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [supplierId, setSupplierId] = useState('');

    const { supplierData, refetch: refetchEmployee } = useGetSupplierData('')
    const { payroll, refetch } = useGetSingleVendorData(supplierId);
    const allPayroll = payroll?.result;
    const lastBillingDate= payroll?.lastBillingDate
    const lastPaymentDate= payroll?.lastPaymentDate
    const lastPaid= payroll?.lastPaid


    const allSuppliers = supplierData?.result;

    const findEmployee = allSuppliers?.find(f => f?._id === supplierId);

    const { mutate: postPayrollData } = usePostVendorBillData(refetch)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(payrollData)

       
        if (!payrollData?.billingDate) {
            toast.error('please give biling date')
            return
        }

        if (!supplierId) {
            toast.error('please select supplier name')
            return
        }
        if (!payrollData?.billNo) {
            toast.error('please select bill no')
            return
        }
        if (!payrollData?.billAmount) {
            toast.error('please select bill amount')
            return
        }

        const allData = {
            supplierName: supplierId,
            billingDate: payrollData?.billingDate ? payrollData?.billingDate : 'yy-mm-dd',
            billAmount: payrollData?.billAmount ? payrollData?.billAmount : '0',
            billNo: payrollData?.billNo ? payrollData?.billNo : '0',
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

    return { payrollData, setPayrollData, handleSubmit, initialPayrollData, allSuppliers, setSupplierId, allPayroll, findEmployee, lastBillingDate, lastPaymentDate, lastPaid }
};


export default useAddVendorBill;