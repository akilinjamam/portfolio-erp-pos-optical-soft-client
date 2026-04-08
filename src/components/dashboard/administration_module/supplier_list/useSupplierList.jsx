import { useEffect, useState } from "react";
import useUpdateSupplierData from "../../../../data/supplierData/useUpdateSupplierData";
import useDeleteSupplierData from "../../../../data/supplierData/useDeleteSupplierData";
import useGetSupplierDataPaginated from "../../../../data/supplierData/useGetSupplierDataPaginated";


const useSupplierList = () => {

    const [query, setQuery] = useState('');
    console.log(query)
    const [count, setCount] = useState(1);
    const [range, setRange] = useState({
        from: '',
        to: '',
        limit:10
    })
    const [pageNumber, setPageNumber] = useState(1);
    const {supplierData, refetch, isLoading} = useGetSupplierDataPaginated(query, pageNumber, range.limit);
   
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
        setPageNumber(1)
    }, [query, range])

    const {mutate:deleteEmployees} = useDeleteSupplierData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteEmployees(idsForDelete)
    }

    return { supplierData, isLoading, updateSupplierData, setUdpateSupplierData, initialSupplierData,  paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr,  setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange, pageNumber, setPageNumber, count, setCount }
};
export default useSupplierList;