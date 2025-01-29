import { useEffect, useState } from "react";
import useDeleteSupplierData from "../../../../data/supplierData/useDeleteSupplierData";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import useUpdateSaleInfoData from "../../../../data/saleData/useUpdateSalesInfoData";


const useManageSales = () => {

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
    })
    
    const {saleData, refetch, isLoading, totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalBankValue, totalBkashValue, totalCashValue, totalNogodValue } = useOneMonthSaleData(query,range.from, range.to);
   
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedSupplierDataWithIndexId, setModifiedSupplierDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
   
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);
    const [fullScr, setFullScr] = useState(false)
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);

    const initialSupplierData = {
        customerName: '',
        phoneNumber: '',
        referredBy: '',
        advance: '',
        discount: '',
        delivered: '',
        paymentMethod: '',
        recorderName: ''
    }


    const [updateSupplierData, setUdpateSupplierData] = useState(initialSupplierData);
    const findSupplierList = saleData?.result?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateSupplierData(findSupplierList || '')
    }, [findSupplierList])

    const {mutate: editEmployeeData} = useUpdateSaleInfoData(refetch, setUdpateSupplierData, initialSupplierData, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()
        
        const updatedData = {
            customerName: updateSupplierData?.customerName,
            phoneNumber: updateSupplierData?.phoneNumber,
            referredBy: updateSupplierData?.referredBy,
            advance: updateSupplierData?.advance,
            discount: updateSupplierData?.discount,
            recorderName: updateSupplierData?.recorderName
        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editEmployeeData(finalUpdatedData)
        console.log(updatedData)
    }
    

    useEffect(() => {
        const employeesAddedWithIndexId = saleData?.result?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedSupplierDataWithIndexId(employeesAddedWithIndexId)
    }, [saleData?.result])

    useEffect(() => {
        refetch()
    }, [refetch, query, range])

    const {mutate:deleteEmployees} = useDeleteSupplierData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteEmployees(idsForDelete)
    }

    return { saleData, isLoading, updateSupplierData, setUdpateSupplierData, initialSupplierData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedSupplierDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange,  totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalBankValue, totalBkashValue, totalCashValue, totalNogodValue}
};
export default useManageSales;