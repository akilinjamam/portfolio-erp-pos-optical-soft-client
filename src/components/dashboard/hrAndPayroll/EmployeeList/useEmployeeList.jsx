import { useEffect, useState } from "react";
import useGetEmployeeData from "../../../../data/employeeData/useGetEmployeeData";
import useUpdateEmployeeData from "../../../../data/employeeData/useUpdateEmployeeData";
import useDeleteEmployeeData from "../../../../data/employeeData/useDeleteEmployeeData";


const useEmployeeList = () => {

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
    })
    
    const {employeeData, refetch, isLoading} = useGetEmployeeData(query, range.from, range.to)
    
    
   
   
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

    const initialEmployeeData = {
        employeeName: '',
        joiningDate: '',
        address: '',
        mobile: '',
        nid: '',
        employeeId: '',
        basicSalary: '',
        img: ''
    }


    const [updateEmployeeData, setUdpateEmployeeData] = useState(initialEmployeeData);
    const findEmployeeList = employeeData?.result?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateEmployeeData(findEmployeeList || '')
    }, [findEmployeeList])

    const {mutate: editEmployeeData} = useUpdateEmployeeData(refetch, setUdpateEmployeeData, initialEmployeeData, setImgHolder, setEdit)

    const editProduct = async (e) => {
        e.preventDefault()
        const img = imgHolder ? imgHolder : updateEmployeeData?.img

        const updatedData = {
            employeeName: updateEmployeeData?.employeeName,
            joiningDate: updateEmployeeData?.joiningDate,
            address: updateEmployeeData?.address,
            mobile: updateEmployeeData?.mobile,
            nid: updateEmployeeData?.nid,
            employeeId: updateEmployeeData?.employeeId,
            basicSalary: updateEmployeeData?.basicSalary,
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
        const employeesAddedWithIndexId = employeeData?.result?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedEmployeeDataWithIndexId(employeesAddedWithIndexId)
    }, [employeeData?.result])

    useEffect(() => {
        refetch()
    }, [refetch, query, range])

    const {mutate:deleteEmployees} = useDeleteEmployeeData(refetch, setIdsForDelete, setSelectDeleted)

    const deleteProducts = async (e) => {
        e.preventDefault()
        deleteEmployees(idsForDelete)
    }

    return { employeeData, isLoading, updateEmployeeData, setUdpateEmployeeData, initialEmployeeData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedEmployeeDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, range, setRange}
};
export default useEmployeeList;