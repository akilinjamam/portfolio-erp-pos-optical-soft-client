/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import useGetSingleVendorData from "../../../../data/vendorData/useGetSingleVendorData";
import usePostVendorBillData from "../../../../data/vendorData/usePostVendorBill";
import { useDispatch } from "react-redux";
import useGetAllVendorBillData from "../../../../data/vendorData/useGetVendorBillData";

const useAddVendorBill = () => {

    const [paginatedIndex, setPaginatedIndex] = useState();
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [month, setMonth] = useState('');
    const [modifiedVendorDataWithIndexId, setModifiedVendorDataWithIndexId] = useState([])
    const dispatch = useDispatch()
    const initialPayrollData = {
        billingDate: '',
        billAmount: '',
        billNo: '',
    }
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [supplierId, setSupplierId] = useState('');

    const { supplierData, refetch: refetchEmployee } = useGetSupplierData('')
    const { payroll, refetch } = useGetSingleVendorData(supplierId );
    const allPayroll = payroll?.result;
    const lastBillingDate= payroll?.lastBillingDate
    const lastPaymentDate= payroll?.lastPaymentDate
    const lastPaid= payroll?.lastPaid


    const allSuppliers = supplierData?.result?.sort((a, b) => a.supplierName.toLowerCase() > b.supplierName.toLowerCase() ? 1 : -1);

    const findEmployee = allSuppliers?.find(f => f?._id === supplierId);

    const { mutate: postPayrollData, isPending } = usePostVendorBillData(refetch)

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

        if(!isPending){
            postPayrollData(allData)
        }
    }

    useEffect(() => {
        refetch()
    },[supplierId])
    useEffect(() => {
        refetchEmployee()
    }, [supplierId])



    const {payroll: oneVendorBillHistory, refetch:refetchVendor, isLoading} = useGetAllVendorBillData(supplierId, month?.split('-')?.[0], month?.split('-')?.[1]);

    useEffect(() => {
         const filterAccordingToBillingDate = oneVendorBillHistory?.data?.result?.filter(f => f?.billingDate !== '')
             const employeesAddedWithIndexId = filterAccordingToBillingDate?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedVendorDataWithIndexId(employeesAddedWithIndexId)
    }, [oneVendorBillHistory])

    useEffect(() => {
        refetchVendor()
    },[supplierId, month])

    console.log(month)

    return { payrollData, setPayrollData, handleSubmit, initialPayrollData, allSuppliers, setSupplierId, allPayroll, findEmployee, lastBillingDate, lastPaymentDate, lastPaid, modifiedVendorDataWithIndexId , useDispatch, setMonth, dispatch, paginatedDataContainer, setPaginatedDataContainer, isLoading, paginatedIndex, setPaginatedIndex, isPending}
};


export default useAddVendorBill;