import { useEffect, useState } from "react";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";
import useUpdateSaleInfoData from "../../../../data/saleData/useUpdateSalesInfoData";
import useUpdateProductInfoData from "../../../../data/saleData/useUpdateProductInfoData";
import useDeletSalesInfoData from "../../../../data/saleData/useDeleteSalesInfoData";


const useManageSales = () => {
    const [selectProduct, setSelectProduct] = useState('');
    const [saleId, setSaleId] = useState('')
    const [productId, setProductId] = useState('')
    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
    })

    console.log(saleId, productId)

    const [updatePaymentMethod, setUpdatePaymentMethod] = useState('');
    
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

    useEffect(() => {
        setUpdatePaymentMethod(findSupplierList?.paymentMethod)
    },[findSupplierList])

    

    const {mutate: editEmployeeData} = useUpdateSaleInfoData(refetch, setUdpateSupplierData, initialSupplierData, setEdit, setUpdatePaymentMethod)

    const editProduct = async (e) => {
        e.preventDefault()
       
        const updatedData = {
            customerName: updateSupplierData?.customerName,
            phoneNumber: updateSupplierData?.phoneNumber,
            referredBy: updateSupplierData?.referredBy,
            advance: updateSupplierData?.advance,
            discount: updateSupplierData?.discount,
            recorderName: updateSupplierData?.recorderName,
            paymentHistory: updateSupplierData?.paymentHistory,
            paymentMethod: updatePaymentMethod,
        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editEmployeeData(finalUpdatedData)
        console.log(updateSupplierData)
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

    const {mutate:deleteSalesInfoData} = useDeletSalesInfoData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteSalesInfoData({ids: idsForDelete})
    }

    const initialProductData = {
        productName: '',
        quantity: '',
        actualSalesPrice: ''
      }
    
      const [updateProductData, setUpdateProductData] = useState(initialProductData);

    const {mutate: updateProductInfo} = useUpdateProductInfoData(refetch, setUpdateProductData, initialProductData, setSelectProduct);

    const handleUpdateProduct = (e) => {
        e.preventDefault();

        const updatedData = {
            id: saleId,
            data: {
                ...updateProductData,
                productId
            }
        }
       
        updateProductInfo(updatedData)
    }




    return { saleData, isLoading, updateSupplierData, setUdpateSupplierData, initialSupplierData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedSupplierDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange,  totalSalesValue, totalSalesItem, totalPaid, totalDiscount, totalBankValue, totalBkashValue, totalCashValue, totalNogodValue, updatePaymentMethod, setUpdatePaymentMethod, updateProductData, setUpdateProductData, productId, setProductId, initialProductData, setSaleId, handleUpdateProduct, selectProduct, setSelectProduct}
};
export default useManageSales;