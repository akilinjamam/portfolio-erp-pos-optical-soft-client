/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import useGetSingleVendorData from "../../../../data/vendorData/useGetSingleVendorData";
import usePostVendorData from "../../../../data/vendorData/usePostVendor";



const useAddVendor = () => {

    const initialPayrollData = {
        billingDate: '',
        paymentDate: '',
        paid: '',
        billAmount: '',
        billNo: '',
        transectionId: '',
    }
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [supplierId, setSupplierId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const { supplierData, refetch: refetchEmployee } = useGetSupplierData('')
    const { payroll, refetch } = useGetSingleVendorData(supplierId);
    const allPayroll = payroll?.result;


    const allSuppliers = supplierData?.result;

    const findEmployee = allSuppliers?.find(f => f?._id === supplierId);

    const { mutate: postPayrollData } = usePostVendorData(refetch)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(payrollData)

        if (!payrollData?.paymentDate) {
            toast.error('please give payment date')
            return
        }
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
            paid: payrollData?.paid ? payrollData?.paid : '0',
            billingDate: payrollData?.billingDate ? payrollData?.billingDate : 'yy-mm-dd',
            paymentDate: payrollData?.paymentDate ? payrollData?.paymentDate : '0',
            billAmount: payrollData?.billAmount ? payrollData?.billAmount : '0',
            billNo: payrollData?.billNo ? payrollData?.billNo : '0',
            transectionId: payrollData?.transectionId ? payrollData?.transectionId : 'blank',
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

    return { payrollData, setPayrollData, handleSubmit, initialPayrollData, allSuppliers, setSupplierId, allPayroll, setPaymentMethod, findEmployee }
};


export default useAddVendor;