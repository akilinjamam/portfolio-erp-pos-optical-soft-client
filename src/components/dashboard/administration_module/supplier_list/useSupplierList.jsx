import { useEffect, useState } from "react";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import useUpdateSupplierData from "../../../../data/supplierData/useUpdateSupplierData";
import useDeleteSupplierData from "../../../../data/supplierData/useDeleteSupplierData";


const useSupplierList = () => {

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
    })
    
    const {supplierData, refetch, isLoading} = useGetSupplierData(query);
    console.log(supplierData)
   
    
    
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
        supplierName: '',
        address: '',
        mobile: '',
        img: 'blank'
    }


    const [updateSupplierData, setUdpateSupplierData] = useState(initialSupplierData);
    const findSupplierList = supplierData?.result?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateSupplierData(findSupplierList || '')
    }, [findSupplierList])

    const {mutate: editEmployeeData} = useUpdateSupplierData(refetch, setUdpateSupplierData, initialSupplierData, setImgHolder, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()
        const img = imgHolder ? imgHolder : updateSupplierData?.img

        const updatedData = {
            supplierName: updateSupplierData?.supplierName,
            address: updateSupplierData?.address,
            mobile: updateSupplierData?.mobile,
            img: img
        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editEmployeeData(finalUpdatedData)
        console.log(updatedData)
    }
    

    useEffect(() => {
        const employeesAddedWithIndexId = supplierData?.result?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedSupplierDataWithIndexId(employeesAddedWithIndexId)
    }, [supplierData?.result])

    useEffect(() => {
        refetch()
    }, [refetch, query, range])

    const {mutate:deleteEmployees} = useDeleteSupplierData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteEmployees(idsForDelete)
    }

    return { supplierData, isLoading, updateSupplierData, setUdpateSupplierData, initialSupplierData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedSupplierDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange}
};
export default useSupplierList;