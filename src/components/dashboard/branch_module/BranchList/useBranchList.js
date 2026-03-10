import { useEffect, useState } from "react";
import useGetbranchData from "../../../../data/branchData/useGetBranchData";
import useUpdateBranchData from "../../../../data/branchData/useUpdateBranchData";
import useDeleteBranchData from "../../../../data/branchData/useDeleteBranchData";


const useBranchList = () => {


    const { branchData, refetch, isLoading } = useGetbranchData()




    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedEmployeeDataWithIndexId, setModifiedEmployeeDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars

    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);
    const [fullScr, setFullScr] = useState(false)
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);

    const initialBranchData = {
        name: '',
        nameBangla: '',
        address: '',
        phone: '',
    }


    const [updateBranchData, setUdpateBranchData] = useState(initialBranchData);
    const findEmployeeList = branchData?.result?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateBranchData(findEmployeeList || '')
    }, [findEmployeeList])

    const { mutate: editEmployeeData } = useUpdateBranchData(refetch, setUdpateBranchData, initialBranchData, setImgHolder, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()
        const updatedData = {
            name: updateBranchData?.name,
            nameBangla: updateBranchData?.nameBangla,
            address: updateBranchData?.address,
            phone: updateBranchData?.phone,
        }

        const finalUpdatedData = {
            data: updatedData,
            id: edit,
        }

        editEmployeeData(finalUpdatedData)
        console.log(updatedData)
    }


    useEffect(() => {
        const employeesAddedWithIndexId = branchData?.result?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedEmployeeDataWithIndexId(employeesAddedWithIndexId)
    }, [branchData?.result])

    useEffect(() => {
        refetch()
    }, [refetch])

    const { mutate: deleteBranchData } = useDeleteBranchData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteBranchData(idsForDelete)
    }

    return { isLoading, updateBranchData, setUdpateBranchData, initialBranchData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedEmployeeDataWithIndexId, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts }
};
export default useBranchList;