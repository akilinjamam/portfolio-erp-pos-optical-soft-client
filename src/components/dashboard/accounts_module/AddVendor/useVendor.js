/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import useGetSingleVendorData from "../../../../data/vendorData/useGetSingleVendorData";
import usePostVendorData from "../../../../data/vendorData/usePostVendor";



const useAddVendor = () => {

    const initialPayrollData = {
        paymentDate: '',
        paid: '',
        transectionId: '',
    }
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [supplierId, setSupplierId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const { supplierData, refetch: refetchEmployee } = useGetSupplierData('')
    const { payroll, refetch } = useGetSingleVendorData(supplierId);
    const allPayroll = payroll?.result;
    const lastBillingDate = payroll?.lastBillingDate;
    const lastPaymentDate = payroll?.lastPaymentDate;
    const lastPaid = payroll?.lastPaid;


    const allSuppliers = supplierData?.result.sort((a, b) => a.supplierName.toLowerCase() > b.supplierName.toLowerCase() ? 1 : -1);

    const findEmployee = allSuppliers?.find(f => f?._id === supplierId);

    const { mutate: postPayrollData } = usePostVendorData(refetch)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(payrollData)

        if (!payrollData?.paymentDate) {
            toast.error('please give payment date')
            return
        }

        if (!supplierId) {
            toast.error('please select supplier name')
            return
        }
        if (!payrollData?.paid) {
            toast.error('please add payment amount')
            return
        }

        const allData = {
            supplierName: supplierId,
            paid: payrollData?.paid ? payrollData?.paid : '0',
            paymentDate: payrollData?.paymentDate ? payrollData?.paymentDate : '0',
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

    return { payrollData, setPayrollData, handleSubmit, initialPayrollData, allSuppliers, setSupplierId, allPayroll, setPaymentMethod, findEmployee, lastBillingDate, lastPaymentDate, lastPaid }
};


export default useAddVendor;